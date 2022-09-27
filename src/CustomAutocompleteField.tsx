import { useField } from "formik";
import MyAutocomplete, {
  MyAutocompleteOption,
  MyAutocompleteProps,
} from "./MyAutocomplete";

interface CustomAutocompleteFieldProps {
  autoCompleteProps: Omit<MyAutocompleteProps, "onChange" | "value" | "error">;
  name: string;
}

function CustomAutocompleteField(props: CustomAutocompleteFieldProps) {
  const { autoCompleteProps, name } = props;
  const [field, meta, helpers] = useField(name);

  function handleChange(value: MyAutocompleteOption | MyAutocompleteOption[]) {
    if (Array.isArray(value)) {
      helpers.setValue(value);
    } else {
      helpers.setValue([value]);
    }
  }

  return (
    <div>
      <MyAutocomplete
        value={field.value}
        onChange={handleChange}
        error={meta.error}
        {...autoCompleteProps}
      />
    </div>
  );
}

export default CustomAutocompleteField;
