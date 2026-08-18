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
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    padding: "0 20px !important",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: "#b34d05",
      color: COLORS.white,
      border: "none !important",      
    },
  },
  forwardButton: {
    minWidth: "112px",
    height: "48px",
    backgroundColor: COLORS.primary,
    border: "1px solid transparent !important",
    borderRadius: "3px",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    padding: "0 20px !important",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: "#b34d05 !important",
      color: `${COLORS.white} !important`,
      border: "1px solid transparent !important",
      boxShadow: "none !important",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(209, 91, 6, 0.54)",
      color: "#FFFFFF",
    },
  },
} as const;
