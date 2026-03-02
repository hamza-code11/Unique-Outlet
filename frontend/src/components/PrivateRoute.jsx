import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const context = useContext(AuthContext);

  if (!context) return <div>Loading...</div>;

  const { user, loading } = context;

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;    