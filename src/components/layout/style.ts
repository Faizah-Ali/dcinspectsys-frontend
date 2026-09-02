import { RESPONSIVE_MAX } from "../../common/constants/breakpoints";
import {
  CONTENT_OFFSET,
  CONTENT_PADDING_TOP,
  SIDEBAR_WIDTH,
} from "../../common/constants/layout";

/**
 * Shared authenticated page shell — desktop values match the pre-Phase-2 layout.
 * Below DESKTOP_MIN, content becomes full width (sidebar becomes a Drawer).
 */
export const authenticatedMainContainer = {
  width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
  minHeight: "100vh",
  // Clear fixed header (~100px)
  paddingTop: `${CONTENT_PADDING_TOP}px`,
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingBottom: "24px",
  marginLeft: `${CONTENT_OFFSET}px`,
  boxSizing: "border-box" as const,
  textAlign: "left" as const,
  overflowX: "hidden" as const,
  [`@media (max-width: ${RESPONSIVE_MAX}px)`]: {
    width: "100%",
    marginLeft: 0,
  },
} as const;
