import type { ReactNode } from "react";

export interface PopupProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onBack?: () => void;
  maxWidth?: "xs" | "sm" | "md" | "lg";
}
