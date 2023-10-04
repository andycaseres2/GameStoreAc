import { FacebookIcon } from "../assets/icons/FacebookIcon";
import { InstagramIcon } from "../assets/icons/InstagramIcon";
import Logo from "../assets/images/logo.webp";
import { TwitterIcon } from "../assets/icons/TwitterIcon";

export const Footer = () => {
  return (
    <footer>
      <div className="pt-6 pb-10 bg-customDarkBg1 radius-for-skewed ">
        <div className="container mx-auto px-4 w-4/5 md:w-11/12 lg:w-10/12 xl:w-4/5 2xl:w-2/3">
          <div className="w-full flex">
            <div className="w-full flex justify-center items-center">
              <div className="w-full flex items-center justify-between">
                <div className="w-full flex justify-center lg:justify-start items-center">
                  <div className="text-white mr-2 text-6xl">
                    <img className="w-8" src={Logo} alt="GameStoreAc Logo" />
                  </div>
                  <div className="text-white font-['Inter'] font-bold text-xl">
                    GameStoreAc
                  </div>
                </div>
                <p className="w-full justify-between text-gray-400 leading-loose text-center lg:text-left mx-auto lg:mx-0">
                  informacion aqui
                  <a
                    href="https://bootstrapious.com/p/bootstrap-4-dark-admin"
                    target="_blank"
                    className="text-gray-100 ml-1.5 "
                    aria-label="DarkAdmin"
                  >
                    here.
                  </a>
                </p>
              </div>
              <div className="w-1/2 justify-end flex gap-4 mx-auto lg:mx-0">
                <a
                  className="inline-block w-10  h-10 mr-2 p-2 bg-customDarkBg2 custom-border-gray  hover:bg-gray-700 rounded-xl"
                  href="#"
                >
                  <FacebookIcon />
                </a>
                <a
                  className="inline-block w-10  h-10 mr-2 p-2 bg-customDarkBg2 custom-border-gray  hover:bg-gray-700 rounded-xl"
                  href="#"
                >
                  <TwitterIcon />
                </a>
                <a
                  className="inline-block w-10  h-10 mr-2 p-2 bg-customDarkBg2 custom-border-gray  hover:bg-gray-700 rounded-xl"
                  href="#"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
            {/* <div className="w-full lg:w-2/3  lg:pl-16 hidden lg:flex flex-wrap justify-between">
              <div className="w-full md:w-1/3 lg:w-auto mb-16 md:mb-0">
                <h3 className="mb-6 text-2xl font-bold text-white">Products</h3>
                <ul>
                  {footerData[0].items.map((item, i) => (
                    <li key={i} className="mb-4">
                      <a
                        className="text-gray-400 hover:text-gray-300"
                        href="#"
                        aria-label=""
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/3 lg:w-auto mb-16 md:mb-0">
                <h3 className="mb-6 text-2xl font-bold text-white">
                  Important Links
                </h3>
                <ul>
                  {footerData[1].items.map((item, i) => (
                    <li key={i} className="mb-4">
                      <a
                        className="text-gray-400 hover:text-gray-300"
                        href="#"
                        aria-label=""
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/3 lg:w-auto">
                <h3 className="mb-6 text-2xl font-bold text-white">Company</h3>
                <ul>
                  {footerData[2].items.map((item, i) => (
                    <li key={i} className="mb-4">
                      <a
                        className="text-gray-400 hover:text-gray-300"
                        href="#"
                        aria-label=""
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}
          </div>
          <p className="w-full lg:text-center text-sm text-gray-400 border-t border-[rgb(255,255,255,0.2)]  mt-4 pt-4 hidden lg:block">
            &copy; 2023. Andy Caseres.
          </p>
        </div>
      </div>
    </footer>
  );
};
