import { createHashRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import { Paths } from "../common/constants";
import {
  createAuthenticatedLayoutRoute,
  createPrivatePage,
  createRoute,
} from "./routeFactory.tsx";

// Lazy load components
const Login = lazy(() => import("../pages/login"));
const InspectApplications = lazy(() => import("../pages/inspec-applications"));
const ReassignApplications = lazy(() => import("../pages/re-assign-applications"));
const ApplicationDetails = lazy(
  () => import("../pages/application-details/index.tsx")
);
// const SendMail = lazy(() => import("../pages/send-mail"));
const ProcessedApplicationSide = lazy(
  () => import("../pages/processed-application-side")
);
const ProcessedOriginalSide = lazy(
  () => import("../pages/processed-original-side")
);
const ProcessedCompSide = lazy(() => import("../pages/processed-comp-side"));
const RejectedApplication = lazy(
  () => import("../pages/rejected-application")
);

const router = createHashRouter([
  {
    path: Paths.LOGIN,
    element: createRoute({
      component: <Login />,
      type: "public"
    }),
  },
  {
    // Persistent authenticated shell: PrivateRoute → AuthenticatedLayout → Outlet
    element: createAuthenticatedLayoutRoute(),
    children: [
      {
        path: Paths.INSPECT_APPLICATIONS,
        element: createPrivatePage(<InspectApplications />),
      },
      {
        path: Paths.REASSIGN_APPLICATIONS,
        element: createPrivatePage(<ReassignApplications />),
      },
      {
        path: Paths.APPLICATION_DETAILS,
        element: createPrivatePage(<ApplicationDetails />),
      },
      // {
      //   path: Paths.SEND_MAIL,
      //   element: createPrivatePage(<SendMail />),
      // },
      {
        path: Paths.PROCESSED_APPLICATION_SIDE,
        element: createPrivatePage(<ProcessedApplicationSide />),
      },
      {
        path: Paths.PROCESSED_ORIGINAL_SIDE,
        element: createPrivatePage(<ProcessedOriginalSide />),
      },
      {
        path: Paths.PROCESSED_COMP_SIDE,
        element: createPrivatePage(<ProcessedCompSide />),
      },
      {
        path: Paths.REJECTED_APPLICATION,
        element: createPrivatePage(<RejectedApplication />),
      },
    ],
  },
]);

const RoutesManager = () => {
  return <RouterProvider router={router} />;
};

export default RoutesManager;