import { Box, Card, CardContent } from "@mui/material";
import { jediKnights } from "./dummy_data";
import MyAutocomplete from "./MyAutocomplete";

function App() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ width: 400 }}>
        <CardContent>
          <MyAutocomplete options={jediKnights} label="Select Jedi Knights" />
        </CardContent>
      </Card>
    </Box>
  );
}

export default App;
