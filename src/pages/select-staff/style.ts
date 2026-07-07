import { COLORS } from "../../common/constants";

export const styles = {
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "22px",
  },
  referenceText: {
    margin: 0,
    color: COLORS.sidebarBg,
    fontSize: "14px",
    fontWeight: 600,
    textAlign: "center" as const,
  },
  loadingWrap: {
    display: "flex",
    justifyContent: "center",
    padding: "16px 0",
  },
  emptyText: {
    margin: 0,
    color: COLORS.textPrimary,
    fontSize: "16px",
    textAlign: "center" as const,
    padding: "8px 0",
  },
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
  remarksRow: {
    display: "grid",
    gridTemplateColumns: "92px 1fr",
    alignItems: "center",
    gap: "14px",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
    },
  },
  remarksLabel: {
    color: COLORS.textPrimary,
    fontSize: "16px",
  },
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
  submitButtonWrap: {
    display: "flex",
    justifyContent: "center",
  },
  submitButton: {
    minWidth: "128px",
    height: "48px",
    backgroundColor: COLORS.primary,
    border: "none !important",
    borderRadius: "3px",
    color: "#161616 !important",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    padding: "0 24px !important",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: COLORS.sidebarHoverBg,
      color: "#ffffff",
      border: "none !important",
      boxShadow: "none !important",
    },
  },
} as const;
