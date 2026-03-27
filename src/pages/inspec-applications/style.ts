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
    width: "100%",
    padding: "20px",
  },
  tableHeading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "40px",
    marginTop: "60px",
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
    "&:hover": {
      backgroundColor: "#0f1729",
      color: "#fff",
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
    "&:hover": {
      backgroundColor: "#d15b06",
      color: "#fff",
    },
  },
};
