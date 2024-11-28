import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PersistentDrawerLeft from './components/PersistentDrawerLeft';
import { QuizClassProvider } from './contexts/QuizClassContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <QuizClassProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <PersistentDrawerLeft />
        </ThemeProvider>
      </QuizClassProvider>
    </DndProvider>
  )
}
