/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState, useRef } from "react";
import randomstring from "randomstring";

//child components
import Buttons from "./ChildComponents/Buttons";
import CalanderComponent from "./ChildComponents/CalanderComponent";
import SittingsComponents from "./ChildComponents/SittingsComponents";

//utils
import { countNumberOfTables } from "./../../utils/countNumOfTables";
import { checkAvailability } from "./../../utils/checkAvailability";
import { updateComplexBookingObject } from "../../utils/updateComplexBookingObject";
import { scrollToElement } from "../../utils/scrollToElement";
import { useSpring, animated } from "react-spring";
import { Toaster } from "react-hot-toast";

//DB
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

//interfaces
import { ISitting } from "./../../models/ISitting";
import { GuestInfoComponent } from "./ChildComponents/GuestInfoComponent";
import { IFormInterface } from "./../../models/IFormInterface";
import {
  IBookingState,
  initialBookingState,
} from "./../../models/IBookingState";
import { sendEmailConfirmation } from "../../utils/emailSendOut";
import Spinner from "./ChildComponents/Spinner";
import { useHistory } from "react-router";

//Parent component
const BookingsComponent: FC = () => {
  const bookingsCollectionRef = db.collection("bookings");
  const [snapshot, error] = useCollectionData(bookingsCollectionRef, {
    idField: "id",
  });

  const headerFadeIn = useSpring({
    from: { scale: 2, opacity: 0, y: -30 },
    to: { scale: 1, opacity: 1, y: 0 },
    config: {
      duration: 600,
    },
  });

  /** Booking properties saved in state */
  const [bookingState, setBookingState] =
    useState<IBookingState>(initialBookingState);

  /** State for every individual child component - when true, the emelent will be scrolled into view with help from the scrollToElement fn */
  const [numberOfGuestsPicked, setNumberOfGuestsPicked] =
    useState<boolean>(false);
  const [datePicked, setDatePicked] = useState<boolean>(false);
  const [sittingPicked, setSittingPicked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  /** State for the entire booking object - when true, the booking will be submittible to cloud firestore */
  const [bookingAllowed, setBookingAllowed] = useState<boolean>(false);

  /** Reference to each child compoent */
  const calanderRef = useRef(null);
  const sittingRef = useRef(null);
  const guestInfoRef = useRef(null);

  const updateNumberOfGuests = (numberOfGuests: number) => {
    const numberOfGuestsObj = {
      numberOfGuests,
      numberOfTables: countNumberOfTables(numberOfGuests),
    };
    updateComplexBookingObject(setBookingState, numberOfGuestsObj);
    setNumberOfGuestsPicked(true);
  };

  /** useEffects that will be used to scroll into the next part of the booking process */
  useEffect(() => {
    scrollToElement(calanderRef);
  }, [numberOfGuestsPicked]);

  //controlling the calander settings
  const updateDate = (date: string) => {
    updateComplexBookingObject(setBookingState, { date });
    setDatePicked(true);
  };

  const updateSitting = (sitting: string) => {
    updateComplexBookingObject(setBookingState, { sitting });
    setSittingPicked(true);
  };
  useEffect(() => {
    scrollToElement(guestInfoRef);
  }, [sittingPicked]);

  const [sittingAvailability, setSittingAvailability] = useState<ISitting>({
    sitting18: false,
    sitting21: false,
  });

  const updateUserInformation = (userInfomation: IFormInterface) => {
    const userInfoObj = {
      ...userInfomation,
      bookingReference: randomstring.generate(18),
    };
    updateComplexBookingObject(setBookingState, userInfoObj);
    setBookingAllowed(!bookingAllowed);
    setLoading(true);
  };
  let history = useHistory();

  //triggered when the user info form is submitted
  useEffect(() => {
    //check that all of bookingState's properties are truthies
    console.log(bookingState);
    let isBookingPossible = Object.values(bookingState).every(Boolean);
    if (isBookingPossible) {
      bookingsCollectionRef.add(bookingState).then((res) => {
        if (res) {
          sendEmailConfirmation(bookingState);
          history.push("/confirmation");
        } else {
          alert("Your booking did not go trough, please try again later");
          history.push("/bookings");
        }
      });
    }
  }, [bookingAllowed]);

  useEffect(() => {
    scrollToElement(sittingRef);

    if (snapshot && !error) {
      console.log(snapshot);
      const { date } = bookingState;
      const [numberOfBookedTables18, numberOfBookedTables21] =
        checkAvailability(snapshot, date!);

      setSittingAvailability({
        //following statements will be evaluated as a boolean
        sitting18: numberOfBookedTables18! < 16,
        sitting21: numberOfBookedTables21! < 16,
      });
    }
  }, [datePicked]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Spinner visible={loading} />
      <main className="bookings-page">
        <section className="bookings-page__number-of-people">
          <animated.div className="header" style={headerFadeIn}>
            <svg width="163" height="63" viewBox="0 0 163 63" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.358887 49L4.68262 24.1172L12.4414 24.1343C15.3239 24.1457 17.4886 24.7324 18.9355 25.8945C20.3825 27.0566 21.0376 28.6916 20.9009 30.7993C20.7414 33.3172 19.2887 35.1572 16.543 36.3193C17.5342 36.6611 18.3032 37.3049 18.8501 38.2505C19.397 39.1847 19.6305 40.2899 19.5508 41.5659C19.3913 43.9129 18.4684 45.7415 16.7822 47.0518C15.1074 48.3506 12.8174 49 9.91211 49H0.358887ZM7.26318 38.165L6.08398 44.8813L10.0317 44.8984C11.2622 44.8984 12.2933 44.5965 13.125 43.9927C13.9567 43.3774 14.4523 42.5514 14.6118 41.5146C14.7713 40.4893 14.6289 39.6917 14.1846 39.1221C13.7516 38.541 13.0168 38.2277 11.98 38.1821L7.26318 38.165ZM7.87842 34.542L11.2793 34.5762C12.5439 34.5534 13.575 34.2572 14.3726 33.6875C15.1815 33.1178 15.6657 32.326 15.8252 31.312C16.11 29.3068 15.0562 28.2985 12.6636 28.2871L8.97217 28.27L7.87842 34.542ZM32.1973 49.3418C30.5452 49.3076 29.0869 48.9202 27.8223 48.1797C26.569 47.4277 25.5721 46.3511 24.8315 44.9497C24.1024 43.5369 23.6808 41.9191 23.5669 40.0962C23.4416 38.2277 23.641 36.2339 24.165 34.1147C24.6891 31.9956 25.5322 30.1328 26.6943 28.5264C27.8564 26.9199 29.2179 25.7179 30.7788 24.9204C32.3511 24.1229 34.0487 23.7412 35.8716 23.7754C37.5464 23.8096 39.0104 24.2083 40.2637 24.9717C41.5169 25.7236 42.5024 26.8117 43.2202 28.2358C43.938 29.6486 44.3481 31.255 44.4507 33.0552C44.5646 35.0604 44.3481 37.1226 43.8013 39.2417C43.2544 41.3608 42.4056 43.1951 41.2549 44.7446C40.1042 46.2941 38.7541 47.4562 37.2046 48.231C35.6665 49.0057 33.9974 49.376 32.1973 49.3418ZM39.2896 35.875L39.4263 34.2515C39.5402 32.2235 39.2668 30.6854 38.606 29.6372C37.9565 28.589 36.9653 28.0422 35.6323 27.9966C33.5474 27.9282 31.8896 28.8511 30.6592 30.7651C29.4401 32.6792 28.7508 35.3566 28.5913 38.7974C28.4774 40.814 28.7451 42.3691 29.3945 43.4629C30.0439 44.5452 31.0522 45.1092 32.4194 45.1548C34.2082 45.2345 35.6893 44.5396 36.8628 43.0698C38.0363 41.5887 38.8053 39.498 39.1699 36.7979L39.2896 35.875ZM55.8154 49.3418C54.1634 49.3076 52.7051 48.9202 51.4404 48.1797C50.1872 47.4277 49.1903 46.3511 48.4497 44.9497C47.7205 43.5369 47.299 41.9191 47.1851 40.0962C47.0597 38.2277 47.2591 36.2339 47.7832 34.1147C48.3073 31.9956 49.1504 30.1328 50.3125 28.5264C51.4746 26.9199 52.8361 25.7179 54.397 24.9204C55.9692 24.1229 57.6668 23.7412 59.4897 23.7754C61.1646 23.8096 62.6286 24.2083 63.8818 24.9717C65.1351 25.7236 66.1206 26.8117 66.8384 28.2358C67.5562 29.6486 67.9663 31.255 68.0688 33.0552C68.1828 35.0604 67.9663 37.1226 67.4194 39.2417C66.8726 41.3608 66.0238 43.1951 64.873 44.7446C63.7223 46.2941 62.3722 47.4562 60.8228 48.231C59.2847 49.0057 57.6156 49.376 55.8154 49.3418ZM62.9077 35.875L63.0444 34.2515C63.1584 32.2235 62.8849 30.6854 62.2241 29.6372C61.5747 28.589 60.5835 28.0422 59.2505 27.9966C57.1655 27.9282 55.5078 28.8511 54.2773 30.7651C53.0583 32.6792 52.369 35.3566 52.2095 38.7974C52.0955 40.814 52.3633 42.3691 53.0127 43.4629C53.6621 44.5452 54.6704 45.1092 56.0376 45.1548C57.8263 45.2345 59.3075 44.5396 60.481 43.0698C61.6545 41.5887 62.4235 39.498 62.7881 36.7979L62.9077 35.875ZM78.9209 39.0708L75.6396 42.1128L74.4434 49H69.436L73.7598 24.1172H78.7671L76.853 35.0889L79.3994 32.2178L86.8848 24.1172H93.4131L82.6636 35.4307L89.0723 49H83.3643L78.9209 39.0708ZM96.5063 49H91.499L95.8057 24.1172H100.813L96.5063 49ZM120.928 49H116.074L109.153 32.4058L106.265 49H101.257L105.581 24.1172H110.417L117.356 40.7456L120.244 24.1172H125.234L120.928 49ZM145.366 45.8555C144.478 46.9834 143.173 47.855 141.453 48.4702C139.744 49.0741 137.812 49.3589 135.659 49.3247C133.962 49.3133 132.469 48.943 131.182 48.2139C129.894 47.4733 128.88 46.4137 128.14 45.0352C127.399 43.6566 126.978 42.0843 126.875 40.3184C126.761 38.6777 126.932 36.7523 127.388 34.542C127.855 32.3203 128.647 30.3778 129.763 28.7144C130.891 27.0396 132.241 25.792 133.813 24.9717C135.386 24.14 137.129 23.7412 139.043 23.7754C141.641 23.821 143.674 24.5558 145.144 25.98C146.614 27.3927 147.451 29.4207 147.656 32.064L142.837 32.0469C142.712 30.6569 142.341 29.6315 141.726 28.9707C141.111 28.3099 140.194 27.9567 138.975 27.9111C136.867 27.8428 135.203 28.7713 133.984 30.6968C132.777 32.6108 132.087 35.3908 131.917 39.0366C131.803 40.9849 132.099 42.4945 132.805 43.5654C133.523 44.6364 134.611 45.1833 136.069 45.2061C137.767 45.2516 139.214 44.8472 140.41 43.9927L141.248 39.7031H136.702L137.368 35.9263H146.87L145.366 45.8555Z" fill="#FF7B51" />
              <path d="M0 52.418H148.357V54.127H0V52.418Z" fill="#FF7B51" />
              <path d="M8.34961 4.43359L8.01758 6.15234C8.9681 4.85026 10.1628 4.21224 11.6016 4.23828C12.3438 4.2513 12.959 4.43685 13.4473 4.79492C13.9421 5.15299 14.248 5.65104 14.3652 6.28906C14.847 5.63151 15.4069 5.1237 16.0449 4.76562C16.6895 4.40104 17.3893 4.22526 18.1445 4.23828C19.1471 4.25781 19.8893 4.58984 20.3711 5.23438C20.8594 5.8724 21.0612 6.75781 20.9766 7.89062L20.957 8.11523L19.7949 15H18.6328L19.7852 8.0957C19.8242 7.71159 19.8275 7.34701 19.7949 7.00195C19.6647 5.84961 19.0072 5.26367 17.8223 5.24414C17.028 5.23112 16.2956 5.49154 15.625 6.02539C14.9609 6.55273 14.5443 7.21354 14.375 8.00781L13.1641 15H12.002L13.1738 8.00781C13.3626 6.21094 12.7018 5.28971 11.1914 5.24414C10.4427 5.23112 9.74609 5.46549 9.10156 5.94727C8.45703 6.42904 8.02409 7.02799 7.80273 7.74414L6.55273 15H5.39062L7.22656 4.43359H8.34961ZM29.3262 15C29.2936 14.7526 29.2839 14.5052 29.2969 14.2578L29.3848 13.5254C28.8965 14.0527 28.3366 14.4661 27.7051 14.7656C27.0801 15.0651 26.403 15.2083 25.6738 15.1953C24.7819 15.1823 24.056 14.9023 23.4961 14.3555C22.9427 13.8021 22.6953 13.1087 22.7539 12.2754C22.806 11.5788 23.0436 10.9766 23.4668 10.4688C23.8965 9.95443 24.5052 9.55729 25.293 9.27734C26.0807 8.99089 26.9629 8.84766 27.9395 8.84766L30.0977 8.85742L30.2734 7.64648C30.3516 6.92383 30.1953 6.3444 29.8047 5.9082C29.4141 5.47201 28.8379 5.24089 28.0762 5.21484C27.3079 5.20182 26.6374 5.39388 26.0645 5.79102C25.498 6.18164 25.1432 6.69922 25 7.34375H23.8574C23.9876 6.41927 24.4629 5.66732 25.2832 5.08789C26.1035 4.50195 27.0736 4.21549 28.1934 4.22852C29.2806 4.25456 30.1172 4.58333 30.7031 5.21484C31.2956 5.84635 31.5365 6.66667 31.4258 7.67578L30.5469 12.9883L30.4688 13.8379C30.4492 14.1895 30.4753 14.5378 30.5469 14.8828L30.5273 15H29.3262ZM25.8691 14.1699C26.5853 14.196 27.2689 14.0267 27.9199 13.6621C28.5775 13.291 29.1211 12.7669 29.5508 12.0898L29.9512 9.75586L28.0859 9.74609C26.901 9.74609 25.9342 9.95768 25.1855 10.3809C24.4368 10.7975 24.0234 11.3965 23.9453 12.1777C23.8867 12.7507 24.0365 13.2227 24.3945 13.5938C24.7591 13.9648 25.2507 14.1569 25.8691 14.1699ZM36.6602 9.69727L35.0977 11.0156L34.4043 15H33.2422L35.8496 0H37.0117L35.3516 9.51172L36.5625 8.39844L41.1621 4.43359H42.7148L37.5195 8.93555L41.1621 15H39.873L36.6602 9.69727ZM46.8457 15.1953C45.9993 15.1823 45.2669 14.9479 44.6484 14.4922C44.0299 14.0299 43.5742 13.4049 43.2812 12.6172C42.9948 11.8229 42.8939 10.9668 42.9785 10.0488L43.0078 9.7168C43.099 8.74023 43.3887 7.8125 43.877 6.93359C44.3652 6.04818 44.9837 5.37435 45.7324 4.91211C46.4811 4.44336 47.2819 4.21875 48.1348 4.23828C48.9225 4.2513 49.5866 4.46615 50.127 4.88281C50.6738 5.29948 51.071 5.87891 51.3184 6.62109C51.5658 7.36328 51.6439 8.18359 51.5527 9.08203L51.4746 9.79492H44.1602L44.1309 10.0293C44.0332 10.7389 44.0853 11.4193 44.2871 12.0703C44.4889 12.7148 44.8177 13.2292 45.2734 13.6133C45.7357 13.9909 46.2891 14.1862 46.9336 14.1992C47.5586 14.2188 48.1217 14.0983 48.623 13.8379C49.1243 13.5775 49.5866 13.2292 50.0098 12.793L50.6934 13.3496C50.2181 13.9616 49.6517 14.4271 48.9941 14.7461C48.3431 15.0586 47.627 15.2083 46.8457 15.1953ZM48.0762 5.23438C47.2298 5.20182 46.4714 5.5013 45.8008 6.13281C45.1302 6.76432 44.6257 7.65299 44.2871 8.79883L50.4199 8.80859L50.4492 8.66211C50.5664 7.73763 50.4036 6.94336 49.9609 6.2793C49.5182 5.60872 48.89 5.26042 48.0762 5.23438ZM64.1699 15C64.1374 14.7526 64.1276 14.5052 64.1406 14.2578L64.2285 13.5254C63.7402 14.0527 63.1803 14.4661 62.5488 14.7656C61.9238 15.0651 61.2467 15.2083 60.5176 15.1953C59.6257 15.1823 58.8997 14.9023 58.3398 14.3555C57.7865 13.8021 57.5391 13.1087 57.5977 12.2754C57.6497 11.5788 57.8874 10.9766 58.3105 10.4688C58.7402 9.95443 59.349 9.55729 60.1367 9.27734C60.9245 8.99089 61.8066 8.84766 62.7832 8.84766L64.9414 8.85742L65.1172 7.64648C65.1953 6.92383 65.0391 6.3444 64.6484 5.9082C64.2578 5.47201 63.6816 5.24089 62.9199 5.21484C62.1517 5.20182 61.4811 5.39388 60.9082 5.79102C60.3418 6.18164 59.987 6.69922 59.8438 7.34375H58.7012C58.8314 6.41927 59.3066 5.66732 60.127 5.08789C60.9473 4.50195 61.9173 4.21549 63.0371 4.22852C64.1243 4.25456 64.9609 4.58333 65.5469 5.21484C66.1393 5.84635 66.3802 6.66667 66.2695 7.67578L65.3906 12.9883L65.3125 13.8379C65.293 14.1895 65.319 14.5378 65.3906 14.8828L65.3711 15H64.1699ZM60.7129 14.1699C61.429 14.196 62.1126 14.0267 62.7637 13.6621C63.4212 13.291 63.9648 12.7669 64.3945 12.0898L64.7949 9.75586L62.9297 9.74609C61.7448 9.74609 60.778 9.95768 60.0293 10.3809C59.2806 10.7975 58.8672 11.3965 58.7891 12.1777C58.7305 12.7507 58.8802 13.2227 59.2383 13.5938C59.6029 13.9648 60.0944 14.1569 60.7129 14.1699Z" fill="#FF7B51" />
            </svg>

          </animated.div>
          <div className="center">
            <h5>How many guests are there in your party?</h5>
            <Buttons setNumberOfGuests={updateNumberOfGuests} />
          </div>
        </section>
        {numberOfGuestsPicked && (
          <section
            data-testid="calander-component"
            className="bookings-page__calander-container"
            ref={calanderRef}
          >
            <h5>Sounds great! What date do you wish to visit us?</h5>
            <CalanderComponent change={updateDate} />
          </section>
        )}
        {datePicked && numberOfGuestsPicked && (
          <section
            data-testid="sittings-component"
            ref={sittingRef}
            className={"bookings-page__sittings-container"}
          >
            <SittingsComponents
              updateSitting={updateSitting}
              availableTables={sittingAvailability}
            />
          </section>
        )}
        {datePicked && numberOfGuestsPicked && sittingPicked && (
          <section
            className="bookings-page__guest-information"
            ref={guestInfoRef}
          >
            <GuestInfoComponent updateInformation={updateUserInformation} />
          </section>
        )}
      </main>
    </>
  );
};

export default BookingsComponent;
