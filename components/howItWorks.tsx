import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useHowItWorks } from '../context/howItWorksContext'
import { Button } from './button'

export const HowItWorks = () => {
  const { howItWorks, setHowItWorks } = useHowItWorks()

  return (
    <Transition.Root show={howItWorks} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setHowItWorks}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-opacity-80 bg-zinc-800" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 translate-y-0 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 translate-y-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-6xl px-6 py-12 my-8 overflow-hidden text-center text-white transition-all transform rounded-lg shadow-xl md:py-20 md:px-32 bg-zinc-900 bg-opacity-95">
                <div>
                  <svg
                    width="195"
                    height="73"
                    viewBox="0 0 195 73"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto mb-8 md:mb-16 md:scale-150 fill-slate-50"
                  >
                    <path d="M61.0877 40.8126H46.7831V40.908C46.7831 43.8325 47.4189 46.0258 48.6904 47.4881C49.9619 48.9185 51.599 49.6338 53.6016 49.6338C56.9711 49.6338 59.387 48.1715 60.8493 45.247H60.9446C59.7367 51.1278 56.2241 54.0682 50.4069 54.0682C47.1328 54.0682 44.3672 53.051 42.1103 51.0165C39.8533 48.9821 38.7249 45.9941 38.7249 42.0523C38.7249 37.8881 39.8533 34.7888 42.1103 32.7544C44.3672 30.7199 47.2281 29.7027 50.693 29.7027C52.0281 29.7027 53.2837 29.8776 54.4599 30.2272C55.636 30.5769 56.7327 31.1173 57.7499 31.8484C58.7989 32.5795 59.6254 33.6285 60.2294 34.9954C60.8334 36.3305 61.1354 37.9199 61.1354 39.7636C61.1354 40.0815 61.1195 40.4312 61.0877 40.8126ZM50.5977 30.6087C49.3579 30.6087 48.4202 31.3398 47.7844 32.8021C47.1487 34.2325 46.8149 36.6166 46.7831 39.9543H53.7923C53.8241 39.5411 53.84 39.0643 53.84 38.5239C53.84 35.5676 53.5539 33.5173 52.9818 32.3729C52.4414 31.1968 51.6467 30.6087 50.5977 30.6087ZM69.2834 27.4617C68.2344 27.4617 67.3284 27.1438 66.5655 26.508C65.8344 25.8405 65.4688 24.9822 65.4688 23.9332C65.4688 22.8206 65.8344 21.9306 66.5655 21.263C67.3284 20.5637 68.2344 20.214 69.2834 20.214C70.396 20.214 71.3178 20.5637 72.0489 21.263C72.7801 21.9306 73.1456 22.8206 73.1456 23.9332C73.1456 24.9822 72.7801 25.8405 72.0489 26.508C71.3178 27.1438 70.396 27.4617 69.2834 27.4617ZM62.751 30.0842H73.3364V50.2536C73.3364 50.7622 73.4794 51.1437 73.7655 51.398L76.1019 53.5914V53.6867H62.751V53.5914L65.0874 51.398C65.3735 51.1437 65.5165 50.7622 65.5165 50.2536V33.7557C65.5165 33.2789 65.3735 32.8815 65.0874 32.5636L62.751 30.1795V30.0842ZM93.0562 30.0842V31.0378H87.1913V46.9636C87.1913 48.0444 87.4138 48.8868 87.8589 49.4907C88.3039 50.0629 88.9237 50.349 89.7184 50.349C90.9264 50.349 91.8482 49.7609 92.484 48.5848L92.5794 48.6325C92.2933 50.1583 91.578 51.4457 90.4337 52.4947C89.3211 53.5437 87.7158 54.0682 85.6178 54.0682C81.4854 54.0682 79.4192 51.8907 79.4192 47.5358V31.0378H76.7966V30.0842H78.9423C79.6099 30.0842 80.1026 29.9093 80.4205 29.5597L87.0959 22.0736H87.1913V30.0842H93.0562ZM94.2907 37.6179C94.2907 35.0113 95.2284 33.0405 97.1039 31.7054C98.9794 30.3703 101.459 29.7027 104.542 29.7027C107.244 29.7027 109.422 30.1478 111.075 31.0378C111.424 31.2285 111.758 31.1491 112.076 30.7994L117.035 25.5544L117.13 25.6021V32.7544H112.648C114.269 34.0577 115.08 35.7742 115.08 37.904C115.08 40.4153 114.126 42.2908 112.219 43.5305C110.344 44.7384 107.832 45.3424 104.685 45.3424C103.16 45.3424 101.872 45.2152 100.823 44.9609C99.8377 45.3424 99.345 45.9305 99.345 46.7252C99.345 48.1238 100.966 48.8232 104.209 48.8232H108.643C114.333 48.8232 117.178 50.9371 117.178 55.1649C117.178 58.0576 115.907 60.4099 113.363 62.2218C110.82 64.0337 107.61 64.9397 103.732 64.9397C101.125 64.9397 98.8364 64.5105 96.8655 63.6523C94.9265 62.8258 93.9569 61.6496 93.9569 60.1238C93.9569 59.1066 94.402 58.2006 95.292 57.4059C96.2139 56.643 97.6125 56.1185 99.488 55.8324C97.8351 55.4828 96.5476 54.847 95.6258 53.9251C94.7357 53.0033 94.2907 51.9066 94.2907 50.6351C94.2907 49.2364 94.8311 48.0285 95.9119 47.0113C96.9927 45.9941 98.4549 45.2629 100.299 44.8179C96.2933 43.8007 94.2907 41.4007 94.2907 37.6179ZM101.586 56.0708C100.855 56.0073 100.299 55.9437 99.9172 55.8801C98.6456 56.643 98.0099 57.6602 98.0099 58.9317C98.0099 60.4576 98.741 61.6655 100.203 62.5556C101.666 63.4774 103.382 63.9384 105.353 63.9384C107.26 63.9384 108.897 63.541 110.264 62.7463C111.663 61.9516 112.362 60.8231 112.362 59.3609C112.362 58.3755 112.012 57.6284 111.313 57.1198C110.646 56.6112 109.469 56.3251 107.785 56.2616L101.586 56.0708ZM101.634 37.4749C101.634 40.0179 101.888 41.8298 102.397 42.9106C102.905 43.9914 103.668 44.5318 104.685 44.5318C105.703 44.5318 106.465 44.0073 106.974 42.9583C107.483 41.8775 107.737 40.0656 107.737 37.5226C107.737 35.0113 107.483 33.2153 106.974 32.1345C106.497 31.0537 105.734 30.5133 104.685 30.5133C103.636 30.5133 102.858 31.0537 102.349 32.1345C101.872 33.1835 101.634 34.9636 101.634 37.4749ZM140.573 40.8126H126.269V40.908C126.269 43.8325 126.904 46.0258 128.176 47.4881C129.447 48.9185 131.084 49.6338 133.087 49.6338C136.457 49.6338 138.872 48.1715 140.335 45.247H140.43C139.222 51.1278 135.71 54.0682 129.892 54.0682C126.618 54.0682 123.853 53.051 121.596 51.0165C119.339 48.9821 118.21 45.9941 118.21 42.0523C118.21 37.8881 119.339 34.7888 121.596 32.7544C123.853 30.7199 126.714 29.7027 130.178 29.7027C131.514 29.7027 132.769 29.8776 133.945 30.2272C135.121 30.5769 136.218 31.1173 137.235 31.8484C138.284 32.5795 139.111 33.6285 139.715 34.9954C140.319 36.3305 140.621 37.9199 140.621 39.7636C140.621 40.0815 140.605 40.4312 140.573 40.8126ZM130.083 30.6087C128.843 30.6087 127.906 31.3398 127.27 32.8021C126.634 34.2325 126.3 36.6166 126.269 39.9543H133.278C133.31 39.5411 133.325 39.0643 133.325 38.5239C133.325 35.5676 133.039 33.5173 132.467 32.3729C131.927 31.1968 131.132 30.6087 130.083 30.6087ZM148.769 27.4617C147.72 27.4617 146.814 27.1438 146.051 26.508C145.32 25.8405 144.954 24.9822 144.954 23.9332C144.954 22.8206 145.32 21.9306 146.051 21.263C146.814 20.5637 147.72 20.214 148.769 20.214C149.881 20.214 150.803 20.5637 151.534 21.263C152.265 21.9306 152.631 22.8206 152.631 23.9332C152.631 24.9822 152.265 25.8405 151.534 26.508C150.803 27.1438 149.881 27.4617 148.769 27.4617ZM142.236 30.0842H152.822V50.2536C152.822 50.7622 152.965 51.1437 153.251 51.398L155.587 53.5914V53.6867H142.236V53.5914L144.573 51.398C144.859 51.1437 145.002 50.7622 145.002 50.2536V33.7557C145.002 33.2789 144.859 32.8815 144.573 32.5636L142.236 30.1795V30.0842ZM170.253 49.7291C170.253 48.8073 169.919 48.0762 169.252 47.5358C168.616 46.9954 167.424 46.3278 165.675 45.5331L162.433 44.0073C159.35 42.5451 157.808 40.2881 157.808 37.2365C157.808 34.9477 158.682 33.1199 160.43 31.7531C162.179 30.3862 164.563 29.7027 167.583 29.7027C170.38 29.7027 173.177 30.1319 175.975 30.9901L173.304 37.904H173.209L169.49 31.2762C169.204 30.7994 168.838 30.561 168.393 30.561H167.726C166.613 30.561 165.691 30.8471 164.96 31.4193C164.229 31.9915 163.863 32.8179 163.863 33.8987C163.863 34.8842 164.197 35.6789 164.865 36.2828C165.564 36.8868 166.693 37.5385 168.25 38.2378L171.302 39.5729C173.018 40.304 174.322 41.1623 175.212 42.1477C176.134 43.1331 176.595 44.4682 176.595 46.153C176.595 48.6642 175.625 50.6192 173.686 52.0179C171.747 53.3848 169.156 54.0682 165.914 54.0682C162.862 54.0682 159.938 53.5755 157.14 52.5901L159.763 45.1994H159.858L163.673 52.5901C163.863 53.0033 164.197 53.2099 164.674 53.2099H165.771C167.138 53.2099 168.218 52.892 169.013 52.2563C169.84 51.6205 170.253 50.7781 170.253 49.7291ZM194.287 30.0842V31.0378H188.422V46.9636C188.422 48.0444 188.645 48.8868 189.09 49.4907C189.535 50.0629 190.155 50.349 190.949 50.349C192.157 50.349 193.079 49.7609 193.715 48.5848L193.81 48.6325C193.524 50.1583 192.809 51.4457 191.665 52.4947C190.552 53.5437 188.947 54.0682 186.849 54.0682C182.716 54.0682 180.65 51.8907 180.65 47.5358V31.0378H178.028V30.0842H180.173C180.841 30.0842 181.334 29.9093 181.651 29.5597L188.327 22.0736H188.422V30.0842H194.287Z" />
                    <path d="M43.0045 14.2498C43.0045 14.4443 43.0713 14.6023 43.205 14.7238L44.5541 15.9635V16H38.1732V15.9635L39.5223 14.7238C39.656 14.5901 39.7228 14.4321 39.7228 14.2498V3.548H38.6837C38.5378 3.548 38.4345 3.56624 38.3737 3.6027C38.3251 3.62701 38.2704 3.70601 38.2096 3.83971L35.9672 8.10584H35.9307V3.18338H46.7966V8.10584H46.7601L44.5177 3.83971C44.4569 3.70601 44.3961 3.62701 44.3354 3.6027C44.2867 3.56624 44.1895 3.548 44.0437 3.548H43.0045V14.2498ZM57.0752 10.6765C57.0752 11.114 57.0631 11.8433 57.0387 12.8642C57.0266 13.873 57.0205 14.4807 57.0205 14.6873C57.0205 14.8697 57.0813 15.0155 57.2028 15.1249L58.0962 15.9635V16H52.9914V15.9635L53.8483 15.1249C53.9698 15.0155 54.0306 14.8757 54.0306 14.7056C54.0306 14.6691 54.0367 14.1465 54.0488 13.1377C54.0731 12.1167 54.0853 11.4361 54.0853 11.0958C54.0853 10.1842 53.982 9.49749 53.7753 9.03563C53.5809 8.57377 53.2223 8.34284 52.6997 8.34284C52.1649 8.34284 51.7091 8.61631 51.3323 9.16325V14.6873C51.3323 14.8697 51.3931 15.0155 51.5147 15.1249L52.408 15.9635V16H47.3032V15.9635L48.1966 15.1249C48.3059 15.0155 48.3606 14.8697 48.3606 14.6873V4.51426C48.3606 4.3198 48.3059 4.16787 48.1966 4.05848L47.3032 3.21984V3.18338L51.3323 2.70936V8.96271C51.8307 7.54066 52.7969 6.82964 54.2311 6.82964C55.1548 6.82964 55.8598 7.15781 56.346 7.81413C56.8321 8.47046 57.0752 9.42457 57.0752 10.6765ZM67.0576 11.0775H61.5882V11.114C61.5882 12.2322 61.8313 13.0708 62.3174 13.6299C62.8036 14.1769 63.4295 14.4503 64.1953 14.4503C65.4836 14.4503 66.4073 13.8912 66.9664 12.7731H67.0029C66.541 15.0216 65.198 16.1459 62.9738 16.1459C61.7219 16.1459 60.6645 15.7569 59.8015 14.979C58.9386 14.2012 58.5071 13.0587 58.5071 11.5516C58.5071 9.95935 58.9386 8.77432 59.8015 7.99645C60.6645 7.21858 61.7583 6.82964 63.0831 6.82964C63.5936 6.82964 64.0737 6.89649 64.5234 7.03019C64.9731 7.16388 65.3924 7.37051 65.7814 7.65005C66.1825 7.9296 66.4985 8.33069 66.7294 8.85332C66.9603 9.3638 67.0758 9.97151 67.0758 10.6765C67.0758 10.798 67.0697 10.9317 67.0576 11.0775ZM63.0467 7.17604C62.5727 7.17604 62.2141 7.45559 61.971 8.01468C61.728 8.56162 61.6003 9.47319 61.5882 10.7494H64.2682C64.2803 10.5914 64.2864 10.4091 64.2864 10.2024C64.2864 9.0721 64.177 8.28815 63.9583 7.8506C63.7516 7.40089 63.4478 7.17604 63.0467 7.17604Z" />
                    <path d="M10.7517 20.5687H17.7638L10.7517 33.1904V20.5687Z" />
                    <path d="M35.0603 54.2265H28.0483L35.0603 41.6048V54.2265Z" />
                    <path
                      d="M123.644 68.8324L121.189 64.3063H120.384V70.1735H121.122V65.6474L123.577 70.1735H124.382V64.3063H123.644V68.8324ZM125.749 70.1735H126.487V67.4662H129.001V66.7621H126.487V65.0104H129.412V64.3063H125.749V70.1735ZM132.414 65.0104V70.1735H133.151V65.0104H134.978V64.3063H130.586V65.0104H132.414ZM144.821 68.2457C144.552 69.1174 144.142 69.5365 143.412 69.5365C142.373 69.5365 141.753 68.7905 141.753 67.2399C141.753 65.6893 142.373 64.9433 143.412 64.9433C144.142 64.9433 144.552 65.3624 144.821 66.2341L145.516 66.0245C145.248 64.9433 144.51 64.2392 143.412 64.2392C142.708 64.2392 142.13 64.4991 141.669 65.0104C141.216 65.5216 140.99 66.2676 140.99 67.2399C140.99 68.2122 141.216 68.9581 141.669 69.4694C142.13 69.9807 142.708 70.2405 143.412 70.2405C144.51 70.2405 145.248 69.5365 145.516 68.4552L144.821 68.2457ZM146.733 65.0187C146.305 65.53 146.096 66.276 146.096 67.2399C146.096 68.2038 146.305 68.9498 146.733 69.4694C147.16 69.9807 147.705 70.2405 148.375 70.2405C149.046 70.2405 149.591 69.9807 150.018 69.4694C150.446 68.9498 150.655 68.2038 150.655 67.2399C150.655 66.276 150.446 65.53 150.018 65.0187C149.591 64.4991 149.046 64.2392 148.375 64.2392C147.705 64.2392 147.16 64.4991 146.733 65.0187ZM149.482 65.5049C149.758 65.8737 149.892 66.452 149.892 67.2399C149.892 68.0278 149.758 68.6061 149.482 68.9833C149.205 69.3521 148.836 69.5365 148.375 69.5365C147.914 69.5365 147.546 69.3521 147.269 68.9833C146.992 68.6061 146.858 68.0278 146.858 67.2399C146.858 66.452 146.992 65.8737 147.269 65.5049C147.546 65.1277 147.914 64.9433 148.375 64.9433C148.836 64.9433 149.205 65.1277 149.482 65.5049ZM155.819 69.4694H152.827V64.3063H152.089V70.1735H155.819V69.4694ZM161.017 69.4694H158.025V64.3063H157.287V70.1735H161.017V69.4694ZM162.133 70.1735H165.938V69.4694H162.87V67.3991H165.435V66.6951H162.87V65.0104H165.854V64.3063H162.133V70.1735ZM170.809 68.2457C170.541 69.1174 170.13 69.5365 169.401 69.5365C168.361 69.5365 167.741 68.7905 167.741 67.2399C167.741 65.6893 168.361 64.9433 169.401 64.9433C170.13 64.9433 170.541 65.3624 170.809 66.2341L171.504 66.0245C171.236 64.9433 170.499 64.2392 169.401 64.2392C168.697 64.2392 168.118 64.4991 167.657 65.0104C167.205 65.5216 166.978 66.2676 166.978 67.2399C166.978 68.2122 167.205 68.9581 167.657 69.4694C168.118 69.9807 168.697 70.2405 169.401 70.2405C170.499 70.2405 171.236 69.5365 171.504 68.4552L170.809 68.2457ZM173.995 65.0104V70.1735H174.732V65.0104H176.56V64.3063H172.168V65.0104H173.995ZM181.347 69.5365H179.93V64.9433H181.347V64.3063H177.776V64.9433H179.192V69.5365H177.776V70.1735H181.347V69.5365ZM183.116 65.0187C182.689 65.53 182.479 66.276 182.479 67.2399C182.479 68.2038 182.689 68.9498 183.116 69.4694C183.544 69.9807 184.088 70.2405 184.759 70.2405C185.429 70.2405 185.974 69.9807 186.402 69.4694C186.829 68.9498 187.039 68.2038 187.039 67.2399C187.039 66.276 186.829 65.53 186.402 65.0187C185.974 64.4991 185.429 64.2392 184.759 64.2392C184.088 64.2392 183.544 64.4991 183.116 65.0187ZM185.865 65.5049C186.142 65.8737 186.276 66.452 186.276 67.2399C186.276 68.0278 186.142 68.6061 185.865 68.9833C185.589 69.3521 185.22 69.5365 184.759 69.5365C184.298 69.5365 183.929 69.3521 183.653 68.9833C183.376 68.6061 183.242 68.0278 183.242 67.2399C183.242 66.452 183.376 65.8737 183.653 65.5049C183.929 65.1277 184.298 64.9433 184.759 64.9433C185.22 64.9433 185.589 65.1277 185.865 65.5049ZM191.214 68.8324L188.758 64.3063H187.953V70.1735H188.691V65.6474L191.147 70.1735H191.951V64.3063H191.214V68.8324Z"
                      fill="#2DD4BF"
                    />
                    <path d="M27.1133 20.5687H37.3977L18.6989 54.2265H8.41455L27.1133 20.5687Z" />
                  </svg>
                  <h2 className="flex items-center justify-center mx-auto mb-12 text-3xl text-teal-500 md:text-5xl">
                    &ldquo;zeit
                    <span className="mx-2 text-xl translate-y-1 md:text-2xl">&bull;</span>
                    geist&rdquo;
                  </h2>
                  <div className="leading-loose text-left md:text-lg">
                    <div className="space-y-6 h-[50vh] lg:h-auto overflow-auto">
                      <p>
                        AI is changing the world. One moment and experience at a time. These
                        defining moments capture the essence or mood of a particular moment in time.
                      </p>
                      <p>
                        The Zeitgeist collection started with a question. What if we could capture
                        the top trends consuming the media landscape and forever memorialize them on
                        the blockchain as a unique collectible?
                      </p>
                      <p>
                        Introducing the Zeitgeist.ai, The world&apos;s first entirely AI-driven NFT
                        art collection.
                      </p>

                      <p>
                        From July 23rd, 2022 to February 27th, 2023, we generated 222 collectibles,
                        each representing the top news headline of its respective date, as
                        interpreted by AI, and forever memorialized on the Ethereum blockchain.
                      </p>

                      <p>
                        The Zeitgeist functioned through a custom application that scraped the
                        internet for the most prominent news trends of the day. It utilized GPT-3,
                        the largest neural network ever produced, powered by over 175 billion
                        machine learning parameters. The AI then took the trend and crafted a
                        text-based story, which was sent to another AI, that translated the story
                        into an image that was automatically minted on the Ethereum blockchain.
                      </p>

                      <p>
                        The Zeitgeist finishes with a total of 222 pieces, a number that represents
                        balance, harmony, and manifestation. According to numerologists, the number
                        222 is a sign that you are on the right path in life and that your thoughts
                        and intentions are aligning with your true purpose.
                      </p>

                      <p>
                        This is a number that is close to the heart of The Zeitgeist creators: two
                        forward-obsessed creative technologists and their AI friends.
                      </p>
                      <p>
                        Thank you to everyone who supported the project. You are not only a part of
                        The Zeitgeist, but a part of the history of humanity.
                      </p>
                    </div>
                  </div>

                  <Button className="mt-12" onClick={() => setHowItWorks(false)}>
                    <>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 1984 2303"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 fill-zinc-900"
                      >
                        <path d="M160.341 0H640.113L160.341 863.589V0Z" />
                        <path d="M1823.55 2302.9H1343.78L1823.55 1439.31V2302.9Z" />
                        <path d="M1279.81 0H1983.47L704.082 2302.9H0.416748L1279.81 0Z" />
                      </svg>
                      Back to collection
                    </>
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
