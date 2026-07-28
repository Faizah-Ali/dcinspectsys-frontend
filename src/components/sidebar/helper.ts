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

const getOfficerSidebarItems = (
  group: string | null | undefined
): SidebarItem[] => {
  const items: SidebarItem[] = [
    {
      text: "Pending Application",
      route: Paths.INSPECT_APPLICATIONS,
    },
  ];

  if (group === "A") {
    items.push({
      text: "Processed (Application Side)",
      route: Paths.PROCESSED_APPLICATION_SIDE,
    });
  } else if (group === "O") {
    items.push({
      text: "Processed (Original Side)",
      route: Paths.PROCESSED_ORIGINAL_SIDE,
    });
  }

  items.push({
    text: "Rejected Application",
    route: Paths.REJECTED_APPLICATION,
  });

  return items;
};

const approverSidebarItems: SidebarItem[] = [
  {
    text: "Approver Inbox",
    route: Paths.INSPECT_APPLICATIONS,
  },
];

export const getSidebarItems = (
  role: string | null | undefined,
  group?: string | null
): SidebarItem[] => {
  if (role === "INSPECTIONADMIN") {
    return adminSidebarItems;
  }

  if (role === "ONLINEINSPECTION") {
    return getOfficerSidebarItems(group);
  }

  if (role === "INSPECTIONAPPROVER") {
    return approverSidebarItems;
  }

  return [];
};
