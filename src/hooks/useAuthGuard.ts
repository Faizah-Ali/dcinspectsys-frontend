import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./useAppSelector";
import { isSessionValid, logout } from "../utils/authSession.utils";
import { Paths } from "../common/constants";

const useAuthGuard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !isSessionValid()) {
      logout("Session expired. Please login again.");
      navigate(Paths.LOGIN);
    }
  }, [isAuthenticated, navigate]);
};

export default useAuthGuard;