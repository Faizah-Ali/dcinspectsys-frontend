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
  headerInline: {
    minHeight: "56px",
    padding: "12px 16px 12px 12px",
    gap: "4px",
    backgroundColor: COLORS.sidebarBg,
    borderBottom: "none",
  },
  titleWrap: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  titleWrapInline: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    minWidth: 0,
  },
  title: {
    color: COLORS.sidebarBg,
    fontSize: "22px",
    fontWeight: 700,
    textAlign: "center" as const,
  },
  titleInline: {
    margin: 0,
    color: COLORS.white,
    fontSize: "18px",
    fontWeight: 600,
    letterSpacing: "0.01em",
    textAlign: "left" as const,
    lineHeight: 1.3,
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
  iconButtonOnDark: {
    width: "40px",
    height: "40px",
    color: COLORS.white,
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.12)",
      color: COLORS.white,
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
