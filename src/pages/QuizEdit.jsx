import { useEffect, useState } from "react";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import api from "../services/api";
import { useQuizClass } from "../contexts/QuizClassContext";

export default function QuizEdit() {
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
                        </Grid>
                    </Grid>
                )
            }
        </Container>
    )
}