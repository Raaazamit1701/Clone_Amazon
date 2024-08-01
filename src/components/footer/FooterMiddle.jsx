import { logo, indiaFlag } from "../../assets/images";
import { Link } from "react-router-dom";

import footerTopItemsData from "../../constants/footerTopItemsData";

const FooterMiddle = () => {
  return (
    <section name="footer-middle" className="bg-amazon_light text-white">
      <div className="border-b-[1px] border-gray-500 py-10">
        <div className="max-w-5xl mx-auto text-gray-300">
          <div className="px-8 justify-center  grid md:grid-cols-2 lg:grid-cols-4 gap-8 place-content-center">
            {footerTopItemsData.map((element) => {
              return (
                <div key={element.section}>
                  <h3 className="text-white text-base font-bold mb-2">
                    {element.section}
                  </h3>
                  <ul className="flex flex-col gap-1">
                    {element.items.map((item) => {
                      return (
                        <li key={item.title} className="footerLink w-max">
                          <Link to={item.link} target="_blank">
                            {item.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex gap-6 items-center justify-center py-6">
        <div className="footerItemHover">
          <a href="#">
            <img className="w-14 pt-1" src={logo} alt="logo" />
          </a>
        </div>

        <div className="flex gap">
          <p className="footerItemHover">English</p>
        </div>
        <div className="footerItemHover">
          <img src={indiaFlag} alt="indian-flag-image" className="w-6" />
          <p>India</p>
        </div>
      </div>
    </section>
  );
};

export default FooterMiddle;
