import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { LOGGED_IN_KEY } from "../common/constants/storageKeys.ts";
import { Paths } from "../common/constants";
import Header from "../components/header/index.tsx";
import Sidebar from "../components/sidebar/index.tsx";
import { getUsername, getLoginTime } from "../utils/authSession.utils.ts";

interface PrivateRouteProps {
    children: React.JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isLoggedIn = localStorage.getItem(LOGGED_IN_KEY) === "true";
    const location = useLocation();
    const username = getUsername();
    const loginTime = getLoginTime();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    if (!isLoggedIn) {
        return <Navigate to={Paths.LOGIN} replace />;
    }

    return (
        <>
            <Header />
            <Sidebar 
                userInfo={{ name: username || "User", loginTime: loginTime }}
                activeRoute={location.pathname}
                onItemClick={(item) => console.log("Clicked:", item)}
            />
            {children}
        </>
    );
};

export default PrivateRoute;