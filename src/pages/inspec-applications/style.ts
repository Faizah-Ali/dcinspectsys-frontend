export const styles = {
  mainContainer: {
    width: "100%",
    minHeight: "100vh",
    paddingTop: "20px", // Account for fixed header
    marginLeft: "50px",
    // padding: "20px",
    // backgroundColor: "#f5f5f5",
  },
  tableContainer: {
    width: "115%",
    padding: "20px",
  },
  tableHeading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "25px",
    marginTop: "50px",
    textAlign: "left" as const,
  },
  tableWrapper: {
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden" as const,
  },
  table: {
    // minWidth: "100%",
  },
  headerRow: {
    backgroundColor: "#f5f5f5",
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#000",
    borderBottom: "2px solid #ddd",
    padding: "12px 16px",
  },
  dataRow: {
    "&:nth-of-type(even)": {
      backgroundColor: "#fafafa",
    },
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
    textAlign: "center" as const,
  },
  dataCell: {
    fontSize: "14px",
    color: "#333",
    padding: "12px 16px",
    borderBottom: "1px solid #e0e0e0",
  },
  actionButtons: {
    display: "flex",
    gap: "8px",
  },
  printButton: {
    padding: "8px",
    color: "#0f1729",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "36px",
    height: "36px",
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
  assignButton: {
    padding: "8px",
    backgroundColor: "transparent",
    color: "#d15b06",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "36px",
    height: "36px",
    outline: "none",
    "&:hover": {
      backgroundColor: "#d15b06",
      color: "#fff",
      border: "none",
    },
    "&:focus": {
      outline: "2px solid #d15b06",
      outlineOffset: "2px",
      border: "none",
    },
    "&:focus:not(:hover)": {
      backgroundColor: "transparent",
      color: "#d15b06",
      boxShadow: "none",
      outline: "none",
    },
  },
  tableSection: {
    position: "relative" as const,
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
    fontSize: "18px",
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
    minWidth: { xs: "100%", sm: 220 },
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      "& fieldset": {
        borderRadius: "20px",
      },
    },
  },
};
