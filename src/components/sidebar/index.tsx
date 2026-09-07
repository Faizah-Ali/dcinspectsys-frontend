import { useNavigate } from "react-router-dom";
import { Box, Drawer, List, ListItem, useMediaQuery } from "@mui/material";
import { styles } from "./style";
import { getSidebarItems } from "./helper";
import type { SidebarItem, SidebarProps } from "./type";
import { IMAGES } from "../../common/constants";
import { DESKTOP_MIN } from "../../common/constants/breakpoints";
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

const Sidebar = ({
  userInfo,
  activeRoute,
  onItemClick,
  drawerOpen = false,
  onDrawerClose,
}: SidebarProps) => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(`(min-width:${DESKTOP_MIN}px)`);
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
    if (
      text === "Processed (Application Side)" ||
      text === "Processed (Original Side)" ||
      text === "Processed Application (Comp Side)"
    ) {
      return (
        <Box
          component="img"
          src={IMAGES.ProcessedApplicationIcon}
          alt=""
          sx={styles.itemIconImage}
        />
      );
    }
    if (text === "Rejected Application") {
      return (
        <Box
          component="img"
          src={IMAGES.RejectedApplicationIcon}
          alt=""
          sx={styles.itemIconImage}
        />
      );
    }
    if (text === "PDF Portfolio Merger") {
      return (
        <Box
          component="img"
          src={IMAGES.PortfolioIcon}
          alt=""
          sx={styles.itemIconImage}
        />
      );
    }
    return <IMAGES.DescriptionIcon sx={styles.itemIcon} />;
  };

  const isActive = (route: string) => {
    return activeRoute === route;
  };

  const handleItemClick = (item: SidebarItem) => {
    if (onItemClick) {
      onItemClick(item.text);
    }

    if (item.external) {
      window.open(item.route, "_blank", "noopener,noreferrer");

      if (!isDesktop) {
        onDrawerClose?.();
      }

      return;
    }

    navigate(item.route);

    if (!isDesktop) {
      onDrawerClose?.();
    }
  };

  const handleLogout = () => {
    if (!isDesktop) {
      onDrawerClose?.();
    }
    store.dispatch(clearAuth());
    logout();
  };

  const navigationContent = (
    <>
      {userInfo && (
        <Box sx={styles.userInfoContainer}>
          <Box sx={styles.userName}>Welcome {welcomeName}</Box>
          {role && <Box sx={styles.loginTime}>Role : {role}</Box>}
          <Box sx={styles.loginTime}>
            Login At : {userInfo.loginTime || getLoginTime() || "Not available"}
          </Box>
        </Box>
      )}

      <List sx={styles.itemList}>
        {sidebarItems.map((item) => (
          <ListItem
            key={item.text}
            sx={{
              ...styles.sidebarItem,
              ...(isActive(item.route) ? styles.activeItem : {}),
            }}
            onClick={() => handleItemClick(item)}
          >
            {getIcon(item.text)}
            {item.text}
          </ListItem>
        ))}
      </List>

      <Box sx={styles.logoutContainer}>
        <ListItem onClick={handleLogout} sx={styles.logoutButton}>
          <Box
            component="img"
            src={IMAGES.LogoutIcon}
            alt=""
            sx={styles.itemIconImage}
          />
          Logout
        </ListItem>
      </Box>
    </>
  );

  if (isDesktop) {
    return <Box sx={styles.sideBar}>{navigationContent}</Box>;
  }

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={onDrawerClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: styles.drawerPaper }}
    >
      <Box sx={styles.drawerPanel} role="navigation" aria-label="Main navigation">
        {navigationContent}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
