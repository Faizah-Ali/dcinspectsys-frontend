import { COLORS } from "../../common/constants/colors";

export const styles = {
  mainContainer: {
    width: "calc(100% - 50px)",
    minHeight: "100vh",
    paddingTop: "20px",
    marginLeft: "50px",
  },
  contentContainer: {
    width: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "10px",
    marginTop: "60px",
    textAlign: "center",
    display: "block",
    alignSelf: "center",
    transform: "translateX(-40px)",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
    width: "500px",
    maxWidth: "100%",
    padding: 0,
    marginTop: "20px",
    marginInlineStart: "-25px",
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
    marginTop: "10px",
    flexWrap: "wrap" as const,
    width: "100%",
    justifyContent: "center",
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
