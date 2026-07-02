import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { STATUS_FILTER_OPTIONS } from "../../common/constants/status";

interface StatusFilterProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  sx?: SxProps<Theme>;
}

const StatusFilter = ({
  label,
  value,
  onChange,
  sx,
}: StatusFilterProps) => {
  const handleClose = () => {
    requestAnimationFrame(() => {
      const active = document.activeElement;

      if (active instanceof HTMLElement) {
        active.blur();
      }
    });
  };

  return (
    <FormControl size="small" sx={sx}>
      <InputLabel id={`${label}-filter-label`} shrink>
        {label}
      </InputLabel>
      <Select
        labelId={`${label}-filter-label`}
        value={value}
        label={label}
        onChange={onChange}
        onClose={handleClose}
        displayEmpty
        renderValue={(selectedValue) => {
          const selectedOption = STATUS_FILTER_OPTIONS.find(
            (option) => option.value === selectedValue
          );

          return selectedOption?.label ?? "All";
        }}
      >
        {STATUS_FILTER_OPTIONS.map((option) => (
          <MenuItem key={option.value || "all"} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StatusFilter;
