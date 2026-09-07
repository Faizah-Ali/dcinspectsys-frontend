import { COLORS } from "../../common/constants";
import { MOBILE_MAX } from "../../common/constants/breakpoints";

const styles = {
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    [`@media (max-width: ${MOBILE_MAX}px)`]: {
      flexDirection: "column" as const,
      alignItems: "stretch",
      gap: "12px",
    },
  },
  countContainer: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    [`@media (max-width: ${MOBILE_MAX}px)`]: {
      justifyContent: "center",
    },
  },
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 0,
    [`@media (max-width: ${MOBILE_MAX}px)`]: {
      width: "100%",
      overflowX: "auto" as const,
      WebkitOverflowScrolling: "touch",
      justifyContent: "flex-start",
    },
    "& button": {
      color: COLORS.textPrimary,
      "&:hover": {
        backgroundColor: "rgba(209, 91, 6, 0.12) !important",
        color: COLORS.primary,
      },
    },
    "& .MuiIconButton-root": {
      color: COLORS.textPrimary,
      "&:hover": {
        backgroundColor: "rgba(209, 91, 6, 0.12) !important",
        color: `${COLORS.primary} !important`,
      },
      "&.Mui-disabled": {
        color: "rgba(0, 0, 0, 0.26)",
      },
    },
    "& .Mui-selected": {
      border: `1px solid ${COLORS.primary}`,
      color: COLORS.textPrimary,
      backgroundColor: `transparent !important`,
      "&:hover": {
        backgroundColor: "rgba(209, 91, 6, 0.12) !important",
        color: COLORS.primary,
      },
    },
    "& .MuiTablePagination-root": {
      [`@media (max-width: ${MOBILE_MAX}px)`]: {
        width: "100%",
      },
    },
    "& .MuiTablePagination-toolbar": {
      [`@media (max-width: ${MOBILE_MAX}px)`]: {
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "4px",
        minHeight: "auto",
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    "& .MuiTablePagination-spacer": {
      [`@media (max-width: ${MOBILE_MAX}px)`]: {
        flex: "none",
      },
    },
  },
  count: {
    color: COLORS.textPrimary,
    marginRight: "10px",
    fontSize: "14px",
  },
  select: {
    height: "30px",
    marginLeft: "5px",
    color: COLORS.textPrimary,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(15, 23, 41, 0.2)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: `${COLORS.primary} !important`,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${COLORS.primary} !important`,
      borderWidth: "1.5px",
    },
    "&.Mui-focused .MuiSvgIcon-root": {
      color: COLORS.primary,
    },
    "&:hover .MuiSvgIcon-root": {
      color: COLORS.primary,
    },
  },
  selectMenu: {
    "& .MuiMenuItem-root:hover": {
      backgroundColor: "rgba(209, 91, 6, 0.08)",
    },
    "& .MuiMenuItem-root.Mui-selected": {
      backgroundColor: "rgba(209, 91, 6, 0.12) !important",
      color: COLORS.primary,
    },
    "& .MuiMenuItem-root.Mui-selected:hover": {
      backgroundColor: "rgba(209, 91, 6, 0.2) !important",
    },
    "& .MuiMenuItem-root.Mui-selected.Mui-focusVisible": {
      backgroundColor: "rgba(209, 91, 6, 0.12) !important",
    },
    "& .MuiMenuItem-root.Mui-focusVisible": {
      backgroundColor: "rgba(209, 91, 6, 0.08)",
    },
  },
  paginationInfo: {
    marginRight: "20px",
    color: COLORS.textPrimary,
  },
};

export default styles;
