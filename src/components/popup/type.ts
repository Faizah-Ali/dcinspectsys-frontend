import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material";

export interface PopupProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  onBack?: () => void;
  maxWidth?: "xs" | "sm" | "md" | "lg";
  hideHeader?: boolean;
  /** Left-aligned title (modern inline header). Default keeps centered title. */
  titleAlign?: "center" | "left";
  paperSx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
}
