import { useNavigate } from "react-router-dom";
import { Box, List, ListItem } from "@mui/material";
import {
  Inbox as InboxIcon,
  Assignment as AssignmentIcon,
  Mail as MailIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { styles } from "./style";
import { sidebarItems } from "./helper";
import type { SidebarProps } from "./type";
import { logout, getLoginTime } from "../../utils/authSession.utils.ts";
import { store } from "../../redux/store.ts";
import { clearAuth } from "../../redux/auth.slice.ts";

const Sidebar = ({ userInfo, activeRoute, onItemClick }: SidebarProps) => {
  const navigate = useNavigate();
  // Icon mapping for sidebar items
  const getIcon = (text: string) => {
    if (text === "Received Applications") {
      return <InboxIcon sx={styles.itemIcon} />;
    }
    if (text === "Re-Assign Applications") {
      return <AssignmentIcon sx={styles.itemIcon} />;
    }
    if (text === "Send Mail") {
      return <MailIcon sx={styles.itemIcon} />;
    }
    return null;
  };

  // Check if item is active
  const isActive = (route: string) => {
    return activeRoute === route;
  };

  // Handle item click
  const handleItemClick = (text: string, route: string) => {
    if (onItemClick) {
      onItemClick(text);
    }
    // Navigate to the route
    navigate(route);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear Redux state
    store.dispatch(clearAuth());
    // Clear storage and reload
    logout();
  };

  return (
    <Box sx={styles.sideBar}>
      {/* User Info Section */}
      {userInfo && (
        <Box sx={styles.userInfoContainer}>
          <Box sx={styles.userName}>Welcome {userInfo.name}</Box>
          <Box sx={styles.loginTime}>
            Login At : {userInfo.loginTime || getLoginTime() || "Not available"}
          </Box>
        </Box>
      )}

      {/* Sidebar Items */}
      <List sx={styles.itemList}>
        {sidebarItems.map((item) => (
          <ListItem
            key={item.text}
            sx={{
              ...styles.sidebarItem,
              ...(isActive(item.route) ? styles.activeItem : {}),
            }}
            onClick={() => handleItemClick(item.text, item.route)}
          >
            {getIcon(item.text)}
            {item.text}
          </ListItem>
        ))}
      </List>

      <Box sx={styles.logoutContainer}>
        <ListItem onClick={handleLogout} sx={styles.logoutButton}>
          <LogoutIcon sx={styles.itemIcon} />
          Logout
        </ListItem>
      </Box>
    </Box>
  );
};

export default Sidebar;
