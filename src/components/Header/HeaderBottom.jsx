/* eslint-disable react/prop-types */

import MenuIcon from "@mui/icons-material/Menu";
import DeliveryAddress from "./DeliveryAddress";
import { Link } from "react-router-dom";
const productCategories = [
  "mens-shirts",
  "home-decoration",
  "beauty",
  "Electronics",
  "mobile-accessories",
  "laptops",
  "home-decoration",
];

const HeaderBottom = ({ openSideBar }) => {
  return (
    <section
      name="header-bottom"
      className=" bg-amazon_light flex  items-center text-white text-sm font-medium leading-4"
    >
      {/* this onClick creates the event propagation in upper div so that we have to stop that*/}
      <div className="items-center hidden mdl:flex">
        <div className="headerHover ml-3 py-2 gap-1" onClick={openSideBar}>
          <span>
            <MenuIcon style={{ lineHeight: "12px" }} />
          </span>
          <span className="">All</span>
        </div>

        <ul className=" h-full flex-grow hidden mdl:flex">
          {productCategories.map((category) => {
            return (
              <li key={category.toLowerCase()}>
                <Link
                  className="headerHover"
                  to={`filtered_products?category=${category.toLowerCase()}`}
                >
                  {category}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex pl-1  mdl:hidden">
        <DeliveryAddress />
      </div>
    </section>
  );
};

export default HeaderBottom;
