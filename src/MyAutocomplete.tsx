import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { SyntheticEvent, useCallback, useState } from "react";
import { SettingsSuggestOutlined } from "@mui/icons-material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type MyAutocompleteOption = {
  label: string;
  value: string;
};

type MyAutocompleteProps = {
  options: MyAutocompleteOption[];
  label: string;
};

function MyAutocomplete(props: MyAutocompleteProps) {
  const { options, label } = props;
  const [selectedItems, setSelectedItems] = useState<MyAutocompleteOption[]>(
    []
  );
  const isAllSelected = selectedItems.length === options.length;
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

        if (isSelectAllSelected) {
          setSelectedItems([...options]);
        } else {
          setSelectedItems(value);
        }
      } else {
        setSelectedItems([value]);
      }
    },
    []
  );

  return (
    <Autocomplete
      id="my-autocomplete"
      options={[{ value: "select-all", label: "Select All" }, ...options]}
      getOptionLabel={(option) => option.label}
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
        return <TextField {...params} label={label} variant="standard" />;
      }}
      value={selectedItems}
      onChange={handleChange}
      disableCloseOnSelect
      multiple
    />
  );
}

export default MyAutocomplete;
