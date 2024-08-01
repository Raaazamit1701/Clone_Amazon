import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RequireSignIn = ({ children }) => {
  const userDetails = useSelector((state) => state.signinDetails.userDetails);
  const location = useLocation();
  if (userDetails?.name) return children;
  return <Navigate to="/signin" state={{ originPath: location.pathname }} />;
};

export default RequireSignIn;
