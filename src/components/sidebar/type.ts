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
}
