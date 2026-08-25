import { COLORS } from "../../common/constants";
import { styles as selectApproverStyles } from "../select-approver/style";

export const styles = {
  ...selectApproverStyles,
  fieldSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  fieldLabel: {
    color: COLORS.textPrimary,
    fontSize: "16px",
    fontWeight: 600,
  },
  documentTypeSelect: {
    borderRadius: "4px",
    backgroundColor: COLORS.white,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(15, 23, 41, 0.2)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: `${COLORS.primary} !important`,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${COLORS.primary} !important`,
      borderWidth: "2px",
    },
    "&.Mui-focused .MuiSvgIcon-root": {
      color: COLORS.primary,
    },
    "& .MuiSelect-select": {
      fontSize: "14px",
      color: COLORS.textPrimary,
    },
  },
  documentTypeMenu: {
    "& .MuiMenuItem-root:hover": {
      backgroundColor: "rgba(209, 91, 6, 0.08)",
    },
    "& .MuiMenuItem-root.Mui-selected": {
      backgroundColor: "rgba(209, 91, 6, 0.12) !important",
      color: COLORS.primary,
    },
    "& .MuiMenuItem-root.Mui-selected:hover": {
      backgroundColor: "rgba(209, 91, 6, 0.2) !important",
    },
    "& .MuiMenuItem-root.Mui-selected.Mui-focusVisible": {
      backgroundColor: "rgba(209, 91, 6, 0.12) !important",
    },
    "& .MuiMenuItem-root.Mui-focusVisible": {
      backgroundColor: "rgba(209, 91, 6, 0.08)",
    },
  },
  placeholderText: {
    color: "rgba(51, 51, 51, 0.6)",
  },
  filePickerSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  hiddenFileInput: {
    display: "none",
  },
  chooseFileButton: {
    alignSelf: "flex-start",
    minWidth: "148px",
    height: "40px",
    backgroundColor: COLORS.white,
    border: `1px solid ${COLORS.primary} !important`,
    borderRadius: "3px",
    color: `${COLORS.primary} !important`,
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    padding: "0 20px !important",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: "rgba(209, 91, 6, 0.08)",
      color: COLORS.primary,
      boxShadow: "none !important",
    },
  },
  fileListsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    alignItems: "start",
    width: "100%",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
    },
  },
  uploadedFilesSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
    minWidth: 0,
  },
  selectedFileWrap: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
    minWidth: 0,
  },
  selectedFileRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  selectedFileLabel: {
    color: COLORS.textPrimary,
    fontSize: "14px",
    fontWeight: 600,
  },
  selectedFileName: {
    color: COLORS.textPrimary,
    fontSize: "14px",
    wordBreak: "break-word" as const,
  },
  deletedUploadedFileName: {
    color: "#9e9e9e",
    fontSize: "14px",
    wordBreak: "break-word" as const,
  },
  deletedLabel: {
    fontStyle: "italic" as const,
  },
  emptyFileName: {
    color: "rgba(51, 51, 51, 0.6)",
    fontStyle: "italic" as const,
  },
} as const;
