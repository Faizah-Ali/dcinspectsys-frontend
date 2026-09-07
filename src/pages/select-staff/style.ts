import { COLORS } from "../../common/constants";
import { MOBILE_MAX } from "../../common/constants/breakpoints";

/**
 * Select Staff content styles.
 * Legacy keys (`form`, `referenceText`, `staffGroup`, `remarksRow`,
 * `remarksLabel`, `remarksField`, `submitButton`, `submitButtonWrap`) are kept
 * for Select Approver inheritance — do not change their visual intent.
 */
export const styles = {
  // Kept for Select Approver inheritance.
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "22px",
  },
  staffForm: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
    width: "100%",
    maxWidth: "720px",
    margin: "0 auto",
  },
  pageShell: {
    width: "100%",
    margin: "0 auto",
  },
  // Kept for Select Approver inheritance.
  referenceText: {
    margin: 0,
    color: COLORS.sidebarBg,
    fontSize: "14px",
    fontWeight: 600,
    textAlign: "center" as const,
  },
  section: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  sectionTitle: {
    margin: 0,
    color: COLORS.textPrimary,
    fontSize: "15px",
    fontWeight: 700,
  },
  loadingWrap: {
    display: "flex",
    justifyContent: "center",
    padding: "32px 0",
  },
  emptyText: {
    margin: 0,
    color: COLORS.textPrimary,
    fontSize: "14px",
    textAlign: "center" as const,
    padding: "20px 12px",
    opacity: 0.75,
  },
  // Kept for Select Approver inheritance — original plain radio list.
  staffGroup: {
    marginLeft: "8px",
    "& .MuiFormControlLabel-root": {
      alignItems: "flex-start",
      marginBottom: "6px",
    },
    "& .MuiFormControlLabel-label": {
      color: COLORS.textPrimary,
      fontSize: "18px",
    },
    "& .MuiRadio-root": {
      color: "#8c94a4",
      paddingTop: "2px",
      "&.Mui-checked": {
        color: COLORS.primary,
      },
    },
  },
  staffList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    margin: 0,
    width: "100%",
  },
  staffCard: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    width: "100%",
    margin: "0 !important",
    padding: "8px 14px 8px 8px",
    borderRadius: "12px",
    border: "1px solid rgba(15, 23, 41, 0.12)",
    backgroundColor: COLORS.white,
    boxSizing: "border-box" as const,
    boxShadow: "0 1px 2px rgba(15, 23, 41, 0.04)",
    transition:
      "border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease",
    "&:hover": {
      borderColor: "rgba(209, 91, 6, 0.45)",
      backgroundColor: "rgba(209, 91, 6, 0.03)",
      boxShadow: "0 4px 12px rgba(15, 23, 41, 0.06)",
    },
    "& .MuiRadio-root": {
      color: "rgba(15, 23, 41, 0.35)",
      padding: "6px",
      "&.Mui-checked": {
        color: COLORS.primary,
      },
    },
    "& .MuiFormControlLabel-label": {
      flex: 1,
      minWidth: 0,
      marginLeft: "4px",
    },
  },
  staffCardSelected: {
    borderColor: `${COLORS.primary} !important`,
    backgroundColor: "rgba(209, 91, 6, 0.07) !important",
    boxShadow:
      "0 0 0 1px rgba(209, 91, 6, 0.22), 0 4px 14px rgba(209, 91, 6, 0.12)",
  },
  staffCardLabel: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    minWidth: 0,
  },
  staffCardName: {
    flex: 1,
    minWidth: 0,
    color: COLORS.textPrimary,
    fontSize: "15px",
    fontWeight: 400,
    lineHeight: 1.35,
    wordBreak: "break-word" as const,
  },
  staffCardNameSelected: {
    color: COLORS.sidebarBg,
    fontWeight: 700,
  },
  selectedBadge: {
    flexShrink: 0,
    marginLeft: "auto",
    padding: "4px 10px",
    borderRadius: "999px",
    backgroundColor: "rgba(209, 91, 6, 0.12)",
    color: COLORS.primary,
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
    lineHeight: 1.2,
  },
  // Kept for Select Approver inheritance.
  remarksRow: {
    display: "grid",
    gridTemplateColumns: "92px 1fr",
    alignItems: "center",
    gap: "14px",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
    },
  },
  remarksSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  remarksLabel: {
    color: COLORS.textPrimary,
    fontSize: "16px",
  },
  remarksSectionLabel: {
    color: COLORS.textPrimary,
    fontSize: "15px",
    fontWeight: 700,
  },
  // Kept for Select Approver inheritance — original field chrome.
  remarksField: {
    "& .MuiOutlinedInput-root": {
      alignItems: "flex-start",
      borderRadius: "4px",
      backgroundColor: COLORS.white,
      "& fieldset": {
        borderColor: "rgba(15, 23, 41, 0.2)",
      },
      "&:hover fieldset": {
        borderColor: COLORS.primary,
      },
      "&.Mui-focused fieldset": {
        borderColor: COLORS.primary,
      },
    },
    "& .MuiInputBase-input": {
      fontSize: "14px",
      color: COLORS.textPrimary,
    },
  },
  staffRemarksField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      alignItems: "flex-start",
      borderRadius: "12px",
      backgroundColor: "rgba(15, 23, 41, 0.02)",
      "& fieldset": {
        borderColor: "rgba(15, 23, 41, 0.12)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(209, 91, 6, 0.55)",
      },
      "&.Mui-focused": {
        backgroundColor: COLORS.white,
      },
      "&.Mui-focused fieldset": {
        borderColor: COLORS.primary,
        borderWidth: "1.5px",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: "14px",
      color: COLORS.textPrimary,
      lineHeight: 1.5,
    },
    "& .MuiInputBase-input::placeholder": {
      color: "rgba(51, 51, 51, 0.42)",
      opacity: 1,
    },
  },
  // Kept for Select Approver inheritance (approver uses actionsWrap instead).
  submitButtonWrap: {
    display: "flex",
    justifyContent: "center",
  },
  staffActions: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "4px",
  },
  // Kept for Select Approver inheritance — original button chrome.
  submitButton: {
    minWidth: "128px",
    height: "48px",
    backgroundColor: COLORS.primary,
    border: "none !important",
    borderRadius: "3px",
    color: `${COLORS.white} !important`,
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    padding: "0 24px !important",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: "#b34d05",
      color: COLORS.white,
      border: "none !important",
      boxShadow: "none !important",
    },
  },
  staffSubmitButton: {
    minWidth: "128px",
    height: "44px",
    backgroundColor: COLORS.primary,
    border: "none !important",
    borderRadius: "10px",
    color: `${COLORS.white} !important`,
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    padding: "0 28px !important",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    boxShadow: "0 6px 16px rgba(209, 91, 6, 0.28) !important",
    "&:hover": {
      backgroundColor: "#b34d05",
      color: COLORS.white,
      border: "none !important",
      boxShadow: "0 8px 18px rgba(209, 91, 6, 0.34) !important",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(209, 91, 6, 0.32) !important",
      color: `${COLORS.white} !important`,
      boxShadow: "none !important",
    },
  },
} as const;

/** Popup chrome used only by Select Staff entry points. */
export const selectStaffPopupStyles = {
  paper: {
    width: "100%",
    maxWidth: "760px",
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor: COLORS.white,
    boxShadow: "0 20px 48px rgba(15, 23, 41, 0.18)",
    maxHeight: "none",
  },
  header: {
    backgroundColor: COLORS.white,
    borderBottom: "1px solid rgba(15, 23, 41, 0.08)",
  },
  content: {
    padding: "18px 28px 24px",
    backgroundColor: "#fafbfc",
    overflow: "visible",
    overflowY: "visible",
    flex: "none",
    minHeight: "unset",
    [`@media (max-width: ${MOBILE_MAX}px)`]: {
      padding: "14px 16px 16px",
    },
  },
} as const;
