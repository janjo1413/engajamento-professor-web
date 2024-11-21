import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid, Skeleton, TextField, Typography } from "@mui/material";
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
    const [questionsToAdd, setQuestionsToAdd] = useState([]);

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
        setQuestionsNotAdded([]);
    };

    const removeQuestion = (questionId) => {
        setQuestions((prevQuestions) => prevQuestions.filter(q => q._id !== questionId));
    };

    const handleCheck = (question) => {
        setQuestionsToAdd((prev) => [...prev, question]);
    };

    const handleUncheck = (questionId) => {
        setQuestionsToAdd((prev) => prev.filter((q) => q._id !== questionId));
    };

    const addQuestions = () => {
        const questionsAdded = questions.concat(questionsToAdd)
        setQuestions(questionsAdded);
        setOpen(false);
    }

    const updateQuiz = async () => {
        //se a descricao ta vazia ou se o n de questoes for zero, da mensagem de erro
        // if(description.length === 0 || questions.length === 0){
        // }

        const questionsToEdit = questions.map(question => ({
            enunciado: question.enunciado,
            resposta: question.resposta,
            tema: question.tema
        }));
        

        const body = {
            questionario: {
                nome: quizName,
                descricao: description,
                questoes: questionsToEdit
            }
        }

        // console.log(questionsToEdit);
        // console.log(body);
        // console.log(JSON.stringify(body))

        await api.post('/updateQuestionario', JSON.stringify(body))
        .then(response => {
            DarkSwal.fire({
                title: "Questionário editado com sucesso!",
                icon: "success"
            })

            navigate('/');
        })
        .catch(error => {
            DarkSwal.fire({
                tile: "Houve um erro!",
                title: "Não foi possível cadastrar o questionário!",
                icon: "error"
            })

            console.error(error)
        })

    }


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
            const allQuestions = response.data;

            const questionsNotIncluded = allQuestions.filter(item1 =>
                !questions.some(item2 => item1._id === item2._id)
            )

            setQuestionsNotAdded(questionsNotIncluded);
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
                                    <QuestionCard
                                        key={index}
                                        question={item.enunciado}
                                        subject={item.tema}
                                        answer={item.resposta}
                                        hasDelete={true}
                                        onRemove={() => removeQuestion(item._id)}
                                    />
                                ))}
                            </Grid>

                            <Fab variant="extended" color="primary" aria-label="Salvar questionário" sx={fabBackStyle}
                                onClick={() => navigate(-1)}>
                                <ArrowBack sx={{ mr: 1 }} />
                                Voltar
                            </Fab>

                            <Fab variant="extended" color="success" aria-label="Salvar questionário" sx={fabSaveStyle}
                            onClick={updateQuiz}>
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
                onSubmit={addQuestions}
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

                    {questionsNotAdded.length === 0 ? (
                        <>
                            <Skeleton variant="rectangular" width={500} height={225} sx={{ my: 2 }} />
                            <Skeleton variant="rectangular" width={500} height={225} sx={{ my: 2 }} />
                            <Skeleton variant="rectangular" width={500} height={225} sx={{ my: 2 }} />
                        </>
                    ) : (
                        questionsNotAdded.map((item, index) => (
                            <QuestionCardWithCheckbox
                                key={index}
                                question={item.enunciado}
                                subject={item.tema}
                                answer={item.resposta}
                                onCheck={() => handleCheck(item)}
                                onUncheck={() => handleUncheck(item._id)}
                            />
                        ))
                    )}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit">Adicionar questões</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}