import { COLORS } from "../../common/constants";
import { styles as uploadFileStyles } from "../upload-file/style";

export const styles = {
  ...uploadFileStyles,
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "22px",
  },
  tableWrapper: {
    width: "100%",
    maxWidth: "100%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflowX: "auto" as const,
    overflowY: "hidden" as const,
  },
  table: {
    width: "100%",
    tableLayout: "fixed" as const,
  },
  headerRow: {
    backgroundColor: "#f5f5f5",
  },
  headerCell: {
    fontWeight: 700,
    fontSize: "14px",
    color: COLORS.textPrimary,
    borderBottom: "2px solid #ddd",
    padding: "10px 12px !important",
    whiteSpace: "nowrap" as const,
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
    boxSizing: "border-box" as const,
    overflow: "hidden" as const,
  },
  dataRow: {
    "&:nth-of-type(even)": {
      backgroundColor: "#fafafa",
    },
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  deletedDataRow: {
    "&:nth-of-type(even)": {
      backgroundColor: "#fafafa",
    },
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
    "& td": {
      color: "#9e9e9e !important",
      fontSize: "14px !important",
      fontWeight: "400 !important",
      lineHeight: "1.43 !important",
    },
  },
  dataCell: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: 1.43,
    color: COLORS.textPrimary,
    padding: "10px 12px !important",
    borderBottom: "1px solid #e0e0e0",
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
    boxSizing: "border-box" as const,
    overflow: "hidden" as const,
    wordBreak: "break-word" as const,
  },
  // Summary of Uploaded Files — keep header/body columns synced
  uploadedFilesColumnWidths: [
    "18%",
    "20%",
    "12%",
    "13%",
    "13%",
    "24%",
  ] as const,
  fileNameCell: {
    width: "18%",
  },
  emailCell: {
    width: "20%",
  },
  mobileCell: {
    width: "12%",
  },
  uploadedByCell: {
    width: "13%",
    whiteSpace: "nowrap" as const,
  },
  uploadedOnCell: {
    width: "13%",
    whiteSpace: "nowrap" as const,
  },
  actionCell: {
    width: "24%",
    whiteSpace: "nowrap" as const,
  },
  actionButtonsWrap: {
    display: "grid",
    gridTemplateColumns: "32px 32px 64px",
    columnGap: "2px",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    width: "fit-content",
  },
  actionDeleteSlot: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "64px",
    minWidth: "64px",
    height: "32px",
  },
  actionDeletedSlot: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "64px",
    minWidth: "64px",
    height: "32px",
  },
  statusChip: {
    backgroundColor: "rgba(76, 175, 80, 0.12)",
    color: "#2E7D32",
    fontWeight: 600,
    fontSize: "12px",
  },
  deletedChip: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "28px",
    padding: "0 8px",
    borderRadius: "12px",
    backgroundColor: "rgba(209, 91, 6, 0.12)",
    color: `${COLORS.primary} !important`,
    fontWeight: "600 !important",
    fontSize: "11px !important",
    lineHeight: "1.2 !important",
    boxSizing: "border-box" as const,
    whiteSpace: "nowrap" as const,
  },
  accordionsWrap: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  accordion: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px !important",
    boxShadow: "none !important",
    overflow: "hidden" as const,
    "&::before": {
      display: "none",
    },
  },
  accordionSummary: {
    fontWeight: 700,
    fontSize: "15px",
    color: COLORS.textPrimary,
    backgroundColor: "#f5f5f5",
    minHeight: "48px !important",
    "& .MuiAccordionSummary-expandIconWrapper": {
      color: COLORS.primary,
    },
  },
  accordionDetails: {
    padding: "14px 16px",
  },
  accordionEmptyText: {
    margin: 0,
    fontSize: "14px",
    color: COLORS.textPrimary,
    opacity: 0.7,
  },
  closeButton: {
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
