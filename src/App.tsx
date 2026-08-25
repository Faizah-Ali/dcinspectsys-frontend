import { Provider } from 'react-redux';
import { store } from './redux/store';
import RoutesManager from './routes';
import Toast from './components/toast';
import './App.css';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, clearAuth } from "./redux/auth.slice";
import {
  getLoginState,
  getUsername,
  getFullName,
  getRole,
  getGroup,
  isSessionValid,
} from "./utils/authSession.utils";

function App() {
  return (
    <>
      <RoutesManager />
      <Toast />
    </>
  );
}

function AppWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = getLoginState();
    const username = getUsername();
    const fullName = getFullName();
    const role = getRole();
    const group = getGroup();
    const isValid = isSessionValid();

    if (isLoggedIn && isValid && username) {
      dispatch(
        setAuth({
          username,
          fullName: fullName || username,
          role,
          group,
          permissions: [],
        })
      );
    } else {
      dispatch(clearAuth());
    }
  }, [dispatch]);

  return <App />;
}

// ✅ ONLY THIS EXPORT
export default function Root() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}