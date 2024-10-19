import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar } from '@mui/material';
import { Close } from '@mui/icons-material';

import Lobby from '../components/Lobby';
import ShowQuestion from '../components/ShowQuestion';
import Final from '../components/Final';
import api from '../services/api';

export default function QuizApply() {
  const navigate = useNavigate();

  const [quizStage, setQuizStage] = useState('lobby'); // 'lobby', 'question', 'podium'
  const [open, setOpen] = useState(false);

  const startQuiz = () => {
    setQuizStage('question');
  };

  const finishQuiz = () => {
    setQuizStage('final');
  };

  const finishApply = () => {
    setQuizStage('')
  }

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = async () => {
    await api.get('/limparEstado').then(response => {
      navigate('/');
    });
  }

  return (
    <Container>
      <Container style={{ display: 'flex', justifyContent: 'flex-end', width: '90%' }}>
        <IconButton aria-label='Cancelar questionário' color="error" size='large' onClick={handleClickOpen}>
          <Close sx={{ fontSize: '2.5rem' }} />
        </IconButton>
      </Container>

      {quizStage === 'lobby' && <Lobby onStartQuiz={startQuiz} />}

      {quizStage === 'question' && (<ShowQuestion onFinishQuiz={finishQuiz} />)}

      {quizStage === 'final' && <Final onFinishResults={finishApply} />}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Tem certeza?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cancelar aplicação do questionário?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não, continuar questionário</Button>
          <Button onClick={handleCancel} color="error">
            Sim, cancelar questionário
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};

