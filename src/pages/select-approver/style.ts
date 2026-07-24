import { COLORS } from "../../common/constants";
import { styles as selectStaffStyles } from "../select-staff/style";

export const styles = {
  ...selectStaffStyles,
  actionsWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap" as const,
  },
  cancelButton: {
    minWidth: "128px",
    height: "48px",
    backgroundColor: COLORS.white,
    border: `1px solid ${COLORS.primary} !important`,
    borderRadius: "3px",
    color: `${COLORS.primary} !important`,
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    padding: "0 24px !important",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: "rgba(209, 91, 6, 0.08)",
      color: COLORS.primary,
      boxShadow: "none !important",
    },
  },
} as const;
