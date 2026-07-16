import { COLORS } from "../../common/constants";
import { styles as rejectApplicationStyles } from "../reject-application/style";

export const styles = {
  ...rejectApplicationStyles,
  actionsWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap" as const,
  },
  actionButtonsGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap" as const,
  },
  approveButton: {
    minWidth: "112px",
    height: "48px",
    backgroundColor: COLORS.primary,
    border: "none !important",
    borderRadius: "3px",
    color: "#161616 !important",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    padding: "0 20px !important",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: COLORS.sidebarHoverBg,
      color: "#ffffff",
      border: "none !important",
      boxShadow: "none !important",
    },
  },
  forwardButton: {
    minWidth: "112px",
    height: "48px",
    backgroundColor: COLORS.primary,
    border: "none !important",
    borderRadius: "3px",
    color: "#161616 !important",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    padding: "0 20px !important",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: COLORS.sidebarHoverBg,
      color: "#ffffff",
      border: "none !important",
      boxShadow: "none !important",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(209, 91, 6, 0.4)",
      color: "rgba(22, 22, 22, 0.5) !important",
    },
  },
} as const;
