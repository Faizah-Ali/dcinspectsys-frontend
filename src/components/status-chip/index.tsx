import { Chip } from "@mui/material";

import { VARIANTS } from "../../common/constants";
import {
  getStatusColor,
  getStatusLabel,
  type StatusKind,
} from "../../common/constants/status";

import { filledChipSx, outlinedChipSx } from "./style";

interface StatusChipProps {
  statusCode?: string | null;
  kind?: StatusKind;
  variant?: typeof VARIANTS.OUTLINED | typeof VARIANTS.FILLED;
  size?: "small" | "medium";
}

const StatusChip = ({
  statusCode,
  kind = "application",
  variant = VARIANTS.OUTLINED,
  size = "small",
}: StatusChipProps) => {
  const label = getStatusLabel(statusCode, kind);
  const color = getStatusColor(label, kind);

  // MUI's `color` prop only accepts theme palette keys, so we drive the
  // brand hex through `sx` and let `variant` control fill vs. outline.
  const chipSx =
    variant === VARIANTS.FILLED ? filledChipSx(color) : outlinedChipSx(color);

  return (
    <Chip
      label={label}
      title={label}
      variant={variant}
      size={size}
      sx={chipSx}
    />
  );
};

export default StatusChip;
