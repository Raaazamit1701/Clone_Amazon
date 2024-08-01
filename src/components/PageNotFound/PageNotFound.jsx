import { logoDark } from "../../assets/images";
import { NavLink } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="px-4 grid place-content-center">
      <div className="mx-auto">
        <NavLink to="/">
          <img className="w-32 py-2" src={logoDark} alt="website-logo" />
        </NavLink>
      </div>
      <h2 className="font-bold text-xl text-orange-600">
        Looking for something?
      </h2>
      <p>
        We&apos;re sorry. The Web address you entered is not a functioning page
        on our site.
      </p>
      <p className="font-bold text-lg">
        {" "}
        Go to Amazon.in&apos;s{" "}
        <NavLink to="/">
          <span className="navigateButtonLinks font-bold text-lg underline">
            Home
          </span>
        </NavLink>{" "}
        Page
      </p>
    </div>
  );
};

export default PageNotFound;
