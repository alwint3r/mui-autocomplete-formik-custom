import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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

  return (
    <Autocomplete
      id="my-autocomplete"
      options={options}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => {
        return (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </li>
        );
      }}
      renderInput={(params) => {
        return <TextField {...params} label={label} variant="standard" />;
      }}
      disableCloseOnSelect
      multiple
    />
  );
}

export default MyAutocomplete;
