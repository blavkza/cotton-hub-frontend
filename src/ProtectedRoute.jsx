import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state?.auth.user);
  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/login"  replace />;
    }
    return children;
  }
};

export default ProtectedRoute;