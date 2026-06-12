import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Paths } from "../common/constants";
import { getRequiredModuleForRoute } from "../utils/routePermission.utils.ts";
import { useAuthState } from "../hooks/useAuthState.ts";
import PermissionRoute from "./PermissionRoute.tsx";
import PrivateRoute from "./PrivateRoute.tsx";

interface VerifyRouteProps {
    children: React.JSX.Element;
}

const VerifyRoute = ({ children }: VerifyRouteProps) => {
    const location = useLocation();
    const { hasAuthData } = useAuthState();

    // Only scroll to top when the route (pathname) actually changes.
    // `location` would also change for search-param updates (pagination, search,
    // filters), which previously caused the page to jump to the top on every
    // pagination click.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (!hasAuthData) {
        return <Navigate to={Paths.LOGIN} replace />;
    }

    const requiredModule = getRequiredModuleForRoute(location.pathname);
    
    if (requiredModule) {
        return <PermissionRoute requiredModule={requiredModule}>{children}</PermissionRoute>;
    }

    // If no module required, use private route
    return <PrivateRoute>{children}</PrivateRoute>;
};

export default VerifyRoute;
