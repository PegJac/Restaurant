import React, { FC } from "react";
import { menuItems } from "./menuItems";

const MenuComponent: FC = () => {
  const itemsOnTheMenu = menuItems.map((item, i) => {
    return (
      <div className="menuItemContainer" key={i}>
        <div className="menuItemName">{item.name}</div>
        <div className="menuItemPrice">
          {item.price.toLocaleString("sv-se", {
            style: "currency",
            currency: "SEK",
          })}
        </div>
      </div>
    );
  });

  return (
    <div className="menuContainer">
      <svg className="heading" width="10em" height="5em" viewBox="0 0 150 66" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.50488 12.1763V12.7988L2.79053 12.1177L5.68359 6.0752H6.43066L7.21436 12.1323L7.2583 12.8794L7.55859 12.125L10.1807 6.0752H11.1108L7.49268 14H6.74561L5.87402 7.71582L5.8667 7.27637L5.69824 7.72314L2.66602 14H1.91895L1.07666 6.0752L1.89697 6.06787L2.50488 12.1763ZM13.3374 7.41553C14.0991 6.40479 14.9976 5.90918 16.0327 5.92871C16.7944 5.94824 17.3486 6.21436 17.6953 6.72705C18.042 7.23975 18.1641 7.94531 18.0615 8.84375L17.1973 14H16.333L17.1973 8.8291C17.2266 8.55078 17.2314 8.28223 17.2119 8.02344C17.1289 7.1543 16.6553 6.70752 15.791 6.68311C15.2783 6.67334 14.7998 6.82715 14.3555 7.14453C13.9111 7.45703 13.5205 7.93066 13.1836 8.56543L12.2461 14H11.3818L13.3374 2.75H14.2017L13.3374 7.41553ZM24.3677 14C24.3433 13.8145 24.3359 13.6289 24.3457 13.4434L24.4116 12.894C24.0454 13.2896 23.6255 13.5996 23.1519 13.8242C22.6831 14.0488 22.1753 14.1562 21.6284 14.1465C20.9595 14.1367 20.415 13.9268 19.9951 13.5166C19.5801 13.1016 19.3945 12.5815 19.4385 11.9565C19.4775 11.4341 19.6558 10.9824 19.9731 10.6016C20.2954 10.2158 20.752 9.91797 21.3428 9.70801C21.9336 9.49316 22.5952 9.38574 23.3276 9.38574L24.9463 9.39307L25.0781 8.48486C25.1367 7.94287 25.0195 7.5083 24.7266 7.18115C24.4336 6.854 24.0015 6.68066 23.4302 6.66113C22.854 6.65137 22.3511 6.79541 21.9214 7.09326C21.4966 7.38623 21.2305 7.77441 21.123 8.25781H20.2661C20.3638 7.56445 20.7202 7.00049 21.3354 6.56592C21.9507 6.12646 22.6782 5.91162 23.5181 5.92139C24.3335 5.94092 24.9609 6.1875 25.4004 6.66113C25.8447 7.13477 26.0254 7.75 25.9424 8.50684L25.2832 12.4912L25.2246 13.1284C25.21 13.3921 25.2295 13.6533 25.2832 13.9121L25.2686 14H24.3677ZM21.7749 13.3774C22.312 13.397 22.8247 13.27 23.313 12.9966C23.8062 12.7183 24.2139 12.3252 24.5361 11.8174L24.8364 10.0669L23.4375 10.0596C22.5488 10.0596 21.8237 10.2183 21.2622 10.5356C20.7007 10.8481 20.3906 11.2974 20.332 11.8833C20.2881 12.313 20.4004 12.667 20.6689 12.9453C20.9424 13.2236 21.311 13.3677 21.7749 13.3774ZM30.3735 4.04639L30.022 6.0752H31.6113L31.4868 6.79297H29.8975L29.0186 12.0811L29.0039 12.5352C29.0039 13.0674 29.248 13.3408 29.7363 13.3555C29.8877 13.3604 30.1245 13.3433 30.4468 13.3042L30.4102 14.022C30.1221 14.105 29.8291 14.1416 29.5312 14.1318C29.0186 14.1221 28.645 13.9438 28.4106 13.5972C28.1763 13.2456 28.0908 12.7378 28.1543 12.0737L29.0259 6.79297H27.605L27.7368 6.0752H29.1431L29.502 4.04639H30.3735ZM33.3765 5.96533L32.8564 5.55518C33.374 4.94971 33.6963 4.3418 33.8232 3.73145L33.999 2.75H34.856L34.7241 3.58496C34.5728 4.54199 34.1235 5.33545 33.3765 5.96533ZM38.9062 11.9346C38.9844 11.2607 38.5742 10.7725 37.6758 10.4697L36.416 10.0962C35.2588 9.70557 34.7119 9.05371 34.7754 8.14062C34.8096 7.48145 35.1123 6.94678 35.6836 6.53662C36.2598 6.12158 36.9434 5.91895 37.7344 5.92871C38.5107 5.93848 39.1406 6.1582 39.624 6.58789C40.1074 7.0127 40.332 7.58154 40.2979 8.29443H39.4336C39.4629 7.8208 39.314 7.43506 38.9868 7.13721C38.6646 6.83936 38.2349 6.68555 37.6978 6.67578C37.1411 6.67578 36.6724 6.80762 36.2915 7.07129C35.9106 7.33008 35.6958 7.67432 35.647 8.104C35.5737 8.73389 35.9595 9.17578 36.8042 9.42969L37.7197 9.69336L38.2104 9.86182C39.314 10.2769 39.834 10.9531 39.7705 11.8906C39.7314 12.5254 39.4556 13.0479 38.9429 13.458C38.4351 13.8633 37.7783 14.0903 36.9727 14.1392L36.6724 14.1465C36.1401 14.1367 35.6592 14.0342 35.2295 13.8389C34.7998 13.6387 34.4702 13.3604 34.2407 13.0039C34.0112 12.6475 33.9111 12.2373 33.9404 11.7734L34.812 11.7808C34.812 12.2788 34.9805 12.6719 35.3174 12.96C35.6543 13.248 36.1182 13.397 36.709 13.4067C37.2949 13.4067 37.793 13.2749 38.2031 13.0112C38.6133 12.7427 38.8477 12.3838 38.9062 11.9346ZM45.1685 9.96436C45.2563 9.19775 45.4907 8.49707 45.8716 7.8623C46.2524 7.22266 46.7261 6.73682 47.2925 6.40479C47.8638 6.07275 48.4814 5.91406 49.1455 5.92871C49.7998 5.93848 50.3564 6.11914 50.8154 6.4707C51.2793 6.81738 51.6162 7.29346 51.8262 7.89893C52.041 8.49951 52.1143 9.16602 52.0459 9.89844L52.0312 10.0376C51.8848 11.2876 51.4404 12.291 50.6982 13.0479C49.9609 13.8047 49.0747 14.1709 48.0396 14.1465C47.1509 14.1318 46.4404 13.8047 45.9082 13.165C45.376 12.5254 45.1147 11.6807 45.1245 10.6309L45.1465 10.2134L45.1685 9.96436ZM46.0181 10.2134C45.9546 10.7944 45.9961 11.3315 46.1426 11.8247C46.2939 12.313 46.5332 12.6963 46.8604 12.9746C47.1875 13.2529 47.5952 13.3994 48.0835 13.4141C48.6108 13.4238 49.0918 13.2896 49.5264 13.0112C49.9658 12.7329 50.3271 12.3398 50.6104 11.832C50.8936 11.3242 51.0767 10.7627 51.1597 10.1475L51.1816 9.90576C51.2695 8.96338 51.123 8.19434 50.7422 7.59863C50.3662 6.99805 49.8193 6.69043 49.1016 6.67578C48.3203 6.65137 47.644 6.9541 47.0728 7.58398C46.5063 8.20898 46.1597 9.0415 46.0327 10.0815L46.0181 10.2134ZM55.4004 6.0752L55.1367 7.43018C55.4883 6.94189 55.8936 6.56836 56.3525 6.30957C56.8164 6.0459 57.312 5.91895 57.8394 5.92871C58.6011 5.94824 59.1553 6.21436 59.502 6.72705C59.8486 7.23975 59.9707 7.94531 59.8682 8.84375L59.0039 14H58.1396L59.0039 8.8291C59.0332 8.55078 59.0381 8.28223 59.0186 8.02344C58.9355 7.1543 58.4619 6.70752 57.5977 6.68311C57.085 6.67334 56.6064 6.82715 56.1621 7.14453C55.7178 7.45703 55.3271 7.93066 54.9902 8.56543L54.0527 14H53.1885L54.5654 6.0752H55.4004ZM67.9468 4.04639L67.5952 6.0752H69.1846L69.0601 6.79297H67.4707L66.5918 12.0811L66.5771 12.5352C66.5771 13.0674 66.8213 13.3408 67.3096 13.3555C67.4609 13.3604 67.6978 13.3433 68.02 13.3042L67.9834 14.022C67.6953 14.105 67.4023 14.1416 67.1045 14.1318C66.5918 14.1221 66.2183 13.9438 65.9839 13.5972C65.7495 13.2456 65.6641 12.7378 65.7275 12.0737L66.5991 6.79297H65.1782L65.3101 6.0752H66.7163L67.0752 4.04639H67.9468ZM71.5796 7.41553C72.3413 6.40479 73.2397 5.90918 74.2749 5.92871C75.0366 5.94824 75.5908 6.21436 75.9375 6.72705C76.2842 7.23975 76.4062 7.94531 76.3037 8.84375L75.4395 14H74.5752L75.4395 8.8291C75.4688 8.55078 75.4736 8.28223 75.4541 8.02344C75.3711 7.1543 74.8975 6.70752 74.0332 6.68311C73.5205 6.67334 73.042 6.82715 72.5977 7.14453C72.1533 7.45703 71.7627 7.93066 71.4258 8.56543L70.4883 14H69.624L71.5796 2.75H72.4438L71.5796 7.41553ZM80.8228 14.1465C80.188 14.1367 79.6387 13.9609 79.1748 13.6191C78.7109 13.2725 78.3691 12.8037 78.1494 12.2129C77.9346 11.6172 77.8589 10.9751 77.9224 10.2866L77.9443 10.0376C78.0127 9.30518 78.23 8.60938 78.5962 7.9502C78.9624 7.28613 79.4263 6.78076 79.9878 6.43408C80.5493 6.08252 81.1499 5.91406 81.7896 5.92871C82.3804 5.93848 82.8784 6.09961 83.2837 6.41211C83.6938 6.72461 83.9917 7.15918 84.1772 7.71582C84.3628 8.27246 84.4214 8.8877 84.353 9.56152L84.2944 10.0962H78.8086L78.7866 10.272C78.7134 10.8042 78.7524 11.3145 78.9038 11.8027C79.0552 12.2861 79.3018 12.6719 79.6436 12.96C79.9902 13.2432 80.4053 13.3896 80.8887 13.3994C81.3574 13.4141 81.7798 13.3237 82.1558 13.1284C82.5317 12.9331 82.8784 12.6719 83.1958 12.3447L83.7085 12.7622C83.3521 13.2212 82.9272 13.5703 82.4341 13.8096C81.9458 14.0439 81.4087 14.1562 80.8228 14.1465ZM81.7456 6.67578C81.1108 6.65137 80.542 6.87598 80.0391 7.34961C79.5361 7.82324 79.1577 8.48975 78.9038 9.34912L83.5034 9.35645L83.5254 9.24658C83.6133 8.55322 83.4912 7.95752 83.1592 7.45947C82.8271 6.95654 82.356 6.69531 81.7456 6.67578Z" fill="#FF7B51" />
        <path d="M11.1084 27.1172L14.1675 45.1128L23.4473 27.1172H30.1123L25.7886 52H20.7642L21.9946 44.9077L24.4214 33.8335L14.8853 52H11.4502L8.11768 33.2012L6.51123 45.4546L5.36621 52H0.358887L4.68262 27.1172H11.1084ZM46.6895 41.2163H37.1533L35.9912 47.8813H47.2021L46.4844 52H30.2661L34.5898 27.1172H50.7739L50.0391 31.27H38.8794L37.8369 37.2002H47.4072L46.6895 41.2163ZM69.2139 52H64.3604L57.439 35.4058L54.5508 52H49.5435L53.8672 27.1172H58.7036L65.6421 43.7456L68.5303 27.1172H73.5205L69.2139 52ZM96.4038 27.1172L93.6011 43.5234C93.2137 46.2692 92.0744 48.4396 90.1831 50.0347C88.2918 51.6297 85.9448 52.4045 83.1421 52.3589C81.3875 52.3247 79.8608 51.943 78.562 51.2139C77.2746 50.4733 76.3232 49.4365 75.708 48.1035C75.0928 46.7591 74.882 45.2381 75.0757 43.5405L77.8613 27.1172H82.8687L80.083 43.5576C80.0033 44.1956 79.9976 44.7938 80.0659 45.3521C80.2938 47.1978 81.3932 48.1548 83.3643 48.2231C84.777 48.2687 85.9334 47.8813 86.8335 47.061C87.7336 46.2407 88.3146 45.0672 88.5767 43.5405L91.3794 27.1172H96.4038Z" fill="#FF7B51" />
        <path d="M0 55.418H95.874V57.127H0V55.418Z" fill="#FF7B51" />
      </svg>

      {/* <h1 className="heading"> What's on the menu </h1> */}
      <section className="itemsContainer">{itemsOnTheMenu}</section>
    </div>
  );
};

export default MenuComponent;
