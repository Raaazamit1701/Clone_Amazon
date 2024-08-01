// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { errorSign } from "../../assets/images";
// eslint-disable-next-line react/prop-types
const Error = ({ email, errorMessage }) => {
  const error = errorMessage;
  return (
    <section className="flex gap-3 w-full mb-4 pl-5 py-4 pr-1 border border-error rounded-lg shadow-errorShadow">
      <div>
        <img className="w-8" src={errorSign} alt="error-sign" />
      </div>
      <div className="w-[280px]">
        <h3 className="text-lg font-medium text-error">There was a problem</h3>
        <p className="text-[13px] font-medium text-[#222]">
          {(error.includes("wrong-password") && "Your password is incorrect") ||
            (error.includes("user-not-found") &&
              `We cannot find an account with that email address`) ||
            (error.includes("email-already-in-use") &&
              `Your provided Email ${email} has already been used. Please use another Email address.`) ||
            (error.includes("too-many-requests") &&
              "Too many requests. Please try logging in again after some time.") ||
            (error.includes("invalid-email") &&
              "Please enter a valid email address")}
        </p>
      </div>
    </section>
  );
};

export default Error;
