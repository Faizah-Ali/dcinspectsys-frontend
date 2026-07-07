import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";import "react-toastify/dist/ReactToastify.css";
import { styles } from "./style";
import { handleChange, handleSubmit } from "./helper";
import { IMAGES } from "../../common/constants/images";
import { Paths, VARIANTS } from "../../common/constants";
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

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };
  }, []);

  return (
    <Box
      sx={{
        ...styles.loginPage,
        "--login-bg": `url(${IMAGES.CourtBuilding})`,
      }}
    >
      <Box
        sx={{
          ...styles.loginCard,
          "--content-left-bg": `url(${IMAGES.DhcLogo})`,
        }}
      >
        <Box sx={styles.leftStrip} />

        <Box sx={styles.contentLeft}>
          <Box component="h1" sx={styles.contentLeftHeading}>
            Welcome to<br />
            Delhi High Court E-Inspection Portal
          </Box>
          <Box
            component="img"
            src={IMAGES.CourtBuilding}
            alt="Login Illustration"
            sx={styles.loginImg}
          />
        </Box>

        <Box sx={styles.contentRight}>
          <Box sx={styles.loginBox}>
            <Box component="h2" sx={styles.loginBoxHeading}>
              Login
            </Box>

            <Box
              component="form"
              sx={styles.loginForm}
              onSubmit={handleSubmit(formData, setErrors, setIsSubmitting, () => navigate(Paths.INSPECT_APPLICATIONS))}
            >
              <Box sx={styles.inputStack}>
                <Box sx={styles.fieldWrap}>
                  <Box sx={{ ...styles.inputGroup, ...styles.whiteInput }}>
                    <Box component="label" htmlFor="username" sx={styles.inputLabel}>
                      Username
                    </Box>
                    <Box
                      component="input"
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange("username", setFormData, errors, setErrors)}
                      disabled={isSubmitting}
                      sx={{ ...styles.inputField, ...styles.whiteInputField }}
                    />
                  </Box>
                  <Box sx={styles.errorSlot}>{errors.username ?? "\u00A0"}</Box>
                </Box>

                <Box sx={styles.fieldWrap}>
                  <Box sx={{ ...styles.inputGroup, ...styles.darkInput }}>
                    <Box component="label" htmlFor="password" sx={styles.inputLabel}>
                      Password
                    </Box>
                    <Box
                      component="input"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange("password", setFormData, errors, setErrors)}
                      disabled={isSubmitting}
                      sx={{ ...styles.inputField, ...styles.darkInputField }}
                    />
                  </Box>
                  <Box sx={styles.errorSlot}>{errors.password ?? "\u00A0"}</Box>
                </Box>
              </Box>

              <Button
                type="submit"
                variant={VARIANTS.CONTAINED}
                disabled={isSubmitting}
                sx={styles.loginButton}
              >
                {isSubmitting ? "Logging in..." : "LOGIN"}
              </Button>
            </Box>
          </Box>
          <Box component="p" sx={styles.copyright}>
            ©2026 ·{" "}
            <Box component="span" sx={styles.copyrightSpan}>
              Delhi High Court
            </Box>{" "}
            · All rights reserved
          </Box>
        </Box>
      </Box>

      <Box sx={styles.bottomPanel}>
        <Box component="h3" sx={styles.bottomPanelHeading}>
          ONLINE INSPECTION SYSTEM
        </Box>
        <Box sx={styles.yellowLine} />
      </Box>
    </Box>
  );
};

export default Login;
