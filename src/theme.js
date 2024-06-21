import { createTheme } from '@mui/material/styles';

// Couleurs de la charte graphique
const theme = createTheme({
  typography: {
    fontFamily: 'REEF BOLD, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#FFC107', // Jaune de la charte
    },
    secondary: {
      main: '#FFEB3B', // Jaune clair de la charte
    },
  },
});

export default theme;
