import { COLORS } from "../../common/constants/colors";

export const styles = {
  mainContainer: {
    width: "calc(100% - 350px)",
    minHeight: "100vh",
    // Clear fixed header (~100px)
    paddingTop: "110px",
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "24px",
    marginLeft: "350px",
    boxSizing: "border-box" as const,
    textAlign: "left" as const,
    overflowX: "hidden" as const,
  },
  tableContainer: {
    width: "100%",
    maxWidth: "100%",
    padding: "8px 0",
    boxSizing: "border-box" as const,
  },
  tableHeading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "16px",
    marginTop: "8px",
    textAlign: "left" as const,
  },
  tableWrapper: {
    width: "100%",
    maxWidth: "100%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden" as const,
  },
  table: {
    width: "100%",
    tableLayout: "fixed" as const,
    borderCollapse: "collapse" as const,
    // Force identical padding on every head + body cell so columns stay synced
    "& .MuiTableCell-root": {
      padding: "10px 8px !important",
      verticalAlign: "middle",
      boxSizing: "border-box",
    },
    "& .MuiTableCell-head": {
      padding: "10px 8px !important",
    },
    "& .MuiTableCell-body": {
      padding: "10px 8px !important",
    },
  },
  headerRow: {
    backgroundColor: "#f5f5f5",
  },
  // Identical padding/align on head + body keeps columns synced
  headerCell: {
    fontWeight: "bold",
    fontSize: "13px",
    color: "#000",
    borderBottom: "2px solid #ddd",
    padding: "10px 8px !important",
    overflow: "hidden" as const,
    verticalAlign: "middle" as const,
    textAlign: "center" as const,
    boxSizing: "border-box" as const,
    lineHeight: 1.4,
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
    fontSize: "13px",
    color: "#333",
    padding: "10px 8px !important",
    borderBottom: "1px solid #e0e0e0",
    verticalAlign: "middle" as const,
    overflow: "hidden" as const,
    wordBreak: "break-word" as const,
    textAlign: "center" as const,
    boxSizing: "border-box" as const,
    lineHeight: 1.4,
  },
  srlNoCell: {
    width: "3%",
  },
  pwdCatCell: {
    width: "3.5%",
  },
  partyIdCell: {
    width: "8%",
  },
  referenceNoCell: {
    width: "7.5%",
    whiteSpace: "nowrap" as const,
  },
  caseNoCell: {
    width: "13.5%",
    whiteSpace: "normal" as const,
    lineHeight: 1.4,
  },
  // Case Status + Application Status share the same column width
  caseStatusCell: {
    width: "12.5%",
  },
  remarksCell: {
    width: "8%",
    whiteSpace: "normal" as const,
    lineHeight: 1.4,
  },
  applicationDateCell: {
    width: "7%",
  },
  applicationStatusCell: {
    width: "12.5%",
  },
  courtFeeCell: {
    width: "10%",
    whiteSpace: "normal" as const,
    lineHeight: 1.4,
  },
  actionsCell: {
    width: "14.5%",
    whiteSpace: "nowrap" as const,
    textAlign: "left" as const,
  },
  actionButtons: {
    display: "flex",
    flexWrap: "nowrap" as const,
    gap: "2px",
    justifyContent: "flex-start",
    alignItems: "center",
    whiteSpace: "nowrap" as const,
  },
  // Must stay in sync with the *Cell width values above (sum = 100%)
  columnWidths: [
    "3%",
    "3.5%",
    "8%",
    "7.5%",
    "13.5%",
    "12.5%",
    "8%",
    "7%",
    "12.5%",
    "10%",
    "14.5%",
  ] as const,
  blueIcon: {
    padding: "2px",
    color: "#0f1729",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "32px",
    width: "32px",
    height: "32px",
    flexShrink: 0,
    outline: "none",
    "&:hover": {
      backgroundColor: "#0f1729",
      color: "#fff",
      border: "none",
    },
    "&:focus": {
      outline: "2px solid #0f1729",
      outlineOffset: "2px",
      border: "none",
    },
    "&:focus:not(:hover)": {
      backgroundColor: "transparent",
      color: "#0f1729",
      boxShadow: "none",
      outline: "none",
    },
  },
  orangeIcon: {
    padding: "2px",
    backgroundColor: "transparent",
    color: COLORS.primary,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "32px",
    width: "32px",
    height: "32px",
    flexShrink: 0,
    outline: "none",
    "&:hover": {
      backgroundColor: "#b34d05",
      color: COLORS.white,
      border: "none",
    },
    "&:focus": {
      outline: `2px solid ${COLORS.primary}`,
      outlineOffset: "2px",
      border: "none",
    },
    "&:focus:not(:hover)": {
      backgroundColor: "transparent",
      color: COLORS.primary,
      boxShadow: "none",
      outline: "none",
    },
  },
  tableSection: {
    position: "relative" as const,
    width: "100%",
  },
  placeholderCell: {
    textAlign: "center" as const,
    padding: "32px",
  },
  remarksLink: {
    color: "#1976d2",
    cursor: "pointer",
    textDecoration: "underline",
  },
  actionIcon: {
    fontSize: "22px",
  },
  loadingOverlay: {
    position: "absolute" as const,
    inset: 0,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "32px",
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    pointerEvents: "none" as const,
    zIndex: 1,
  },
  recordsSummary: {
    mt: 1,
    fontSize: "14px",
    width: "100%",
    textAlign: "center" as const,
  },
  toolbar: {
    display: "flex",
    flexWrap: "wrap" as const,
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "16px",
  },
  filters: {
    display: "flex",
    flexWrap: "wrap" as const,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "12px",
    marginLeft: "auto",
  },
  statusFilter: {
    minWidth: { xs: "100%", sm: 200 },
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      "& fieldset": {
        borderRadius: "20px",
      },
    },
  },
};
