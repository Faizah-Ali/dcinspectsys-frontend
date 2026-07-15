import { createHashRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import { Paths } from "../common/constants";
import { createRoute } from "./routeFactory.tsx";

// Lazy load components
const Login = lazy(() => import("../pages/login"));
const InspectApplications = lazy(() => import("../pages/inspec-applications"));
const ReassignApplications = lazy(() => import("../pages/re-assign-applications"));
const ApplicationDetails = lazy(
  () => import("../pages/application-details/index.tsx")
);
const SendMail = lazy(() => import("../pages/send-mail"));
const ProcessedApplicationSide = lazy(
  () => import("../pages/processed-application-side")
);
const ProcessedOriginalSide = lazy(
  () => import("../pages/processed-original-side")
);
const ProcessedCopySide = lazy(
  () => import("../pages/processed-copy-side")
);
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
    path: Paths.INSPECT_APPLICATIONS,
    element: createRoute({
      component: <InspectApplications />,
      type: "private"
    }),
  },
  {
    path: Paths.REASSIGN_APPLICATIONS,
    element: createRoute({
      component: <ReassignApplications />,
      type: "private"
    }),
  },
  {
    path: Paths.APPLICATION_DETAILS,
    element: createRoute({
      component: <ApplicationDetails />,
      type: "private"
    }),
  },
  {
    path: Paths.SEND_MAIL,
    element: createRoute({
      component: <SendMail />,
      type: "private"
    }),
  },
  {
    path: Paths.PROCESSED_APPLICATION_SIDE,
    element: createRoute({
      component: <ProcessedApplicationSide />,
      type: "private"
    }),
  },
  {
    path: Paths.PROCESSED_ORIGINAL_SIDE,
    element: createRoute({
      component: <ProcessedOriginalSide />,
      type: "private"
    }),
  },
  {
    path: Paths.PROCESSED_COPY_SIDE,
    element: createRoute({
      component: <ProcessedCopySide />,
      type: "private"
    }),
  },
  {
    path: Paths.REJECTED_APPLICATION,
    element: createRoute({
      component: <RejectedApplication />,
      type: "private"
    }),
  },
]);

const RoutesManager = () => {
  return <RouterProvider router={router} />;
};

export default RoutesManager;