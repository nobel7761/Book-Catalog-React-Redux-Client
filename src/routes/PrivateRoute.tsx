import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const { user } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();

  if (!user) {
    return <p>Loading...</p>;
  }

  if (!user.email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
