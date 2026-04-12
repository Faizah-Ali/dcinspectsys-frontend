import React from "react";
import Header from "../components/header/index.tsx";

interface PublicRouteProps {
    children: React.JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PublicRoute;