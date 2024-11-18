import { useEffect, useState } from "react";
import { CircularProgress, Container, Grid, TextField, Typography } from "@mui/material";
import api from "../services/api";
import { useQuizClass } from "../contexts/QuizClassContext";
import QuestionCard from "../components/QuestionCard";

export default function QuizEdit() {
    //const [selectedQuiz, setSelectedQuiz] = useState(null);
    const { quizCode } = useQuizClass();

    const [quizName, setQuizName] = useState(null);
    const [description, setDescription] = useState(null);
    const [questions, setQuestions] = useState(null);

    useEffect(() => {
        async function getQuiz() {
            await api.post('/carregaQuestionario', JSON.stringify({ codigoQuestionario: quizCode }))
                .then(response => {
                    const selectedQuiz = response.data;

                    setQuizName(selectedQuiz.nome)
                    setDescription(selectedQuiz.descricao)
                    setQuestions(selectedQuiz.questoes)
                })
                .catch(error => console.error(error))
        }

        getQuiz();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            {
                !(quizName || description || questions) ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" component="div" sx={{ mb: 2 }}>
                                {quizName}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="description"
                                label="Descrição do questionário"
                                variant="outlined"
                                required
                                fullWidth
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                                sx={{ width: '50%' }}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mb: 10 }}>
                            {questions.map((item, index) => (
                                <QuestionCard key={index} question={item.enunciado} subject={item.tema} answer={item.resposta} />
                            ))}
                        </Grid>
                    </Grid>
                )
            }
        </Container>
    )
}