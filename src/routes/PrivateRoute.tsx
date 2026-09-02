import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Paths } from "../common/constants";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import {
    getUsername,
    getFullName,
    getLoginTime,
    isSessionValid,
    logout,
} from "../utils/authSession.utils";
import { useAppSelector } from "../hooks/useAppSelector";

interface PrivateRouteProps {
    children: React.JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isAuthenticated, fullName: reduxFullName } = useAppSelector(
        (state) => state.auth
    );
    const location = useLocation();

    const isValidSession = isSessionValid();
    const displayName =
        reduxFullName || getFullName() || getUsername() || "User";
    const loginTime = getLoginTime();

    // Scroll to top on route (pathname) change only.
    // Depending on the full `location` object would also fire for search-param
    // updates (e.g. ?page=2 from pagination, ?search=... from the table search),
    // which would yank the user back to the top on every pagination click.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Session expiry check (optimized)
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isSessionValid()) {
                logout("Session expired. Please login again.");
            }
        }, 10000); 

        return () => clearInterval(interval);
    }, []);

    // 🔐 FINAL AUTH CHECK
    if (!isAuthenticated || !isValidSession) {
        return <Navigate to={Paths.LOGIN} replace />;
    }

    return (
        <AuthenticatedLayout
            userInfo={{
                name: displayName,
                loginTime: loginTime,
            }}
            activeRoute={location.pathname}
            onItemClick={() => {}}
        >
            {children}
        </AuthenticatedLayout>
    );
};

export default PrivateRoute;