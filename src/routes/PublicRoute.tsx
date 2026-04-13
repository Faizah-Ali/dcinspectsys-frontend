import React from "react";
import { Navigate } from "react-router-dom";
import { Paths } from "../common/constants";
import Header from "../components/header/index.tsx";
import { getLoginState, isSessionValid } from "../utils/authSession.utils";
import { useAppSelector } from "../hooks/useAppSelector";

interface PublicRouteProps {
    children: React.JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { username } = useAppSelector((state) => state.auth);

  const isLoggedIn = !!username && isSessionValid();

//   if (isLoggedIn) {
//     return <Navigate to={Paths.INSPECT_APPLICATIONS} />;
//   }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PublicRoute;