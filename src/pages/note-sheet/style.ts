import { COLORS } from "../../common/constants";
import { MOBILE_MAX, RESPONSIVE_MAX } from "../../common/constants/breakpoints";

/** 3-column dealing remarks table — horizontal scroll below desktop. */
const NOTE_SHEET_TABLE_MIN_WIDTH = 480;

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 0,
    width: "100%",
    maxWidth: "720px",
    margin: "0 auto",
  },
  /** Kept for residual consumers. */
  referenceText: {
    margin: "0 0 14px",
    fontSize: "14px",
    fontWeight: 600,
    color: COLORS.sidebarBg,
    textAlign: "center" as const,
  },
  sectionHeading: {
    margin: "0 0 8px",
    color: COLORS.sidebarBg,
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
  },
  loadingWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100px",
    marginBottom: "12px",
  },
  tableWrapper: {
    width: "100%",
    maxWidth: "100%",
    boxShadow: "none",
    borderRadius: "6px",
    border: "1px solid rgba(15, 23, 41, 0.14)",
    overflowX: "auto" as const,
    overflowY: "hidden" as const,
    backgroundColor: COLORS.white,
    marginBottom: "14px",
  },
  table: {
    width: "100%",
    tableLayout: "fixed" as const,
    borderCollapse: "separate" as const,
    [`@media (max-width: ${RESPONSIVE_MAX}px)`]: {
      minWidth: `${NOTE_SHEET_TABLE_MIN_WIDTH}px`,
    },
  },
  headerRow: {
    backgroundColor: "rgba(15, 23, 41, 0.045)",
  },
  headerCell: {
    fontWeight: 700,
    fontSize: "12px",
    letterSpacing: "0.03em",
    textTransform: "uppercase" as const,
    color: COLORS.sidebarBg,
    borderBottom: "1px solid rgba(15, 23, 41, 0.16)",
    padding: "8px 10px !important",
    whiteSpace: "nowrap" as const,
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
    boxSizing: "border-box" as const,
    overflow: "hidden" as const,
  },
  dataRow: {
    "&:nth-of-type(even)": {
      backgroundColor: "rgba(15, 23, 41, 0.02)",
    },
    "&:hover": {
      backgroundColor: "rgba(15, 23, 41, 0.04)",
    },
    "&:last-of-type td": {
      borderBottom: "none",
    },
  },
  dataCell: {
    fontSize: "13px",
    fontWeight: 500,
    lineHeight: 1.4,
    color: COLORS.textPrimary,
    padding: "8px 10px !important",
    borderBottom: "1px solid rgba(15, 23, 41, 0.08)",
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
    boxSizing: "border-box" as const,
    overflow: "hidden" as const,
    wordBreak: "break-word" as const,
  },
  contentCell: {
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: 1.45,
    color: COLORS.textPrimary,
    padding: "8px 10px !important",
    borderBottom: "1px solid rgba(15, 23, 41, 0.08)",
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
    boxSizing: "border-box" as const,
    overflow: "hidden" as const,
    wordBreak: "break-word" as const,
    whiteSpace: "pre-wrap" as const,
  },
  emptyText: {
    margin: "0 0 14px",
    padding: "20px 12px",
    fontSize: "13px",
    color: "rgba(15, 23, 41, 0.55)",
    textAlign: "center" as const,
    border: "1px dashed rgba(15, 23, 41, 0.14)",
    borderRadius: "6px",
    backgroundColor: "rgba(15, 23, 41, 0.02)",
  },
  actionsWrap: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "10px",
    paddingTop: "12px",
    borderTop: "1px solid rgba(15, 23, 41, 0.1)",
  },
  closeButton: {
    minWidth: "120px",
    height: "42px",
    backgroundColor: COLORS.primary,
    border: "none !important",
    borderRadius: "10px",
    color: `${COLORS.white} !important`,
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "none" as const,
    cursor: "pointer",
    padding: "0 22px !important",
    boxShadow: "0 6px 16px rgba(209, 91, 6, 0.28) !important",
    "&:hover": {
      backgroundColor: "#b34d05",
      color: COLORS.white,
      boxShadow: "0 8px 18px rgba(209, 91, 6, 0.34) !important",
    },
  },
  authorCell: {
    width: "33.33%",
  },
  dateCell: {
    width: "33.33%",
    whiteSpace: "nowrap" as const,
  },
  commentCell: {
    width: "33.34%",
  },
  columnWidths: ["33.33%", "33.33%", "33.34%"] as const,
} as const;

/** Popup chrome used only by Note Sheet entry points. */
export const noteSheetPopupStyles = {
  paper: {
    width: "min(760px, calc(100vw - 40px))",
    maxWidth: "760px",
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor: COLORS.white,
    boxShadow: "0 12px 32px rgba(15, 23, 41, 0.14)",
    maxHeight: "calc(100vh - 40px)",
  },
  header: {
    backgroundColor: COLORS.white,
    borderBottom: "1px solid rgba(15, 23, 41, 0.1)",
    minHeight: "60px",
    padding: "10px 16px",
  },
  content: {
    padding: "16px 24px 18px",
    backgroundColor: COLORS.white,
    overflow: "hidden",
    overflowY: "hidden",
    overflowX: "hidden",
    [`@media (max-width: ${MOBILE_MAX}px)`]: {
      padding: "14px 16px 16px",
    },
  },
} as const;
