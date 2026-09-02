export interface SidebarItem {
  text: string;
  route: string;
}

export interface SidebarProps {
  userInfo?: {
    name: string;
    loginTime: string;
  };
  activeRoute?: string;
  onItemClick?: (item: string) => void;
  /** Controlled open state for the responsive Drawer (< DESKTOP_MIN). */
  drawerOpen?: boolean;
  /** Close handler for the responsive Drawer. */
  onDrawerClose?: () => void;
}
