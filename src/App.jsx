import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QuizClassProvider } from './contexts/QuizClassContext';

import { Routes, Route, Navigate } from "react-router-dom";

// Páginas públicas
import Login from "./pages/Login";
import QuizApply from "./pages/QuizApply";

// Páginas internas
import Quizzes from "./pages/Quizzes";
import NewQuiz from "./pages/NewQuiz";
import QuizDetails from "./pages/QuizDetails";
import QuizEdit from "./pages/QuizEdit";
import Classes from "./pages/Classes";
import NewClass from "./pages/NewClass";
import ClassDetails from "./pages/ClassDetails";

// Layout com Drawer
import PersistentDrawerLeft from "./components/PersistentDrawerLeft";

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

          <Routes>
            {/* Redireciona a rota raiz para /login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* ROTA PÚBLICA - fora do layout principal */}
            <Route path="/login" element={<Login />} />
            <Route path="/quiz" element={<QuizApply />} />

            {/* ROTAS INTERNAS - com menu lateral */}
            <Route element={<PersistentDrawerLeft />}>
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/quizzes/new" element={<NewQuiz />} />
              <Route path="/quizzes/:quizCode" element={<QuizDetails />} />
              <Route path="/quizzes/:quizCode/edit" element={<QuizEdit />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/classes/new" element={<NewClass />} />
              <Route path="/classes/:classCode" element={<ClassDetails />} />
            </Route>
          </Routes>

        </ThemeProvider>
      </QuizClassProvider>
    </DndProvider>
  );
}
