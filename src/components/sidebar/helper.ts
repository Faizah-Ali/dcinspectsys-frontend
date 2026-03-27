import { Paths } from "../../common/constants/path";

// Format user name helper
export const formatUserName = (name: string): string => {
  return name || "User";
};

// Sidebar items list
export const sidebarItems = [
  {
    text: "Received Applications",
    route: Paths.INSPECT_APPLICATIONS,
  },
  {
    text: "Re-Assign Applications",
    route: Paths.REASSIGN_APPLICATIONS,
  },
  {
    text: "Send Mail",
    route: Paths.SEND_MAIL,
  },
];