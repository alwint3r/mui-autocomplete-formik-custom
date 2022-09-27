import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
} from "@mui/material";
import { Form, Formik } from "formik";
import CustomAutocompleteField from "./CustomAutocompleteField";
import { jediKnights } from "./dummy_data";
import MyAutocomplete from "./MyAutocomplete";

function App() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <Card sx={{ width: 400 }}>
        <CardHeader title="Without Formik" />
        <CardContent>
          <MyAutocomplete
            options={jediKnights}
            label="Select Jedi Knights"
            onChange={(value) => {
              console.log(value);
            }}
          />
        </CardContent>
      </Card>
      <Box mt={2} />
      <Card sx={{ width: 400 }}>
        <CardHeader title="With Formik" />
        <CardContent>
          <Formik
            initialValues={{
              jedi_knights: [],
            }}
            validate={(values) => {
              const errors: any = {};
              if (values.jedi_knights.length < 1) {
                errors.jedi_knights = 'You must choose at least one knight';
              }

              return errors;
            }}
            onSubmit={(value, { setSubmitting, resetForm }) => {
              console.log(value);
              resetForm();
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <CustomAutocompleteField
                  autoCompleteProps={{
                    options: jediKnights,
                    label: "Choose Your Knights",
                  }}
                  name="jedi_knights"
                />
                {isSubmitting ? <LinearProgress /> : null}
                <Box mt={2} />
                <Button variant="contained" type="submit" color="primary">
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
}

export default App;
