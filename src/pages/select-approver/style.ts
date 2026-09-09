import { COLORS } from "../../common/constants";
import {
  styles as selectStaffStyles,
  selectStaffPopupStyles,
} from "../select-staff/style";

/**
 * Select Approver shares Select Staff visual language.
 * Approver-only keys: actionsWrap (Cancel + Submit), cancelButton.
 */
export const styles = {
  ...selectStaffStyles,
  actionsWrap: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap" as const,
    paddingTop: "14px",
    marginTop: "auto",
    borderTop: "1px solid rgba(15, 23, 41, 0.12)",
    flexShrink: 0,
  },
  cancelButton: {
    minWidth: "120px",
    height: "42px",
    backgroundColor: COLORS.white,
    border: `1px solid ${COLORS.primary} !important`,
    borderRadius: "10px",
    color: `${COLORS.primary} !important`,
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    padding: "0 22px !important",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: "rgba(209, 91, 6, 0.08)",
      color: COLORS.primary,
      boxShadow: "none !important",
    },
  },
} as const;

/** Same popup chrome as Select Staff / Assign. */
export const selectApproverPopupStyles = selectStaffPopupStyles;
