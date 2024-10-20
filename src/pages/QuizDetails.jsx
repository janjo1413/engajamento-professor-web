// QuizDetailScreen.js
import { useState, useEffect } from 'react';
import { Typography, Container, Grid, CircularProgress } from '@mui/material';
import api from '../services/api';
import { useQuizClass } from '../contexts/QuizClassContext';
import QuestionCard from '../components/QuestionCard';

export default function QuizDetails() {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const { quizCode } = useQuizClass();

    useEffect(() => {
        async function getQuiz() {
            await api.post('/carregaQuestionario', JSON.stringify({ codigoQuestionario: quizCode }))
                .then(response => {
                    setSelectedQuiz(response.data)
                })
                .catch(error => console.error(error))
        }

        getQuiz();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            {
                !selectedQuiz ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" component="div" sx={{ mb: 2 }}>
                                {selectedQuiz.nome}
                            </Typography>

                            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                                {selectedQuiz.descricao}
                            </Typography>

                            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                                Número de Questões: {selectedQuiz.questoes.length}
                            </Typography>
                        </Grid>

                        {selectedQuiz.questoes.map((item, index) => (
                            <QuestionCard key={index} question={item.enunciado} subject={item.tema} answer={item.resposta} />
                        ))}
                    </Grid>
                )
            }
        </Container>
    );
}