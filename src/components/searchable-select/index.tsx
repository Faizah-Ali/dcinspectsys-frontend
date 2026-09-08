import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { styles } from "./style";
import type { SearchableSelectOption, SearchableSelectProps } from "./type";

const SearchableSelect = ({
  id,
  value,
  options,
  onChange,
  placeholder = "Select",
  disabled = false,
  loading = false,
  clearable = true,
  fullWidth = true,
  size = "medium",
  noOptionsText = "No options found",
  label,
  sx,
  onClose,
}: SearchableSelectProps) => {
  const selectedOption =
    options.find((option) => option.value === value) ?? null;

  return (
    <Autocomplete
      id={id}
      fullWidth={fullWidth}
      size={size}
      options={options}
      value={selectedOption}
      loading={loading}
      disabled={disabled}
      disableClearable={!clearable}
      blurOnSelect
      clearOnEscape={clearable}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, selected) => option.value === selected.value}
      filterOptions={(opts, state) => {
        const query = state.inputValue.trim().toLowerCase();
        if (!query) {
          return opts;
        }

        return opts.filter(
          (option) =>
            option.label.toLowerCase().includes(query) ||
            option.value.toLowerCase().includes(query)
        );
      }}
      noOptionsText={loading ? "Loading..." : noOptionsText}
      onChange={(_event, option) => {
        onChange(option?.value ?? "");
      }}
      onClose={() => {
        onClose?.();
      }}
      slotProps={{
        paper: {
          sx: styles.paper,
        },
        listbox: {
          sx: styles.listbox,
        },
      }}
      sx={{ ...styles.root, ...sx }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={selectedOption ? undefined : placeholder}
          InputLabelProps={
            label
              ? {
                  ...params.InputLabelProps,
                  shrink: true,
                }
              : params.InputLabelProps
          }
          inputProps={{
            ...params.inputProps,
            "aria-label": label || placeholder,
          }}
          sx={{
            "& .MuiInputBase-input": {
              ...styles.input,
              ...(size === "small" ? styles.inputSmall : {}),
              ...(!selectedOption ? styles.placeholder : {}),
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={16} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        const { key, ...rest } = props as typeof props & { key?: string };
        return (
          <li key={key ?? option.value} {...rest}>
            {option.label}
          </li>
        );
      }}
    />
  );
};

export type { SearchableSelectOption, SearchableSelectProps };
export default SearchableSelect;
