import { COLORS } from "../../common/constants";

const styles = {
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
  },
  countContainer: {
    display: "flex",
    alignItems: "center",
  },
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& button": {
      color: COLORS.textPrimary,
    },
    "& .Mui-selected": {
      border: `1px solid ${COLORS.primary}`,
      color: COLORS.textPrimary,
      backgroundColor: `transparent !important`,
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
  },
  paginationInfo: {
    marginRight: "20px",
    color: COLORS.textPrimary,
  },
};

export default styles;
