import { logoDark } from "../../assets/images";
import SignInBottom from "./SignInBottom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { getAuth } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { userSignin } from "../../redux/signin/signinAction";

import Error from "./Error";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";

// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const SignIn = () => {
  const emailRef = useRef({});
  const passwordRef = useRef({});

  const location = useLocation();

  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  const signinDetails = useSelector((state) => state.signinDetails);

  const [userDetailsErrors, setUserDetailsErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const handleFormSubmit = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const errors = {
      emailError: email ? "" : "Enter your email",
      passwordError: password ? "" : "Enter your password",
    };

    if (errors.emailError || errors.passwordError) {
      setUserDetailsErrors({ ...errors });
      return;
    } else {
      setUserDetailsErrors({ ...errors });
    }

    dispatch(userSignin(auth, navigate, location, { email, password }));
  };

  return (
    <div className="h-screen">
      <section className="w-[350px] mx-auto flex flex-col items-center">
        <NavLink to="/">
          <div>
            <img className="w-32 py-2" src={logoDark} alt="website-logo" />
          </div>
        </NavLink>

        {signinDetails.loading ? (
          <div className="mb-4">
            <RotatingLines
              strokeColor="#febd69"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              visible={true}
            />
          </div>
        ) : signinDetails.loggedIn === "Failed" &&
          emailRef?.current?.value &&
          passwordRef?.current?.value ? (
          <Error
            email={emailRef.current.value}
            errorMessage={signinDetails.error}
          />
        ) : signinDetails.loggedIn === "Success" ? (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed bottom-4 right-4 p-4 bg-green-500 rounded shadow-lg`}
          >
            SingIn successful!
          </motion.div>
        ) : (
          ""
        )}
        <section className="border border-amazonBorder rounded-lg px-6 py-4">
          <form
            noValidate
            action=""
            className="grid gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-[28px] font-medium">Sign in</h2>
            <div>
              <label htmlFor="email" className="text-sm leading-4 font-medium">
                Email or mobile phone number
              </label>
              <input
                className="inputBox"
                type="email"
                name="email"
                id="email"
                ref={emailRef}
                autoComplete="email"
              />
              {userDetailsErrors.emailError && (
                <p className="flex gap-2 items-center text-xs text-error">
                  <span className="errorSign">!</span>
                  {userDetailsErrors.emailError}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm leading-4 font-medium"
              >
                Password
              </label>
              <input
                className="inputBox"
                type="password"
                name="password"
                id="password"
                ref={passwordRef}
                autoComplete="current-password"
              />
              {userDetailsErrors.passwordError && (
                <p className="flex gap-2 items-center text-xs text-error">
                  <span className="errorSign">!</span>
                  {userDetailsErrors.passwordError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="amazonButton"
              onClick={handleFormSubmit}
            >
              Continue
            </button>
            <p className="text-xs text-black leading-4 mt-4">
              By Continuing, you agree to Amazon&apos;s{" "}
              <span>
                {" "}
                <a
                  href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940"
                  target="_blank"
                  rel="noreferrer"
                  className="defaultLink"
                >
                  Conditions of Use
                </a>{" "}
              </span>
              and{" "}
              <span className="">
                <a
                  href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380"
                  target="_blank"
                  rel="noreferrer"
                  className="defaultLink"
                >
                  Privacy Notice.
                </a>
              </span>
            </p>
            <div className="flex items-center text-gray-600 mt-4">
              <ArrowRightIcon style={{ fontSize: "20px" }} />
              <p className="text-sm defaultLink">Need help?</p>
            </div>
          </form>
        </section>
        <div className="w-full text-xs text-[#767676] font-medium mt-4 flex items-center">
          <span className="w-1/3 h-[1px]  bg-amazonBorder inline-flex"></span>
          <span className="w-1/3 text-center">New to Amazon?</span>
          <span className="w-1/3 h-[1px] bg-amazonBorder inline-flex"></span>
        </div>

        <div className="w-full py-4">
          <NavLink to="/register">
            <button className="w-full text-sm text-stone-700 p-1 bg-[#fff] border border-amazonBorder shadow-amazonButtonShadow rounded-lg hover:bg-zinc-100 transform active:scale-95 transition-all ease-in-out">
              Create your Amazon account
            </button>
          </NavLink>
        </div>
      </section>
      <SignInBottom />
    </div>
  );
};

export default SignIn;
