import { COLORS } from "../../common/constants/colors";

export const styles = {
  mainContainer: {
    width: "100%",
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
    textAlign: "left" as const,
    width: "100%",
    display: "block",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
    width: "100%",
    maxWidth: "500px",
    padding: 0,
    marginTop: "20px",
    marginInlineStart: "-25px",
  },
  inputField: {
    "& .MuiOutlinedInput-root": {
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
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "#b34d05",
    },
  },
};
