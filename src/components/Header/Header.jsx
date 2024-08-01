import { logo } from "../../assets/images";
import { ArrowDropDownOutlined } from "@mui/icons-material";

import SearchBar from "./SearchBar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useState } from "react";
import { productCategories } from "../../constants/productCategories";
import HeaderBottom from "./HeaderBottom";
import useClickOutside from "../custom-hooks/useClickOutside";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DeliveryAddress from "./DeliveryAddress";
import SideBar from "./SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const userDetails = useSelector((state) => state.signinDetails.userDetails);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const dispatch = useDispatch();

  const cartProductCount = useSelector(
    (state) => state.cartDetails.productsCount
  );

  //custom hook for maintain open-close component feature
  const [sideBar, setSideBar, sideBarRef] = useClickOutside(false);

  const openSideBar = (e) => {
    e.stopPropagation();
    setSideBar(true);
  };

  const closeSideBar = () => {
    setSideBar(false);
  };
  //custom hook for manage the visibility of the product categories
  const [isCategoryVisible, setCategoryVisible, categoryRef] =
    useClickOutside(false);

  const openCategory = (e) => {
    e.stopPropagation();
    setCategoryVisible(!isCategoryVisible);
  };

  return (
    <>
      <section
        name="header-top"
        className="sticky top-0 left-0 right-0  z-[199]"
      >
        <div
          name="header-top"
          className="flex items-center justify-between h-[60px] gap-0 lgl:gap-2 bg-amazon_blue text-white px-3 py-[5px] "
        >
          {/* ======================= Left Section ======================= */}
          <section
            name="header-left"
            className="flex items-center gap-0 lgl:gap-2"
          >
            {/* ======================= SideBar Section ======================= */}
            <section
              name="sidebar"
              className="headerHover p-0 mdl:hidden"
              onClick={openSideBar}
            >
              <MenuIcon style={{ lineHeight: "12px" }} />
            </section>

            {/* ======================= Logo Section ======================= */}
            <section name="logo" className="headerHover">
              <NavLink to="/">
                <div>
                  <img
                    className="w-16 mt-2 mdl:w-24"
                    src={logo}
                    alt="amazon-logo"
                  />
                </div>
              </NavLink>
            </section>

            {/* ======================= Delivery Address ======================= */}
            <section name="delivery-address" className="hidden mdl:block">
              <DeliveryAddress />
            </section>
          </section>

          {/* ======================= Search Bar ======================= */}
          <section
            name="searchbar"
            className="h-10 rounded-md hidden flex-grow relative items-center mdl:flex"
          >
            <div
              name="product-category"
              onClick={openCategory}
              className="flex h-full min-w-fit px-3 items-center justify-center bg-gray-100 hover:bg-gray-300 
                    cursor-pointer text-lightGray rounded rounded-e-none  border-r  border-lightText"
            >
              <span className="text-xs">{selectedCategory}</span>
              <span>
                <ArrowDropDownOutlined
                  style={{ fontSize: "20px", marginBottom: "4px" }}
                />
              </span>

              {isCategoryVisible && (
                <div ref={categoryRef}>
                  <ul
                    className=" absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden 
                bg-white border-[1px] border-amazon_blue text-black flex-col gap-1 z-[99]"
                  >
                    {productCategories.map((category, index) => (
                      <li
                        key={index}
                        onClick={() => setSelectedCategory(category)}
                        className=" hover:bg-hover_blue hover:text-white font-medium  text-sm"
                      >
                        <p className="px-2">{category}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <SearchBar />
          </section>

          {/* ======================= Account & Login ======================= */}
          <section
            name="header-right"
            className="flex items-center gap-0 lgl:gap-2"
          >
            <section name="account">
              <NavLink to="/youraccount">
                <div className="hidden headerHover lg:flex">
                  <div>
                    <p className=" text-xs leading-3">
                      Hello, {userDetails?.name?.split(" ")[0] || "Sign in"}
                    </p>
                    <p className=" text-sm font-bold">Account & Lists</p>
                  </div>

                  <div className="leading-3">
                    <ArrowDropDownOutlined
                      style={{ fontSize: "18px", marginTop: "14px" }}
                    />
                  </div>
                </div>
                <div className="headerHover lg:hidden">
                  <p className=" text-xs leading-3">
                    {userDetails?.name?.split(" ")[0] || "Sign in"}
                  </p>
                  <NavigateNextIcon
                    viewBox="0 0 20 20"
                    style={{
                      fontSize: "14px",
                    }}
                  />

                  <PersonOutlineIcon style={{ fontSize: "32px" }} />
                </div>
              </NavLink>
            </section>

            {/* ======================= Orders ======================= */}

            <section
              name="orders"
              className="headerHover hidden lg:inline-block"
            >
              <NavLink to="/youraccount/orders">
                <div>
                  <p className=" text-xs leading-3">Returns</p>
                  <p className=" text-sm font-bold">& Orders</p>
                </div>
              </NavLink>
            </section>

            {/* ======================= Cart ======================= */}
            <section name="cart">
              <NavLink to="/cart">
                <div className=" flex items-center justify-center relative headerHover">
                  <span>
                    <ShoppingCartOutlinedIcon
                      style={{ fontSize: "1.625rem" }}
                    />
                  </span>
                  <p className="text-xs font-medium mt-3">Cart</p>
                  <span
                    className="absolute flex text-[11px] font-medium align-center justify-center top-2 left-6 w-4 h-4 
                          bg-[#f3a847] rounded-full"
                  >
                    {cartProductCount}
                  </span>
                </div>
              </NavLink>
            </section>

            {/* ======================= Sign Out ======================= */}
            {userDetails?.name && (
              <section
                name="sign-out"
                className="headerHover"
                onClick={() => dispatch({ type: "reset_store" })}
              >
                <LogoutIcon style={{ fontSize: "28px" }} />
              </section>
            )}
          </section>
        </div>

        <div className="bg-amazon_blue px-4 pb-2  mdl:hidden">
          <div className="rounded-lg overflow-hidden">
            <SearchBar />
          </div>
        </div>
      </section>

      <HeaderBottom openSideBar={openSideBar} />
      {sideBar && (
        <SideBar setSideBarVisible={{ sideBar, closeSideBar, sideBarRef }} />
      )}
    </>
  );
};

export default Header;
