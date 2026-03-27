import { COLORS } from "../../common/constants/colors";
export const styles = {
  container: {
    height: "70vh",
    width: "60vw",
    display: "flex",
    paddingTop: "10px", // Account for fixed header
    backgroundColor: "#fff",
  },
  leftSection: {
    flex: 0.7, // Narrower left section (40%)
    position: "relative" as const,
    overflow: "hidden" as const,
  },
  buildingImage: {
    display: "flex",
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    position: "absolute" as const,
    top: 0,
    left: 0,
  },
  rightSection: {
    flex: 0.3, // Wider right section (60%)
    backgroundColor: COLORS.sidebarBg,
    display: "flex",
    alignItems: "center" as const,
    justifyContent: "center" as const,
    padding: "30px 50px", // Reduced vertical padding, increased horizontal
    position: "relative" as const,
  },
  formContainer: {
    width: "100%",
    maxWidth: "500px", // Increased width
    zIndex: 1,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "stretch" as const,
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "20px", // Reduced margin
    textAlign: "center" as const,
  },
  inputField: {
    width: "100%",
    marginBottom: "15px", // Reduced margin
    backgroundColor: "#fff",
    borderRadius: "10px",
    "& .MuiInputLabel-root.Mui-focused": {
      color: COLORS.textPrimary,
    },
    "& .MuiOutlinedInput-root fieldset": {
      borderColor: "#d0d0d0",
    },
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: COLORS.primary,
    },
  },
  loginButton: {
    width: "50%",
    padding: "10px", // Reduced padding
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "none" as const,
    marginTop: "5px", // Reduced margin
    backgroundColor: COLORS.primary, // Reddish-brown button
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "auto",
    "&:hover": {
      backgroundColor: "#b34d05",
    },
    "&:disabled": {
      backgroundColor: "#b34d05",
      opacity: 0.7,
    },
  },
};
