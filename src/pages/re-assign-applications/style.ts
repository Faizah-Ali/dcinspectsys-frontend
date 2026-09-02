import { COLORS } from "../../common/constants/colors";
import { RESPONSIVE_MAX } from "../../common/constants/breakpoints";
import { authenticatedMainContainer } from "../../components/layout/style";

export const styles = {
  mainContainer: authenticatedMainContainer,
  contentContainer: {
    width: "100%",
    maxWidth: "560px",
    margin: "0 auto",
    padding: "8px 0 0",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "left",
    transform: "translateX(-170px)",
    [`@media (max-width: ${RESPONSIVE_MAX}px)`]: {
      transform: "none",
    },
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "24px",
    marginTop: "8px",
    textAlign: "center" as const,
    width: "100%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
    width: "100%",
    padding: 0,
    margin: 0,
    alignItems: "center",
  },
  inputField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      "&:hover fieldset": {
        borderColor: COLORS.primary,
      },
      "&.Mui-focused fieldset": {
        borderColor: COLORS.primary,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: COLORS.primary,
    },
  },
  getDetailsButton: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "none" as const,
    borderRadius: "10px",
    alignSelf: "center",
    marginTop: "4px",
    "&:hover": {
      backgroundColor: "#b34d05",
    },
  },
};
