import React from "react";
import { Navigate } from "react-router-dom";
import { Paths } from "../common/constants";
import { LOGGED_IN_KEY } from "../common/constants/storageKeys.ts";
import Header from "../components/header/index.tsx";

interface PublicRouteProps {
    children: React.JSX.Element;
}

const PublicRoute = ({children}: PublicRouteProps) => {
    const isLoggedIn = localStorage.getItem(LOGGED_IN_KEY) === "true";
    if (isLoggedIn) {
        return <Navigate to={Paths.INSPECT_APPLICATIONS} />;
    }
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default PublicRoute;