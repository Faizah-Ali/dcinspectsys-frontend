import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { LOGGED_IN_KEY } from "../common/constants/storageKeys.ts";
import { Paths } from "../common/constants";
import { useAppSelector } from "../hooks/useAppSelector.ts";
import type { RootState } from "../redux/store.ts";
import Header from "../components/header/index.tsx";
import Sidebar from "../components/sidebar/index.tsx";
import {
    getUsername,
    getFullName,
    getLoginTime,
    isSessionValid,
} from "../utils/authSession.utils.ts";

interface PermissionRouteProps {
    children: React.JSX.Element;
    requiredModule?: string;
}

const PermissionRoute = ({ children, requiredModule }: PermissionRouteProps) => {
    const isLoggedIn = localStorage.getItem(LOGGED_IN_KEY) === "true";
    const isValidSession = isSessionValid();
    const location = useLocation();
    const {
        permissions,
        isAuthenticated,
        username: reduxUsername,
        fullName: reduxFullName,
    } = useAppSelector((state: RootState) => state.auth);
    const displayName =
        reduxFullName ||
        getFullName() ||
        getUsername() ||
        reduxUsername ||
        "User";
    const loginTime = getLoginTime();

    // Only scroll to top when the route (pathname) actually changes.
    // `location` would also change for search-param updates (pagination, search,
    // filters), which previously caused the page to jump to the top on every
    // pagination click.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (!isLoggedIn || !isAuthenticated || !isValidSession) {
        return <Navigate to={Paths.LOGIN} replace />;
    }

    // For now, if no required module, just show the page
    // You can add permission checking logic here later
    if (requiredModule && permissions.length > 0) {
        // Check if user has permission for the required module
        const hasPermission = permissions.includes(requiredModule);
        if (!hasPermission) {
            // Redirect to first available route
            return <Navigate to={Paths.INSPECT_APPLICATIONS} replace />;
        }
    }

    return (
        <>
            <Header />
            <Sidebar
                userInfo={{ name: displayName, loginTime: loginTime }}
                activeRoute={location.pathname}
                onItemClick={(item) => console.log("Clicked:", item)}
            />
            {children}
        </>
    );
};

export default PermissionRoute;
