import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { SyntheticEvent, useCallback } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export type MyAutocompleteOption = {
  label: string;
  value: string;
};

export type MyAutocompleteProps = {
  options: MyAutocompleteOption[];
  label: string;
  onChange: (value: MyAutocompleteOption | Array<MyAutocompleteOption>) => void;
  value?: MyAutocompleteOption | Array<MyAutocompleteOption>;
  error?: string;
};

function getValidValues(
  provided: MyAutocompleteOption | Array<MyAutocompleteOption>,
  options: Array<MyAutocompleteOption>
): Array<MyAutocompleteOption> {
  if (Array.isArray(provided)) {
    if (provided.length < 1) {
      return [];
    }

    const providedValues = provided.map((provided) => provided.value);
    const optionValues = options.map((option) => option.value);
    const validValues = providedValues.filter((provided) =>
      optionValues.includes(provided)
    );

    return validValues.map((value) => ({
      value,
      label: options.find((option) => option.value === value)?.label || value,
    }));
  }

  const optionValues = options.map((option) => option.value);
  if (optionValues.includes(provided.value)) {
    return [provided];
  }

  return [];
}

function MyAutocomplete(props: MyAutocompleteProps) {
  const { options, label, onChange, value, error } = props;
  const validValues = getValidValues(value || [], options);
  const isAllSelected = validValues.length === options.length;
  const handleChange = useCallback(
    (
      event: SyntheticEvent,
      value: MyAutocompleteOption | Array<MyAutocompleteOption>,
      reason: string
    ) => {
      if (Array.isArray(value)) {
        const selectAll = value.find(
          (selected) => selected.value === "select-all"
        );
        const isSelectAllSelected = selectAll !== undefined;
        const selectedItems = isSelectAllSelected ? [...options] : value;

        onChange(selectedItems);
      } else {
        onChange([value]);
      }
    },
    []
  );

  const renderedOptions: MyAutocompleteOption[] = [
    { value: "select-all", label: "Select All" },
    ...options,
  ];

  return (
    <Autocomplete
      id="my-autocomplete"
      options={renderedOptions}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderOption={(props, option, { selected }) => {
        const selectAllProps =
          option.value === "select-all" ? { checked: isAllSelected } : {};
        return (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
              {...selectAllProps}
            />
            {option.label}
          </li>
        );
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            error={!!error}
            helperText={error || ""}
            label={label}
            variant="standard"
          />
        );
      }}
      value={validValues}
      onChange={handleChange}
      disableCloseOnSelect
      multiple
    />
  );
}

export default MyAutocomplete;
