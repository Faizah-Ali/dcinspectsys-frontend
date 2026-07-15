import { Paths } from "../../common/constants/path";
import type { SidebarItem } from "./type";

// Format user name helper
export const formatUserName = (name: string): string => {
  return name || "User";
};

const adminSidebarItems: SidebarItem[] = [
  {
    text: "Admin Inbox",
    route: Paths.INSPECT_APPLICATIONS,
  },
  {
    text: "Re-Assign Application",
    route: Paths.REASSIGN_APPLICATIONS,
  },
  {
    text: "Send Email",
    route: Paths.SEND_MAIL,
  },
];

const officerSidebarItems: SidebarItem[] = [
  {
    text: "Pending Application",
    route: Paths.INSPECT_APPLICATIONS,
  },
  {
    text: "Processed (Application Side)",
    route: Paths.PROCESSED_APPLICATION_SIDE,
  },
  {
    text: "Processed (Original Side)",
    route: Paths.PROCESSED_ORIGINAL_SIDE,
  },
  {
    text: "Processed (Copy Side)",
    route: Paths.PROCESSED_COPY_SIDE,
  },
  {
    text: "Rejected Application",
    route: Paths.REJECTED_APPLICATION,
  },
];

const approverSidebarItems: SidebarItem[] = [
  {
    text: "Approver Inbox",
    route: Paths.INSPECT_APPLICATIONS,
  },
];

export const getSidebarItems = (role: string | null | undefined): SidebarItem[] => {
  if (role === "INSPECTIONADMIN") {
    return adminSidebarItems;
  }

  if (role === "ONLINEINSPECTION") {
    return officerSidebarItems;
  }

  if (role === "INSPECTIONAPPROVER") {
    return approverSidebarItems;
  }

  return [];
};
