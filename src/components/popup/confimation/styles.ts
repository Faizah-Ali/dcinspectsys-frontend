import { COLORS } from "../../../common/constants";

const styles = {
  popup: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    background: COLORS.white,
    padding: "8px 4px 4px",
  },
  message: {
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "24px",
    marginBottom: "28px",
    maxWidth: "100%",
    textAlign: "center" as const,
    color: COLORS.sidebarBg,
    marginTop: "8px",
  },
  logo: {
    height: "80px",
    width: "80px",
    marginBottom: "24px",
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    justifyContent: "center",
    flexWrap: "wrap" as const,
  },
  themeBtn: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontSize: "15px",
    fontWeight: 600,
    lineHeight: "20px",
    minWidth: "120px",
    padding: "10px 20px",
    textTransform: "none" as const,
    borderRadius: "8px",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#b34d05",
      boxShadow: "none",
    },
  },
  grayBtn: {
    color: COLORS.primary,
    borderColor: COLORS.primary,
    fontSize: "15px",
    fontWeight: 600,
    lineHeight: "20px",
    minWidth: "120px",
    padding: "10px 20px",
    textTransform: "none" as const,
    borderRadius: "8px",
    "&:hover": {
      borderColor: "#b34d05",
      backgroundColor: "rgba(209, 91, 6, 0.08)",
    },
  },
};

export default styles;
