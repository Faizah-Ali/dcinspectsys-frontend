import { COLORS } from "../../common/constants";
import { MOBILE_MAX } from "../../common/constants/breakpoints";

/**
 * Select Staff content styles.
 * Shared visual language for Select Approver (via style inheritance).
 * Legacy keys kept for upload-file / other inheritance consumers.
 */
export const styles = {
  // Kept for Select Approver / upload-file inheritance.
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "22px",
  },
  staffForm: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "14px",
    width: "100%",
    maxWidth: "760px",
    margin: "0 auto",
    flex: "1 1 auto",
    minHeight: 0,
    height: "100%",
    overflow: "hidden",
  },
  pageShell: {
    display: "flex",
    flexDirection: "column" as const,
    width: "100%",
    height: "100%",
    flex: "1 1 auto",
    minHeight: 0,
    margin: "0 auto",
    overflow: "hidden",
  },
  // Kept for Select Approver inheritance.
  referenceText: {
    margin: 0,
    color: COLORS.sidebarBg,
    fontSize: "14px",
    fontWeight: 600,
    textAlign: "center" as const,
  },
  /** Compact official metadata row — not a promotional card. */
  referenceStrip: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "16px",
    width: "100%",
    flexShrink: 0,
    padding: "10px 14px",
    borderRadius: "4px",
    border: "1px solid rgba(15, 23, 41, 0.12)",
    backgroundColor: "rgba(15, 23, 41, 0.035)",
    boxSizing: "border-box" as const,
  },
  referenceLabel: {
    margin: 0,
    color: "rgba(15, 23, 41, 0.58)",
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
    lineHeight: 1.2,
    whiteSpace: "nowrap" as const,
  },
  referenceValue: {
    margin: 0,
    color: COLORS.sidebarBg,
    fontSize: "14px",
    fontWeight: 600,
    letterSpacing: "0.02em",
    lineHeight: 1.3,
  },
  section: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    flex: "1 1 auto",
    minHeight: 0,
    overflow: "hidden",
  },
  sectionTitle: {
    margin: 0,
    flexShrink: 0,
    color: COLORS.sidebarBg,
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase" as const,
    lineHeight: 1.3,
    paddingBottom: "6px",
    borderBottom: "1px solid rgba(15, 23, 41, 0.12)",
  },
  popupSearch: {
    justifyContent: "stretch" as const,
    marginBottom: 0,
    flexShrink: 0,
    width: "100%",
    "& .MuiFormControl-root": {
      width: "100% !important",
      maxWidth: "100% !important",
    },
    "& .MuiTextField-root": {
      width: "100% !important",
      maxWidth: "100% !important",
    },
    "& .MuiOutlinedInput-root": {
      height: "44px",
      borderRadius: "10px",
      backgroundColor: COLORS.white,
      "& fieldset": {
        borderColor: "rgba(15, 23, 41, 0.18)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(15, 23, 41, 0.3)",
      },
      "&.Mui-focused fieldset": {
        borderColor: COLORS.primary,
        borderWidth: "1px",
      },
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
      padding: "10px 0",
      color: COLORS.textPrimary,
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: "rgba(51, 51, 51, 0.45)",
      opacity: 1,
      fontSize: "14px",
    },
    "& .MuiInputAdornment-root": {
      color: "rgba(15, 23, 41, 0.45)",
      marginRight: "8px",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "20px",
    },
  },
  loadingWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "1 1 auto",
    minHeight: 0,
    border: "1px solid rgba(15, 23, 41, 0.16)",
    borderRadius: "10px",
    backgroundColor: COLORS.white,
  },
  emptyText: {
    margin: 0,
    color: "rgba(51, 51, 51, 0.7)",
    fontSize: "14px",
    textAlign: "center" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 1 auto",
    minHeight: 0,
    padding: "20px 14px",
    border: "1px solid rgba(15, 23, 41, 0.16)",
    borderRadius: "10px",
    backgroundColor: COLORS.white,
    boxSizing: "border-box" as const,
  },
  // Kept for Select Approver inheritance — legacy plain radio list.
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
  /**
   * ONLY scrollable region. Modal height never depends on record count.
   * Subtle visible scrollbar — all records remain accessible.
   */
  staffListScroll: {
    flex: "1 1 auto",
    minHeight: 0,
    width: "100%",
    overflowX: "hidden",
    overflowY: "auto",
    border: "1px solid rgba(15, 23, 41, 0.16)",
    borderRadius: "10px",
    backgroundColor: COLORS.white,
    boxSizing: "border-box" as const,
    overscrollBehavior: "contain",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(15, 23, 41, 0.45) rgba(15, 23, 41, 0.08)",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(15, 23, 41, 0.45)",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "rgba(15, 23, 41, 0.08)",
      borderRadius: "8px",
    },
  },
  /** Rows inside the fixed list region — does not control modal height. */
  staffList: {
    display: "flex",
    flexDirection: "column" as const,
    margin: 0,
    width: "100%",
    minHeight: "100%",
    backgroundColor: COLORS.white,
  },
  staffRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    minHeight: "50px",
    padding: "0 14px",
    boxSizing: "border-box" as const,
    borderBottom: "1px solid rgba(15, 23, 41, 0.1)",
    backgroundColor: COLORS.white,
    cursor: "pointer",
    outline: "none",
    transition: "background-color 0.12s ease, box-shadow 0.12s ease",
    "&:last-child": {
      borderBottom: "none",
    },
    "&:hover": {
      backgroundColor: "rgba(209, 91, 6, 0.06)",
    },
    "&:focus-visible": {
      backgroundColor: "rgba(209, 91, 6, 0.05)",
      boxShadow: "inset 0 0 0 1px rgba(209, 91, 6, 0.4)",
    },
  },
  staffRowSelected: {
    backgroundColor: "rgba(209, 91, 6, 0.07) !important",
    boxShadow: `inset 3px 0 0 ${COLORS.primary}`,
  },
  /** Small formal marker — not a browser radio control. */
  selectionMarker: {
    flexShrink: 0,
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    border: "1.5px solid rgba(15, 23, 41, 0.35)",
    backgroundColor: COLORS.white,
    boxSizing: "border-box" as const,
  },
  selectionMarkerSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    boxShadow: `inset 0 0 0 2.5px ${COLORS.white}`,
  },
  staffRowName: {
    flex: 1,
    minWidth: 0,
    color: COLORS.textPrimary,
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.01em",
    textTransform: "uppercase" as const,
    wordBreak: "break-word" as const,
  },
  staffRowNameSelected: {
    color: COLORS.sidebarBg,
    fontWeight: 700,
  },
  selectedBadge: {
    flexShrink: 0,
    marginLeft: "auto",
    color: COLORS.primary,
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    lineHeight: 1.2,
  },
  checkIcon: {
    display: "none",
  },
  // Legacy card keys — kept for any residual consumers.
  staffCard: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "0 !important",
  },
  staffCardSelected: {},
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
    fontSize: "14px",
    fontWeight: 500,
  },
  staffCardNameSelected: {
    color: COLORS.sidebarBg,
    fontWeight: 700,
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
    flexShrink: 0,
    flexGrow: 0,
  },
  remarksLabel: {
    color: COLORS.textPrimary,
    fontSize: "16px",
  },
  remarksSectionLabel: {
    margin: 0,
    color: COLORS.sidebarBg,
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase" as const,
    lineHeight: 1.3,
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
    flexShrink: 0,
    "& .MuiOutlinedInput-root": {
      alignItems: "flex-start",
      minHeight: "76px",
      maxHeight: "84px",
      padding: "10px 12px",
      borderRadius: "10px",
      backgroundColor: COLORS.white,
      overflow: "hidden",
      "& fieldset": {
        borderColor: "rgba(15, 23, 41, 0.18)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(15, 23, 41, 0.3)",
      },
      "&.Mui-focused fieldset": {
        borderColor: COLORS.primary,
        borderWidth: "1px",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: "14px",
      color: COLORS.textPrimary,
      lineHeight: 1.45,
      padding: 0,
      overflow: "hidden !important",
      resize: "none",
    },
    "& .MuiInputBase-inputMultiline": {
      overflow: "hidden !important",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "rgba(51, 51, 51, 0.42)",
      opacity: 1,
      fontSize: "14px",
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
    alignItems: "center",
    gap: "12px",
    paddingTop: "14px",
    marginTop: "auto",
    borderTop: "1px solid rgba(15, 23, 41, 0.12)",
    flexShrink: 0,
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
    minWidth: "120px",
    height: "42px",
    backgroundColor: COLORS.primary,
    border: "none !important",
    borderRadius: "10px",
    color: `${COLORS.white} !important`,
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    padding: "0 22px !important",
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

/**
 * Shared fixed modal chrome for Select Staff and Select Approver.
 * Height is viewport-capped and NEVER driven by record count.
 */
export const selectStaffPopupStyles = {
  paper: {
    width: "100%",
    maxWidth: "min(760px, calc(100vw - 32px))",
    height: "min(720px, calc(100vh - 32px))",
    maxHeight: "calc(100vh - 32px)",
    minHeight: 0,
    borderRadius: "6px",
    overflow: "hidden",
    backgroundColor: COLORS.white,
    boxShadow: "0 10px 28px rgba(15, 23, 41, 0.14)",
    display: "flex",
    flexDirection: "column" as const,
    margin: "16px",
  },
  header: {
    backgroundColor: COLORS.white,
    borderBottom: "1px solid rgba(15, 23, 41, 0.12)",
    flexShrink: 0,
    minHeight: "56px",
    padding: "10px 16px",
    "& h2": {
      color: COLORS.sidebarBg,
      fontSize: "20px",
      fontWeight: 700,
      letterSpacing: "0.02em",
      textTransform: "none" as const,
      lineHeight: 1.25,
    },
    "& .MuiIconButton-root": {
      width: "36px",
      height: "36px",
    },
  },
  content: {
    padding: "16px 22px 18px",
    backgroundColor: COLORS.white,
    overflow: "hidden",
    overflowX: "hidden",
    overflowY: "hidden",
    flex: "1 1 auto",
    minHeight: 0,
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
    [`@media (max-width: ${MOBILE_MAX}px)`]: {
      padding: "14px 14px 16px",
    },
  },
} as const;
