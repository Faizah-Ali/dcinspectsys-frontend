import { useNavigate } from "react-router-dom";
import { Box, List, ListItem } from "@mui/material";
import { styles } from "./style";
import { getSidebarItems } from "./helper";
import type { SidebarProps } from "./type";
import { IMAGES } from "../../common/constants";
import {
  logout,
  getGroup,
  getLoginTime,
  getRole,
  getFullName,
  getUsername,
} from "../../utils/authSession.utils.ts";
import { store } from "../../redux/store.ts";
import { clearAuth } from "../../redux/auth.slice.ts";
import { useAppSelector } from "../../hooks/useAppSelector.ts";

const Sidebar = ({ userInfo, activeRoute, onItemClick }: SidebarProps) => {
  const navigate = useNavigate();
  const {
    role: reduxRole,
    group: reduxGroup,
    fullName: reduxFullName,
  } = useAppSelector((state) => state.auth);
  const role = reduxRole || getRole();
  const group = getGroup() || reduxGroup || "";
  const welcomeName =
    reduxFullName ||
    getFullName() ||
    userInfo?.name ||
    getUsername() ||
    "User";
  const sidebarItems = getSidebarItems(role, group);

  // Icon mapping for sidebar items
  const getIcon = (text: string) => {
    if (text === "Admin Inbox" || text === "Approver Inbox") {
      return <IMAGES.InboxIcon sx={styles.itemIcon} />;
    }
    if (text === "Pending Application") {
      return <IMAGES.PendingActionsIcon sx={styles.itemIcon} />;
    }
    if (text === "Re-Assign Application") {
      return <IMAGES.AssignmentIcon sx={styles.itemIcon} />;
    }
    // if (text === "Send Email") {
    //   return <IMAGES.MailIcon sx={styles.itemIcon} />;
    // }
    if (
      text === "Processed (Application Side)" ||
      text === "Processed (Original Side)" ||
      text === "Processed Application (Comp Side)"
    ) {
      return <IMAGES.TaskIcon sx={styles.itemIcon} />;
    }
    if (text === "Rejected Application") {
      return <IMAGES.RejectIcon sx={styles.itemIcon} />;
    }
    return <IMAGES.DescriptionIcon sx={styles.itemIcon} />;
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
          <Box sx={styles.userName}>Welcome {welcomeName}</Box>
          {role && <Box sx={styles.loginTime}>Role : {role}</Box>}
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
          <IMAGES.LogoutIcon sx={styles.itemIcon} />
          Logout
        </ListItem>
      </Box>
    </Box>
  );
};

export default Sidebar;
