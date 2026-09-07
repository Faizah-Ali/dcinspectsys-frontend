import { COLORS } from "../../common/constants";
import { MOBILE_MAX } from "../../common/constants/breakpoints";
import { styles as uploadFileStyles } from "../upload-file/style";

/**
 * Reject Application styles.
 * Keeps keys used by Approver Process inheritance (`remarksSection`,
 * `remarksField`, `rejectButton`, plus upload-file shared keys).
 */
export const styles = {
  ...uploadFileStyles,
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 0,
    width: "100%",
    maxWidth: "720px",
    margin: "0 auto",
  },
  referenceText: {
    margin: "0 0 16px",
    color: COLORS.sidebarBg,
    fontSize: "14px",
    fontWeight: 600,
    textAlign: "center" as const,
  },
  fieldSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
    marginBottom: "14px",
    width: "100%",
  },
  fieldLabel: {
    color: COLORS.textPrimary,
    fontSize: "13px",
    fontWeight: 600,
  },
  documentTypeSelect: {
    borderRadius: "4px",
    backgroundColor: COLORS.white,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(15, 23, 41, 0.18)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: `${COLORS.primary} !important`,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${COLORS.primary} !important`,
      borderWidth: "1.5px",
    },
    "&.Mui-focused .MuiSvgIcon-root": {
      color: COLORS.primary,
    },
    "& .MuiSelect-select": {
      fontSize: "14px",
      color: COLORS.textPrimary,
      padding: "12px 14px",
      minHeight: "22px",
    },
  },
  documentTypeMenu: {
    marginTop: "4px",
    borderRadius: "4px",
    border: "1px solid rgba(15, 23, 41, 0.14)",
    backgroundColor: COLORS.white,
    boxShadow: "0 6px 18px rgba(15, 23, 41, 0.12)",
    maxHeight: "min(260px, calc(100vh - 160px))",
    overflowY: "auto",
    overflowX: "hidden",
    "& .MuiMenuItem-root": {
      fontSize: "13px",
      lineHeight: 1.35,
      minHeight: "36px",
      padding: "7px 12px",
      whiteSpace: "normal",
      wordBreak: "break-word",
      color: COLORS.textPrimary,
    },
    "& .MuiMenuItem-root:hover": {
      backgroundColor: "rgba(209, 91, 6, 0.1)",
    },
    "& .MuiMenuItem-root.Mui-selected": {
      backgroundColor: "rgba(209, 91, 6, 0.14) !important",
      color: COLORS.primary,
      fontWeight: 600,
    },
    "& .MuiMenuItem-root.Mui-selected:hover": {
      backgroundColor: "rgba(209, 91, 6, 0.2) !important",
    },
    "& .MuiMenuItem-root.Mui-selected.Mui-focusVisible": {
      backgroundColor: "rgba(209, 91, 6, 0.14) !important",
    },
    "& .MuiMenuItem-root.Mui-focusVisible": {
      backgroundColor: "rgba(209, 91, 6, 0.1)",
    },
  },
  placeholderText: {
    color: "rgba(51, 51, 51, 0.55)",
  },
  remarksSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
    marginBottom: "16px",
    width: "100%",
  },
  remarksField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      alignItems: "flex-start",
      borderRadius: "4px",
      backgroundColor: COLORS.white,
      minHeight: "108px",
      "& fieldset": {
        borderColor: "rgba(15, 23, 41, 0.18)",
      },
      "&:hover fieldset": {
        borderColor: COLORS.primary,
      },
      "&.Mui-focused fieldset": {
        borderColor: COLORS.primary,
        borderWidth: "1.5px",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: "14px",
      color: COLORS.textPrimary,
      lineHeight: 1.45,
      padding: "10px 12px !important",
    },
    "& .MuiFormHelperText-root": {
      marginLeft: 0,
      marginTop: "4px",
      fontSize: "12px",
    },
  },
  actionsWrap: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap" as const,
    width: "100%",
  },
  /** Kept for Approver Process inheritance. */
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
  /** Kept for Approver Process inheritance. */
  rejectButton: {
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
    "&.Mui-disabled": {
      backgroundColor: "rgba(209, 91, 6, 0.54)",
      color: "#FFFFFF",
      border: "1px solid transparent !important",
    },
  },
  /** Reject Application popup only — matches Upload File / Select Staff chrome. */
  rejectPopupCancelButton: {
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
  rejectPopupRejectButton: {
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

export const rejectApplicationPopupStyles = {
  paper: {
    width: "100%",
    maxWidth: "760px",
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor: COLORS.white,
    boxShadow: "0 12px 32px rgba(15, 23, 41, 0.14)",
    maxHeight: "calc(100vh - 32px)",
  },
  header: {
    backgroundColor: COLORS.white,
    borderBottom: "1px solid rgba(15, 23, 41, 0.1)",
    minHeight: "56px",
    padding: "10px 16px",
  },
  content: {
    padding: "18px 28px 24px",
    backgroundColor: COLORS.white,
    overflow: "visible",
    [`@media (max-width: ${MOBILE_MAX}px)`]: {
      padding: "14px 16px 16px",
    },
  },
} as const;
