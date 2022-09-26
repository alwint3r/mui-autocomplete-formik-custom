import { useField } from "formik";
import MyAutocomplete, { MyAutocompleteProps } from "./MyAutocomplete";

interface CustomAutocompleteFieldProps {
  autoCompleteProps: Omit<MyAutocompleteProps, "onChange" | "value">;
  name: string;
}

function CustomAutocompleteField(props: CustomAutocompleteFieldProps) {
  const { autoCompleteProps, name } = props;
  const [field, meta, helpers] = useField(name);

  return (
    <div>
      <MyAutocomplete
        value={field.value}
        onChange={(value) => helpers.setValue(value)}
        {...autoCompleteProps}
      />
    </div>
  );
}

export default CustomAutocompleteField;
