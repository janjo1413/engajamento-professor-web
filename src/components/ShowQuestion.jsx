import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import api from '../services/api';
import { Button, CircularProgress, IconButton, Paper, Stack } from "@mui/material";
import { RemoveRedEye, VisibilityOff } from '@mui/icons-material';
import { useQuizClass } from '../contexts/QuizClassContext';
import ProgressBar from "./ProgressBar";

export default function ShowQuestion({ onFinishQuiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeIsOver, setTimeIsOver] = useState(false);
  const [key, setKey] = useState(0);
  const [visible, setVisible] = useState(false);

  const [showSpinner, setShowSpinner] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const { quiz } = useQuizClass();

  const liberarProximaQuestao = async () => {
    const result = await api.get('/liberaProximaQuestao');
    setVisible(false);
    setKey(prevKey => prevKey + 1);
    setTimeIsOver(false);
    setShowSpinner(false);
    setButtonEnabled(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  const finalizarQuestionario = async () => {
    const result = await api.get('/liberaProximaQuestao');
    onFinishQuiz();
  }

  const renderTime = ({ remainingTime }) => {
    return (
      <Typography variant="h4">{remainingTime}</Typography>
    );
  };

  useEffect(() => {
    if (timeIsOver) {
      setShowSpinner(true);
      setTimeout(() => {
        setShowSpinner(false);
        setButtonEnabled(true);
      }, 2000);
    }
  }, [timeIsOver]);

  return (
    <Stack spacing={4}
      sx={{
        mt: 4,
        justifyContent: "center",
        alignItems: "center",
      }}>

      {
        timeIsOver ? (
          <Typography variant="h5">Tempo esgotado</Typography>
        )
          : (
            <CountdownCircleTimer
              key={key}
              isPlaying
              duration={15}
              size={120}
              strokeWidth={6}
              colors={['#663399', '#93000a']}
              colorsTime={[15, 0]}
              onComplete={() => setTimeIsOver(true)}
            >
              {renderTime}
            </CountdownCircleTimer>

          )
      }

      <Typography variant="h5">Questão {currentQuestionIndex + 1} de {quiz.questoes.length}</Typography>
      <ProgressBar current={currentQuestionIndex + 1} target={quiz.questoes.length}/>

      <Typography variant="h5">{quiz.questoes[currentQuestionIndex].enunciado}</Typography>

      <Typography variant="h5">Responda <span style={{ color: '#1E90FF' }}>Verdadeiro</span> ou <span style={{ color: '#FF4500' }}>Falso</span></Typography>

      {timeIsOver && (
        <Stack spacing={4}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Typography variant="h5">Resposta correta</Typography>

          {
            visible ?
              <IconButton onClick={() => setVisible(!visible)} disabled={!timeIsOver}>
                <VisibilityOff />
              </IconButton>

              :

              <IconButton onClick={() => setVisible(!visible)} disabled={!timeIsOver}>
                <RemoveRedEye />
              </IconButton>

          }

          {
            visible ?
              (
                quiz.questoes[currentQuestionIndex].resposta === 'V' ?
                  <Typography variant='h4'>Verdadeiro</Typography>
                  :
                  <Typography variant='h4'>Falso</Typography>
              ) : (
                <Paper elevation={4} sx={{ p: 4, mx: 'auto', width: 200 }}></Paper>
              )
          }

          {
            showSpinner ? (
              <CircularProgress />
            ) : (
              currentQuestionIndex === quiz.questoes.length - 1 ? (
                <Button variant="contained" onClick={finalizarQuestionario} disabled={!buttonEnabled} sx={{ mt: 4 }}>
                  Finalizar questionário
                </Button>
              )
                : (
                  <Button variant="contained" onClick={liberarProximaQuestao} disabled={!buttonEnabled} sx={{ mt: 4 }}>
                    Próxima questão
                  </Button>
                )
            )
          }
        </Stack>
      )
      }
    </Stack>
  )
}