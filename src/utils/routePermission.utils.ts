import {Paths} from "../common/constants";

export const ROUTE_TO_MODULE_MAP: Record<string, string> = {
    [Paths.INSPECT_APPLICATIONS]: "inspect_applications",
    [Paths.REASSIGN_APPLICATIONS]: "reassign_applications",
    [Paths.APPLICATION_DETAILS]: "reassign_applications",
    [Paths.SEND_MAIL]: "send_mail",
};

export const getRequiredModuleForRoute = (pathname: string):string | null => {
    const cleanPath = pathname.replace(/\/$/, "");

    if(ROUTE_TO_MODULE_MAP[cleanPath]){
        return ROUTE_TO_MODULE_MAP[cleanPath];
    }
    const sortedRoutes = Object.entries(ROUTE_TO_MODULE_MAP).sort((a, b) => b[0].length - a[0].length);

    for(const [route, module] of sortedRoutes){
        if(cleanPath.startsWith(route) && (cleanPath.length === route.length || cleanPath[route.length] === "/")){
            return module;
        }
    }
    return null;
};

export const MODULE_TO_ROUTE_MAP: Record<string, string> = {
    inspect_applications: Paths.INSPECT_APPLICATIONS,
    reassign_applications: Paths.REASSIGN_APPLICATIONS,
    send_mail: Paths.SEND_MAIL,
};

export const getRouteForModule = (moduleKey: string):string | null => {
    return MODULE_TO_ROUTE_MAP[moduleKey] || null;
};