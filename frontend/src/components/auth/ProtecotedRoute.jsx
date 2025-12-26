import { Navigate } from "react-router";
import isLoggedIn from "../../utils/auth";

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace/>
  }
  return children;
};

export default ProtectedRoute;
