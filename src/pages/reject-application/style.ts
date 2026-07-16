import { COLORS } from "../../common/constants";
import { styles as uploadFileStyles } from "../upload-file/style";

export const styles = {
  ...uploadFileStyles,
  remarksSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
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
    "& .MuiFormHelperText-root": {
      marginLeft: 0,
      fontSize: "13px",
    },
  },
  rejectButton: {
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
    "&.Mui-disabled": {
      backgroundColor: "rgba(209, 91, 6, 0.4)",
      color: "rgba(22, 22, 22, 0.5) !important",
    },
  },
} as const;
