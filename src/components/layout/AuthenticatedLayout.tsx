import { useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import Header from "../header";
import Sidebar from "../sidebar";
import type { SidebarProps } from "../sidebar/type";

type AuthenticatedLayoutProps = {
  children: ReactNode;
  userInfo: SidebarProps["userInfo"];
  activeRoute: string;
  onItemClick?: SidebarProps["onItemClick"];
};

const AuthenticatedLayout = ({
  children,
  userInfo,
  activeRoute,
  onItemClick,
}: AuthenticatedLayoutProps) => {
  const location = useLocation();
  const [isDrawerRequested, setIsDrawerRequested] = useState(false);
  const [drawerAnchorPath, setDrawerAnchorPath] = useState(location.pathname);

  // Drawer stays open only on the route where it was opened; navigating closes it
  // without a setState-in-effect when the pathname changes.
  const isDrawerOpen =
    isDrawerRequested && drawerAnchorPath === location.pathname;

  const openDrawer = () => {
    setDrawerAnchorPath(location.pathname);
    setIsDrawerRequested(true);
  };

  const closeDrawer = () => {
    setIsDrawerRequested(false);
  };

  return (
    <>
      <Header onMenuClick={openDrawer} />
      <Sidebar
        userInfo={userInfo}
        activeRoute={activeRoute}
        onItemClick={onItemClick}
        drawerOpen={isDrawerOpen}
        onDrawerClose={closeDrawer}
      />
      {children}
    </>
  );
};

export default AuthenticatedLayout;
