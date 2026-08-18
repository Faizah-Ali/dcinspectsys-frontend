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
    borderRadius: "3px",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    padding: "0 24px !important",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: "#b34d05",
      color: COLORS.white,
      border: "none !important",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(209, 91, 6, 0.54)",
      color: "#FFFFFF",
      border: "1px solid transparent !important",
    },
  },
} as const;
