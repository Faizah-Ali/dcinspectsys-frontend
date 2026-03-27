import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { styles } from "./style";
import { handleChange, handleSubmit } from "./helper";
import { IMAGES } from "../../common/constants/images";
import { Paths } from "../../common/constants";
import type { LoginFormData, LoginFormErrors } from "./type";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Box sx={styles.container}>
      {/* Left Section - Court Building Image */}
      <Box sx={styles.leftSection}>
        <Box
          component="img"
          src={IMAGES.CourtBuilding}
          alt="Delhi High Court Building"
          sx={styles.buildingImage}
        />
      </Box>

      {/* Right Section - Login Form with Curved Border */}
      <Box sx={styles.rightSection}>
        <Box sx={styles.formContainer}>
          <Box component="h2" sx={styles.title}>
            Login
          </Box>
          <form onSubmit={handleSubmit(formData, setErrors, setFormData, setIsSubmitting, () => navigate(Paths.INSPECT_APPLICATIONS))}>
            <TextField
              label="Username"
              type="text"
              value={formData.username}
              onChange={handleChange("username", setFormData, errors, setErrors)}
              error={!!errors.username}
              helperText={errors.username}
              sx={styles.inputField}
              fullWidth
              disabled={isSubmitting}
            />
            <TextField
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange("password", setFormData, errors, setErrors)}
              error={!!errors.password}
              helperText={errors.password}
              sx={styles.inputField}
              fullWidth
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              variant="contained"
              sx={styles.loginButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
