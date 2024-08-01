import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const productCategories = [
  "Men's Clothing",
  "Women's Clothing",
  "Jewelery",
  "Electronics",
];
// eslint-disable-next-line react/prop-types
const SideBar = ({ setSideBarVisible: { closeSideBar, sideBarRef } }) => {
  const userDetails = useSelector((state) => state.signinDetails.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <section
      name="sidebar"
      className={`w-full h-screen fixed top-0 left-0 bg-amazon_blue bg-opacity-90 z-[9999]`}
    >
      <motion.div
        ref={sideBarRef}
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[80%] md:w-[365px] h-full bg-white border border-black"
      >
        <section className=" bg-amazon_light text-white h-[50px] flex items-center relative cursor-pointer hover:opacity-90">
          <div
            className="flex items-center w-full"
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                `${
                  userDetails?.name
                    ? (closeSideBar(), "/youraccount")
                    : "/signin"
                }`
              );
            }}
          >
            <span className="ml-9 mr-2 leading-3">
              <AccountCircleIcon style={{ fontSize: "32px" }} />
            </span>
            <p className=" text-lg font-bold flex-1">
              Hello, {userDetails?.name || "Sign In"}
            </p>
          </div>
          <span
            className="absolute text-white  -right-2 "
            onClick={closeSideBar}
            style={{ transform: "translateX(100%)" }}
          >
            <CloseRoundedIcon
              style={{
                fontSize: "32px",
              }}
            />
          </span>
        </section>

        <section className="h-full w-full ">
          <ul className=" overflow-y-scroll overscroll-contain h-full w-full pt-[10px] pb-[100px]">
            <li>
              <h3 className="text-[18px] font-titleFont font-bold pt-3 pr-5 pb-1 pl-9">
                Trending
              </h3>
            </li>
            <NavLink to="/filtered_products" onClick={closeSideBar}>
              <li className="sideBarItems">
                <p className="">Best Sellers</p>
                <span>
                  <ArrowForwardIosIcon style={{ fontSize: "18px" }} />
                </span>
              </li>
              <li className="sideBarItems">
                <p>New Releases</p>
              </li>
              <li>
                <p className="sideBarItems">Movers and Shakers</p>
              </li>
            </NavLink>
            {/* ======== Line Break ======== */}
            <li>
              <hr style={{ color: "#d5dbdb", margin: "5px 0px" }} />
            </li>
            {/* ======== New Section ======== */}
            <li>
              <h3 className="font-titleFont text-[18px] text-amazonBlue font-semibold pt-3 pr-5 pb-1 pl-9">
                Digital Content And Devices
              </h3>
            </li>
            <NavLink
              target="_blank"
              to="https://www.amazon.in/gp/browse.html?node=14172468031&ref_=nav_em__shopall_meetalexa_0_2_2_11"
            >
              <li className="sideBarItems">
                <p className="">Echo & Alexa</p>
                <span>
                  <ArrowForwardIosIcon style={{ fontSize: "18px" }} />
                </span>
              </li>
            </NavLink>
            <NavLink
              target="_blank"
              to="https://www.amazon.in/gp/browse.html?node=12805339031&ref_=nav_em__shopall_catpage_0_2_3_8"
            >
              <li className="sideBarItems">
                <p className="">Fire TV</p>
                <span>
                  <ArrowForwardIosIcon style={{ fontSize: "18px" }} />
                </span>
              </li>
            </NavLink>
            <NavLink
              target="_blank"
              to="https://www.amazon.in/gp/browse.html?node=9840097031&ref_=nav_em_sbc_k_allk_0_2_4_8"
            >
              <li className="sideBarItems">
                <p className="">Kindle E-Readers & eBooks</p>
                <span>
                  <ArrowForwardIosIcon style={{ fontSize: "18px" }} />
                </span>
              </li>
            </NavLink>
            <NavLink
              target="_blank"
              to="https://www.amazon.in/gp/browse.html?node=17941593031&ref_=nav_em_adbl_nav_sl_link2_0_2_5_3"
            >
              <li className="sideBarItems">
                <p className="">Audible AudioBooks</p>
                <span>
                  <ArrowForwardIosIcon style={{ fontSize: "18px" }} />
                </span>
              </li>
            </NavLink>
            <NavLink
              target="_blank"
              to="https://www.primevideo.com/offers/nonprimehomepage/ref=atv_sso_std"
            >
              <li className="sideBarItems">
                <p className="">Amazon Prime Video</p>
                <span>
                  <ArrowForwardIosIcon style={{ fontSize: "18px" }} />
                </span>
              </li>
            </NavLink>
            <NavLink
              target="_blank"
              to="https://www.amazon.in/music/prime?ref_=nav_em_dmm_in_nav_pc_apm_mlp_0_2_7_2"
            >
              <li className="sideBarItems">
                <p className="">Amazon Prime Music</p>
                <span>
                  <ArrowForwardIosIcon style={{ fontSize: "18px" }} />
                </span>
              </li>
            </NavLink>
            {/* ======== Line Break ======== */}
            <li>
              <hr style={{ color: "#d5dbdb", margin: "5px 0px" }} />
            </li>
            {/* ======== New Section ======== */}
            <li>
              <h3 className="font-titleFont text-[18px] text-amazonBlue font-semibold pt-3 pr-5 pb-1 pl-9">
                Shop By Category
              </h3>
            </li>
            <li
              onClick={(e) => {
                e.stopPropagation();
                closeSideBar();
              }}
            >
              <ul>
                {productCategories.map((category) => {
                  return (
                    <li key={category}>
                      <Link
                        to={`filtered_products?category=${category.toLowerCase()}`}
                        className="sideBarItems"
                      >
                        <p className="">{category}</p>
                        <span>
                          <ArrowForwardIosIcon style={{ fontSize: "18px" }} />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            {/* ======== Line Break ======== */}
            <li>
              <hr style={{ color: "#d5dbdb", margin: "5px 0px" }} />
            </li>
            {/* ======== New Section ======== */}
            <li>
              <h3 className="font-titleFont text-[18px] text-amazonBlue font-semibold pt-3 pr-5 pb-1 pl-9">
                Program & Features
              </h3>
            </li>
            <NavLink
              target="_blank"
              to="https://www.amazon.in/gp/browse.html?node=3704982031&ref_=nav_em_sbc_gc_all_0_2_19_2"
            >
              <li className="sideBarItems">
                <p className="">Gift Cards & Mobile Recharges</p>
                <span>
                  <ArrowForwardIosIcon style={{ fontSize: "18px" }} />
                </span>
              </li>
            </NavLink>
            <NavLink
              target="_blank"
              to="https://www.amazon.in/gp/browse.html?node=10894223031&ref_=nav_em_topnav_storetab_lpdin_0_1_1_27"
            >
              <li className="sideBarItems">
                <p>Amazon Launchpad</p>
              </li>
            </NavLink>
            <NavLink
              target="_blank"
              to="https://www.amazon.in/b?node=14284467031&ref_=nav_em_sbc_desktop_outlet_0_1_1_29"
            >
              <li className="sideBarItems">
                <p>Clearance store</p>
              </li>
            </NavLink>
            {/* ======== Line Break ======== */}
            <li>
              <hr style={{ color: "#d5dbdb", margin: "5px 0px" }} />
            </li>
            {/* ======== New Section ======== */}
            <li>
              <h3 className="font-titleFont text-[18px] text-amazonBlue font-semibold pt-3 pr-5 pb-1 pl-9">
                Help & Settings
              </h3>
            </li>
            <NavLink to="/youraccount">
              <li className="sideBarItems">
                <p>Your Account</p>
              </li>
            </NavLink>

            {userDetails?.name ? (
              <li className="sideBarItems">
                <p onClick={() => dispatch({ type: "reset_store" })}>
                  Sign Out
                </p>
              </li>
            ) : (
              <NavLink to="/signin">
                <li className="sideBarItems">
                  <p>Sign In</p>
                </li>
              </NavLink>
            )}
          </ul>
        </section>
      </motion.div>
    </section>
  );
};

export default SideBar;
