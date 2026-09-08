import { COLORS } from "../../common/constants";

export const styles = {
  root: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "6px",
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
    },
  },
  input: {
    fontSize: "14px",
    color: COLORS.textPrimary,
    padding: "12px 14px !important",
    minHeight: "22px",
    boxSizing: "border-box" as const,
  },
  inputSmall: {
    padding: "8.5px 14px !important",
    minHeight: "1.4375em",
  },
  placeholder: {
    color: "rgba(51, 51, 51, 0.55)",
  },
  paper: {
    marginTop: "4px",
    borderRadius: "6px",
    border: "1px solid rgba(15, 23, 41, 0.14)",
    backgroundColor: COLORS.white,
    boxShadow: "0 6px 18px rgba(15, 23, 41, 0.12)",
  },
  listbox: {
    maxHeight: "min(260px, calc(100vh - 160px))",
    padding: 0,
    // Autocomplete highlights the active row with `.Mui-focused` (theme grey
    // action.hover). Force orange so hover/keyboard focus match the app theme.
    "& .MuiAutocomplete-option": {
      fontSize: "13px",
      lineHeight: 1.35,
      minHeight: "36px",
      padding: "7px 12px",
      whiteSpace: "normal",
      wordBreak: "break-word",
      color: COLORS.textPrimary,
    },
    "& .MuiAutocomplete-option:hover": {
      backgroundColor: "rgba(209, 91, 6, 0.1) !important",
    },
    "& .MuiAutocomplete-option.Mui-focused": {
      backgroundColor: "rgba(209, 91, 6, 0.1) !important",
    },
    '& .MuiAutocomplete-option[data-focus="true"]': {
      backgroundColor: "rgba(209, 91, 6, 0.1) !important",
    },
    "& .MuiAutocomplete-option[aria-selected='true']": {
      backgroundColor: "rgba(209, 91, 6, 0.14) !important",
      color: COLORS.primary,
      fontWeight: 600,
    },
    "& .MuiAutocomplete-option[aria-selected='true']:hover": {
      backgroundColor: "rgba(209, 91, 6, 0.2) !important",
    },
    "& .MuiAutocomplete-option[aria-selected='true'].Mui-focused": {
      backgroundColor: "rgba(209, 91, 6, 0.2) !important",
    },
  },
};
