import { Stack } from '@mui/material';
import './App.css';
import CustomFormBuilder from './CustomFormBuilder';
const cardStyle = {
  backgroundColor: '#d0d9e8', // Bluish-grey color
  padding: '20px',
  borderRadius: '8px',
};
function App() {
  return (
    <Stack style={cardStyle}>
      <CustomFormBuilder />
    </Stack>
  );
}

export default App;
