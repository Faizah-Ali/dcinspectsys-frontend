export interface SidebarProps {
  userInfo?: {
    name: string;
    loginTime: string;
  };
  activeRoute?: string;
  onItemClick?: (item: string) => void;
}
