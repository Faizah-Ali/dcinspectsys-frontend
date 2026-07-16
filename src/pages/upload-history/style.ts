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
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden" as const,
  },
  table: {
    minWidth: "100%",
  },
  headerRow: {
    backgroundColor: "#f5f5f5",
  },
  headerCell: {
    fontWeight: 700,
    fontSize: "14px",
    color: COLORS.textPrimary,
    borderBottom: "2px solid #ddd",
    padding: "12px 16px",
    whiteSpace: "nowrap" as const,
  },
  dataRow: {
    "&:nth-of-type(even)": {
      backgroundColor: "#fafafa",
    },
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  dataCell: {
    fontSize: "14px",
    color: COLORS.textPrimary,
    padding: "12px 16px",
    borderBottom: "1px solid #e0e0e0",
    verticalAlign: "middle" as const,
  },
  statusChip: {
    backgroundColor: "rgba(76, 175, 80, 0.12)",
    color: "#2E7D32",
    fontWeight: 600,
    fontSize: "12px",
  },
  viewButton: {
    minWidth: "72px",
    height: "32px",
    backgroundColor: COLORS.white,
    border: `1px solid ${COLORS.primary} !important`,
    borderRadius: "3px",
    color: `${COLORS.primary} !important`,
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    padding: "0 12px !important",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: "rgba(209, 91, 6, 0.08)",
      border: `1px solid ${COLORS.sidebarHoverBg} !important`,
      color: `${COLORS.sidebarHoverBg} !important`,
      boxShadow: "none !important",
    },
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
      border: `1px solid ${COLORS.sidebarHoverBg} !important`,
      color: `${COLORS.sidebarHoverBg} !important`,
      boxShadow: "none !important",
    },
  },
} as const;
