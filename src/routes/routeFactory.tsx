import React, { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import VerifyRoute from "./verifyRoute.tsx";
import PublicRoute from "./PublicRoute.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import PermissionRoute from "./PermissionRoute.tsx";

type RouteType = "public" | "private" | "permission" | "verify";

interface RouteFactoryProps {
    component: React.JSX.Element;
    type?: RouteType;
    withLoader?: boolean;
}

// Simple loader component
const RouterLoader = ({ children }: { children: React.JSX.Element }) => {
    return (
        <Suspense fallback={
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        }>
            {children}
        </Suspense>
    );
};

export const createRoute = ({
    component,
    type = "verify",
    withLoader = true,
}: RouteFactoryProps): React.JSX.Element => {
    const wrappedComponent = withLoader ? (
        <RouterLoader>{component}</RouterLoader>
    ) : (
        component
    );

    switch (type) {
        case "public":
            return <PublicRoute>{wrappedComponent}</PublicRoute>;
        case "private":
            return <PrivateRoute>{wrappedComponent}</PrivateRoute>;
        case "permission":
            return <PermissionRoute>{wrappedComponent}</PermissionRoute>;
        case "verify":
            return <VerifyRoute>{wrappedComponent}</VerifyRoute>;
        default:
            return wrappedComponent;
    }
};

/** Persistent authenticated shell (Header/Sidebar) with nested `<Outlet />`. */
export const createAuthenticatedLayoutRoute = (): React.JSX.Element => (
    <PrivateRoute />
);

/** Lazy page element for nested private routes (Suspense only; no layout remount). */
export const createPrivatePage = (
    component: React.JSX.Element
): React.JSX.Element => <RouterLoader>{component}</RouterLoader>;
