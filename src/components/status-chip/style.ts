import type { SxProps, Theme } from "@mui/material";

// Fixed size for every status chip (Case + Application).
// Width sized to fit "Pending For Approval" / "Pending Approval" snugly.
const CHIP_HEIGHT = 33;
const CHIP_WIDTH = 140;

const baseChipSx: SxProps<Theme> = {
  width: CHIP_WIDTH,
  minWidth: CHIP_WIDTH,
  maxWidth: "100%",
  height: CHIP_HEIGHT,
  minHeight: CHIP_HEIGHT,
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: 500,
  justifyContent: "center",
  boxSizing: "border-box",
  "& .MuiChip-label": {
    display: "block",
    width: "100%",
    textAlign: "center",
    paddingLeft: "8px",
    paddingRight: "8px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: `${CHIP_HEIGHT - 2}px`,
  },
};

// Filled (Case Status): solid fill + white text.
export const filledChipSx = (color: string): SxProps<Theme> => ({
  ...baseChipSx,
  backgroundColor: color,
  color: "#FFFFFF",
  borderColor: color,
});

// Outlined (Application Status): transparent fill, colored text + border.
export const outlinedChipSx = (color: string): SxProps<Theme> => ({
  ...baseChipSx,
  backgroundColor: "transparent",
  color,
  borderColor: color,
});
