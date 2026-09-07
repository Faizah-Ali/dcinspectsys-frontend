import { COLORS } from "../../common/constants/colors";

export const styles = {
  banner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg, rgba(15, 23, 41, 0.04) 0%, rgba(209, 91, 6, 0.06) 100%)",
    border: "1px solid rgba(15, 23, 41, 0.08)",
    boxSizing: "border-box" as const,
  },
  text: {
    margin: 0,
    color: COLORS.sidebarBg,
    fontSize: "15px",
    fontWeight: 700,
    letterSpacing: "0.02em",
    textAlign: "center" as const,
  },
} as const;
