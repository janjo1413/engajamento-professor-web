import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid, TextField, Typography } from "@mui/material";
import DarkSwal from '../components/DarkSwal';
import api from "../services/api";
import { useQuizClass } from "../contexts/QuizClassContext";
import QuestionCard from "../components/QuestionCard";
import { ArrowBack, Save } from "@mui/icons-material";
import QuestionCardWithCheckbox from "../components/QuestionCardWithCheckbox";

export default function QuizEdit() {
    const { quizCode } = useQuizClass();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    const [quizName, setQuizName] = useState(null);
    const [description, setDescription] = useState(null);
    const [questions, setQuestions] = useState(null);

    const [questionsNotAdded, setQuestionsNotAdded] = useState([]);

    const fabBackStyle = {
        position: 'fixed',
        bottom: 50,
        right: 325,
        padding: 3
    };

    const fabSaveStyle = {
        position: 'fixed',
        bottom: 50,
        right: 175,
        padding: 3
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function getQuiz() {
            await api.post('/carregaQuestionario', JSON.stringify({ codigoQuestionario: quizCode }))
                .then(response => {
                    const selectedQuiz = response.data;

                    setQuizName(selectedQuiz.nome)
                    setDescription(selectedQuiz.descricao)
                    setQuestions(selectedQuiz.questoes)
                })
                .catch(error => {
                    console.error(error)
                    setError(true)

                    return DarkSwal.fire({
                        title: "Houve um erro",
                        text: "Não foi possível obter os dados do questionário",
                        icon: "error",
                        confirmButtonText: "Voltar"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate(-1); // Navigate back to the previous screen
                        }
                    });
                })
        }

        getQuiz();
    }, []);

    const openAddQuestionsModal = async () => {
        setOpen(true);

        await api.get('/getQuestoes').then(response => {
            console.log(response.data)

            setQuestionsNotAdded(response.data);
        })
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            {
                (!(quizName || description || questions) && !error) ? (
                    <CircularProgress />
                ) : (
                    error ? (
                        <> </>
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
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '25%' }}>
                                    <Typography variant="h5" component="div" sx={{ my: 3 }}>
                                        Questões:
                                    </Typography>

                                    <Button variant="text" onClick={() => openAddQuestionsModal()}>Adicionar</Button>
                                </Box>

                                {questions.map((item, index) => (
                                    <QuestionCard key={index} question={item.enunciado} subject={item.tema} answer={item.resposta} hasDelete={true} />
                                ))}
                            </Grid>

                            <Fab variant="extended" color="primary" aria-label="Salvar questionário" sx={fabBackStyle}
                                onClick={() => navigate(-1)}>
                                <ArrowBack sx={{ mr: 1 }} />
                                Voltar
                            </Fab>

                            <Fab variant="extended" color="success" aria-label="Salvar questionário" sx={fabSaveStyle} >
                                <Save sx={{ mr: 1 }} />
                                Salvar
                            </Fab>
                        </Grid>
                    )
                )
            }

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        // beginQuiz();
                    },
                }}
            >
                <DialogTitle>Adicionar questões</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Selecione as questões que deseja adicionar
                    </DialogContentText>

                    {
                        questionsNotAdded.map((item, index) => (
                            <QuestionCardWithCheckbox key={index} question={item.enunciado} subject={item.tema} answer={item.resposta} />
                        ))}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit">Adicionar questões</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}