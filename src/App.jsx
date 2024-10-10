import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import PersistentDrawerLeft from './components/PersistentDrawerLeft';
import { QuizClassProvider } from './contexts/QuizClassContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <QuizClassProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <PersistentDrawerLeft />
      </ThemeProvider>
    </QuizClassProvider>
  )
}
