import { COLORS } from "../../common/constants";
import { MOBILE_MAX, RESPONSIVE_MAX } from "../../common/constants/breakpoints";

export const styles = {
  dialogPaper: {
    width: "100%",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 18px 45px rgba(15, 23, 41, 0.18)",
    backgroundColor: COLORS.white,
    [`@media (max-width: ${RESPONSIVE_MAX}px)`]: {
      maxHeight: "calc(100vh - 32px)",
      display: "flex",
      flexDirection: "column",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    minHeight: "64px",
    padding: "14px 18px",
    borderBottom: "1px solid rgba(15, 23, 41, 0.08)",
    [`@media (max-width: ${RESPONSIVE_MAX}px)`]: {
      flexShrink: 0,
    },
  },
  titleWrap: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  title: {
    color: COLORS.sidebarBg,
    fontSize: "22px",
    fontWeight: 700,
    textAlign: "center" as const,
  },
  iconButton: {
    width: "40px",
    height: "40px",
    color: COLORS.sidebarBg,
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: COLORS.primary,
      color: "#ffffff",
    },
  },
  iconPlaceholder: {
    width: "40px",
    height: "40px",
    flexShrink: 0,
  },
  content: {
    padding: "24px 28px 28px",
    [`@media (max-width: ${RESPONSIVE_MAX}px)`]: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      overflowX: "hidden",
    },
    [`@media (max-width: ${MOBILE_MAX}px)`]: {
      padding: "16px",
    },
  },
  contentNoHeader: {
    padding: "28px 24px 24px",
    [`@media (max-width: ${RESPONSIVE_MAX}px)`]: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      overflowX: "hidden",
    },
    [`@media (max-width: ${MOBILE_MAX}px)`]: {
      padding: "16px",
    },
  },
} as const;
