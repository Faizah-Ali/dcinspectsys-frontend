import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { Paths, VARIANTS } from "../../common/constants";
import { IMAGES } from "../../common/constants/images";
import type { AppDispatch, RootState } from "../../redux/store";

import {
  getUsernameHistory,
  handleChange,
  handleSubmit,
  initialLoginForm,
  USERNAME_SUGGESTIONS_LIST_ID,
} from "./helper";
import { styles } from "./style";
import type { LoginFormData, LoginFormErrors } from "./type";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isSubmitting = useSelector((state: RootState) => state.login.loading);

  const [formData, setFormData] = useState<LoginFormData>(initialLoginForm);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [usernameSuggestions] = useState<string[]>(() => getUsernameHistory());

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
              onSubmit={handleSubmit(
                formData,
                setErrors,
                dispatch,
                () => navigate(Paths.INSPECT_APPLICATIONS)
              )}
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
                      list={USERNAME_SUGGESTIONS_LIST_ID}
                      autoComplete="off"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange(
                        "username",
                        setFormData,
                        errors,
                        setErrors
                      )}
                      disabled={isSubmitting}
                      sx={{
                        ...styles.inputField,
                        ...styles.whiteInputField,
                        ...styles.usernameInputField,
                      }}
                    />
                    <Box
                      component="datalist"
                      id={USERNAME_SUGGESTIONS_LIST_ID}
                    >
                      {usernameSuggestions.map((username) => (
                        <Box
                          component="option"
                          key={username}
                          value={username}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={styles.errorSlot}>{errors.username ?? "\u00A0"}</Box>
                </Box>

                <Box sx={styles.fieldWrap}>
                  <Box sx={{ ...styles.inputGroup, ...styles.darkInput }}>
                    <Box component="label" htmlFor="password" sx={styles.inputLabel}>
                      Password
                    </Box>
                    <Box sx={styles.passwordFieldRow}>
                      <Box
                        component="input"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        type={formData.showPassword ? "text" : "password"}
                        autoComplete="off"
                        value={formData.password}
                        onChange={handleChange(
                          "password",
                          setFormData,
                          errors,
                          setErrors
                        )}
                        disabled={isSubmitting}
                        sx={{ ...styles.inputField, ...styles.darkInputField }}
                      />
                      <Box
                        component="button"
                        type="button"
                        title={
                          formData.showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        aria-label={
                          formData.showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        disabled={isSubmitting}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            showPassword: !prev.showPassword,
                          }));
                        }}
                        sx={styles.passwordToggleButton}
                      >
                        {formData.showPassword ? (
                          <IMAGES.VisibilityOffIcon
                            sx={styles.passwordToggleIcon}
                          />
                        ) : (
                          <IMAGES.VisibilityIcon
                            sx={styles.passwordToggleIcon}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={styles.errorSlot}>{errors.password ?? "\u00A0"}</Box>
                </Box>
              </Box>

              <Box
                component="label"
                htmlFor="rememberMe"
                sx={styles.rememberMeLabel}
              >
                <Box
                  component="input"
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange(
                    "rememberMe",
                    setFormData,
                    errors,
                    setErrors
                  )}
                  disabled={isSubmitting}
                  sx={styles.rememberMeCheckbox}
                />
                Remember me
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
            ©{new Date().getFullYear()} ·{" "}
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
