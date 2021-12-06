import { Link } from "react-router-dom";
export default function ConfirmCancellationComponent() {
  return (
    <div className="confirmCancellation-wrapper">
      <Link to="/">
        <svg
          className="heading"
          width="10em"
          height="6em"
          viewBox="0 0 150 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.74805 18H0.576172L3.18359 3H4.35547L1.74805 18ZM11.4746 18C11.4421 17.7526 11.4323 17.5052 11.4453 17.2578L11.5332 16.5254C11.0449 17.0527 10.485 17.4661 9.85352 17.7656C9.22852 18.0651 8.55143 18.2083 7.82227 18.1953C6.93034 18.1823 6.20443 17.9023 5.64453 17.3555C5.09115 16.8021 4.84375 16.1087 4.90234 15.2754C4.95443 14.5788 5.19206 13.9766 5.61523 13.4688C6.04492 12.9544 6.65365 12.5573 7.44141 12.2773C8.22917 11.9909 9.11133 11.8477 10.0879 11.8477L12.2461 11.8574L12.4219 10.6465C12.5 9.92383 12.3438 9.3444 11.9531 8.9082C11.5625 8.47201 10.9863 8.24089 10.2246 8.21484C9.45638 8.20182 8.78581 8.39388 8.21289 8.79102C7.64648 9.18164 7.29167 9.69922 7.14844 10.3438H6.00586C6.13607 9.41927 6.61133 8.66732 7.43164 8.08789C8.25195 7.50195 9.22201 7.21549 10.3418 7.22852C11.429 7.25456 12.2656 7.58333 12.8516 8.21484C13.444 8.84635 13.6849 9.66667 13.5742 10.6758L12.6953 15.9883L12.6172 16.8379C12.5977 17.1895 12.6237 17.5378 12.6953 17.8828L12.6758 18H11.4746ZM8.01758 17.1699C8.73372 17.196 9.41732 17.0267 10.0684 16.6621C10.7259 16.291 11.2695 15.7669 11.6992 15.0898L12.0996 12.7559L10.2344 12.7461C9.04948 12.7461 8.08268 12.9577 7.33398 13.3809C6.58529 13.7975 6.17188 14.3965 6.09375 15.1777C6.03516 15.7507 6.1849 16.2227 6.54297 16.5938C6.90755 16.9648 7.39909 17.1569 8.01758 17.1699ZM19.4824 4.72852L19.0137 7.43359H21.1328L20.9668 8.39062H18.8477L17.6758 15.4414L17.6562 16.0469C17.6562 16.7565 17.9818 17.1211 18.6328 17.1406C18.8346 17.1471 19.1504 17.1243 19.5801 17.0723L19.5312 18.0293C19.1471 18.14 18.7565 18.1888 18.3594 18.1758C17.6758 18.1628 17.1777 17.9251 16.8652 17.4629C16.5527 16.9941 16.4388 16.3171 16.5234 15.4316L17.6855 8.39062H15.791L15.9668 7.43359H17.8418L18.3203 4.72852H19.4824ZM25.9082 18.1953C25.0618 18.1823 24.3294 17.9479 23.7109 17.4922C23.0924 17.0299 22.6367 16.4049 22.3438 15.6172C22.0573 14.8229 21.9564 13.9668 22.041 13.0488L22.0703 12.7168C22.1615 11.7402 22.4512 10.8125 22.9395 9.93359C23.4277 9.04818 24.0462 8.37435 24.7949 7.91211C25.5436 7.44336 26.3444 7.21875 27.1973 7.23828C27.985 7.2513 28.6491 7.46615 29.1895 7.88281C29.7363 8.29948 30.1335 8.87891 30.3809 9.62109C30.6283 10.3633 30.7064 11.1836 30.6152 12.082L30.5371 12.7949H23.2227L23.1934 13.0293C23.0957 13.7389 23.1478 14.4193 23.3496 15.0703C23.5514 15.7148 23.8802 16.2292 24.3359 16.6133C24.7982 16.9909 25.3516 17.1862 25.9961 17.1992C26.6211 17.2188 27.1842 17.0983 27.6855 16.8379C28.1868 16.5775 28.6491 16.2292 29.0723 15.793L29.7559 16.3496C29.2806 16.9616 28.7142 17.4271 28.0566 17.7461C27.4056 18.0586 26.6895 18.2083 25.9082 18.1953ZM27.1387 8.23438C26.2923 8.20182 25.5339 8.5013 24.8633 9.13281C24.1927 9.76432 23.6882 10.653 23.3496 11.7988L29.4824 11.8086L29.5117 11.6621C29.6289 10.7376 29.4661 9.94336 29.0234 9.2793C28.5807 8.60872 27.9525 8.26042 27.1387 8.23438ZM39.6094 7.43359L39.2578 9.24023C39.7266 8.58919 40.2669 8.09115 40.8789 7.74609C41.4974 7.39453 42.1582 7.22526 42.8613 7.23828C43.877 7.26432 44.6159 7.61914 45.0781 8.30273C45.5404 8.98633 45.7031 9.92708 45.5664 11.125L44.4141 18H43.2617L44.4141 11.1055C44.4531 10.7344 44.4596 10.3763 44.4336 10.0312C44.3229 8.8724 43.6914 8.27669 42.5391 8.24414C41.8555 8.23112 41.2174 8.4362 40.625 8.85938C40.0326 9.27604 39.5117 9.90755 39.0625 10.7539L37.8125 18H36.6602L38.4961 7.43359H39.6094ZM48.7207 18H47.5488L49.3945 7.43359H50.5566L48.7207 18ZM49.7168 4.37695C49.7493 3.95378 50.0293 3.68685 50.5566 3.57617C50.8105 3.62174 50.9896 3.70312 51.0938 3.82031C51.2044 3.93099 51.276 4.11654 51.3086 4.37695C51.2435 4.62435 51.1491 4.80664 51.0254 4.92383C50.9017 5.03451 50.7161 5.11589 50.4688 5.16797C49.9414 5.08984 49.6908 4.82617 49.7168 4.37695ZM57.1387 7.22852C57.7702 7.24805 58.3464 7.39779 58.8672 7.67773C59.388 7.95768 59.7982 8.38411 60.0977 8.95703L60.459 7.43359H61.543L59.7656 17.8145C59.6419 18.6999 59.362 19.4811 58.9258 20.1582C58.4896 20.8353 57.9297 21.3529 57.2461 21.7109C56.569 22.0755 55.8138 22.2448 54.9805 22.2188C54.3164 22.2057 53.6816 22.0397 53.0762 21.7207C52.4642 21.3952 51.9727 20.9427 51.6016 20.3633L52.3242 19.6797C52.9948 20.6888 53.8704 21.2064 54.9512 21.2324C55.9147 21.2585 56.7188 20.9655 57.3633 20.3535C58.0143 19.748 58.4245 18.9212 58.5938 17.873L58.8477 16.6426C57.9102 17.7168 56.7806 18.2344 55.459 18.1953C54.4694 18.1693 53.6979 17.7917 53.1445 17.0625C52.5977 16.3268 52.3112 15.3275 52.2852 14.0645C52.2461 12.8991 52.4414 11.7467 52.8711 10.6074C53.3008 9.4681 53.8835 8.61523 54.6191 8.04883C55.3613 7.47591 56.2012 7.20247 57.1387 7.22852ZM53.5059 12.8926L53.4473 13.8008C53.4277 14.8685 53.6133 15.6953 54.0039 16.2812C54.3945 16.8607 54.9707 17.1634 55.7324 17.1895C56.3835 17.2155 56.9922 17.0625 57.5586 16.7305C58.125 16.3984 58.6133 15.9069 59.0234 15.2559L59.8535 10.3242C59.6777 9.69271 59.3717 9.19466 58.9355 8.83008C58.5059 8.45898 57.9525 8.26367 57.2754 8.24414C56.2793 8.21159 55.4525 8.5957 54.7949 9.39648C54.1439 10.1973 53.7142 11.3626 53.5059 12.8926ZM65.3418 9.2207C66.3574 7.87305 67.5553 7.21224 68.9355 7.23828C69.9512 7.26432 70.6901 7.61914 71.1523 8.30273C71.6146 8.98633 71.7773 9.92708 71.6406 11.125L70.4883 18H69.3359L70.4883 11.1055C70.5273 10.7344 70.5339 10.3763 70.5078 10.0312C70.3971 8.8724 69.7656 8.27669 68.6133 8.24414C67.9297 8.23112 67.2917 8.4362 66.6992 8.85938C66.1068 9.27604 65.5859 9.90755 65.1367 10.7539L63.8867 18H62.7344L65.3418 3H66.4941L65.3418 9.2207ZM77.5684 4.72852L77.0996 7.43359H79.2188L79.0527 8.39062H76.9336L75.7617 15.4414L75.7422 16.0469C75.7422 16.7565 76.0677 17.1211 76.7188 17.1406C76.9206 17.1471 77.2363 17.1243 77.666 17.0723L77.6172 18.0293C77.2331 18.14 76.8424 18.1888 76.4453 18.1758C75.7617 18.1628 75.2637 17.9251 74.9512 17.4629C74.6387 16.9941 74.5247 16.3171 74.6094 15.4316L75.7715 8.39062H73.877L74.0527 7.43359H75.9277L76.4062 4.72852H77.5684Z"
            fill="#FF7B51"
          />
          <path
            d="M0.358887 52L4.68262 27.1172L12.4414 27.1343C15.3239 27.1457 17.4886 27.7324 18.9355 28.8945C20.3825 30.0566 21.0376 31.6916 20.9009 33.7993C20.7414 36.3172 19.2887 38.1572 16.543 39.3193C17.5342 39.6611 18.3032 40.3049 18.8501 41.2505C19.397 42.1847 19.6305 43.2899 19.5508 44.5659C19.3913 46.9129 18.4684 48.7415 16.7822 50.0518C15.1074 51.3506 12.8174 52 9.91211 52H0.358887ZM7.26318 41.165L6.08398 47.8813L10.0317 47.8984C11.2622 47.8984 12.2933 47.5965 13.125 46.9927C13.9567 46.3774 14.4523 45.5514 14.6118 44.5146C14.7713 43.4893 14.6289 42.6917 14.1846 42.1221C13.7516 41.541 13.0168 41.2277 11.98 41.1821L7.26318 41.165ZM7.87842 37.542L11.2793 37.5762C12.5439 37.5534 13.575 37.2572 14.3726 36.6875C15.1815 36.1178 15.6657 35.326 15.8252 34.312C16.11 32.3068 15.0562 31.2985 12.6636 31.2871L8.97217 31.27L7.87842 37.542ZM32.8638 42.8911H28.7964L27.207 52H22.1997L26.5234 27.1172L34.7607 27.1343C37.5179 27.1343 39.637 27.7837 41.1182 29.0825C42.6107 30.3813 43.2715 32.1872 43.1006 34.5C42.8613 37.918 41.0384 40.2935 37.6318 41.6265L41.1353 51.7266V52H35.8032L32.8638 42.8911ZM29.5142 38.7383L33.2397 38.7725C34.5614 38.7497 35.6494 38.3965 36.5039 37.7129C37.3698 37.0179 37.8882 36.078 38.0591 34.8931C38.2186 33.7879 38.042 32.922 37.5293 32.2954C37.0166 31.6688 36.202 31.3327 35.0854 31.2871L30.813 31.27L29.5142 38.7383ZM66.7358 27.1172L63.9331 43.5234C63.5457 46.2692 62.4064 48.4396 60.5151 50.0347C58.6239 51.6297 56.2769 52.4045 53.4741 52.3589C51.7196 52.3247 50.1929 51.943 48.894 51.2139C47.6066 50.4733 46.6553 49.4365 46.04 48.1035C45.4248 46.7591 45.214 45.2381 45.4077 43.5405L48.1934 27.1172H53.2007L50.415 43.5576C50.3353 44.1956 50.3296 44.7938 50.3979 45.3521C50.6258 47.1978 51.7253 48.1548 53.6963 48.2231C55.109 48.2687 56.2655 47.8813 57.1655 47.061C58.0656 46.2407 58.6466 45.0672 58.9087 43.5405L61.7114 27.1172H66.7358ZM86.2354 52H81.3818L74.4604 35.4058L71.5723 52H66.5649L70.8887 27.1172H75.7251L82.6636 43.7456L85.5518 27.1172H90.542L86.2354 52ZM111.016 43.6943C110.822 45.4147 110.235 46.9414 109.255 48.2744C108.276 49.596 107 50.6157 105.427 51.3335C103.855 52.0399 102.157 52.376 100.334 52.3418C98.6938 52.3076 97.264 51.9316 96.0449 51.2139C94.8258 50.4847 93.8631 49.4365 93.1567 48.0693C92.4618 46.6908 92.0687 45.1071 91.9775 43.3184C91.8978 41.917 92.0402 40.1738 92.4048 38.0889C92.7808 36.0039 93.4416 34.1525 94.3872 32.5347C95.3442 30.9168 96.4779 29.6351 97.7881 28.6895C99.6338 27.3678 101.742 26.7298 104.111 26.7754C106.686 26.821 108.726 27.6185 110.229 29.168C111.745 30.7061 112.576 32.848 112.725 35.5938L107.734 35.5767C107.734 34.0044 107.421 32.8537 106.794 32.1245C106.168 31.3953 105.194 31.008 103.872 30.9624C102.163 30.9054 100.756 31.515 99.6509 32.791C98.5571 34.0671 97.8223 35.9299 97.4463 38.3794C97.0817 40.7606 96.9222 42.5436 96.9678 43.7285C97.0247 45.2324 97.3608 46.3433 97.9761 47.061C98.5913 47.7674 99.4515 48.1377 100.557 48.1719C102.083 48.2288 103.302 47.87 104.214 47.0952C105.137 46.3091 105.746 45.1868 106.042 43.7285L111.016 43.6943ZM132.805 52H127.798L129.644 41.3359H119.988L118.125 52H113.118L117.441 27.1172H122.449L120.688 37.2002H130.361L132.104 27.1172H137.112L132.805 52Z"
            fill="#FF7B51"
          />
          <path d="M0 55.418H136.924V57.127H0V55.418Z" fill="#FF7B51" />
        </svg>
      </Link>

      <div className="confirmCancellation-container">
        <h1>Your booking has been cancelled! </h1>
        <p>Be sure to check your email for confirmation</p>
      </div>
    </div>
  );
}