import { COLORS } from "../../common/constants/colors";
import { authenticatedMainContainer } from "../../components/layout/style";

export const styles = {
  mainContainer: authenticatedMainContainer,
  contentContainer: {
    width: "100%",
    maxWidth: "560px",
    margin: "0 auto",
    padding: "20px 0",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "stretch",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "24px",
    marginTop: "40px",
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
  messageField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      alignItems: "flex-start",
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
  actionButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "4px",
    flexWrap: "wrap" as const,
    width: "100%",
    justifyContent: "flex-start",
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "none" as const,
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#b34d05",
    },
  },
  resetButton: {
    color: COLORS.primary,
    borderColor: COLORS.primary,
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "none" as const,
    borderRadius: "10px",
    "&:hover": {
      borderColor: "#b34d05",
      backgroundColor: "rgba(209, 91, 6, 0.08)",
    },
  },
};
