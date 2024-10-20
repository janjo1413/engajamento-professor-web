import { Alert, Box, Button, Container, FormControl, FormLabel, Grid, OutlinedInput, Snackbar } from "@mui/material";
import { Save } from '@mui/icons-material';
import { useState } from "react";
import { read, utils } from 'xlsx';
import QuestionCard from "../components/QuestionCard";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function NewQuiz() {
    const [quizName, setQuizName] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [quizData, setQuizData] = useState(null);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    
    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(false);
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const workbook = read(event.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const sheetData = utils.sheet_to_json(sheet, { header: 1 });

            setQuizData(sheetData);
        };

        reader.readAsBinaryString(file);
    };


    const saveQuiz = async () => {
        if(!quizName || !quizDescription || !quizData){
            setError(true);
            return;
        }

        const savedQuestions = quizData.map(question => {
            return {
                enunciado: question[0],
                resposta: question[1],
                tema: question[2]
            };
        });


        await api.post('/cadastraQuestionario', JSON.stringify({
            questionario: {
                nome: quizName,
                descricao: quizDescription,
                questoes: savedQuestions
            }
        }))
            .then(function (response) {
                setSuccess(true);

                setQuizName('');
                setQuizDescription('');
                setQuizData(null);

                navigate('/');
            })
            .catch(function (error) {
                console.error(error);
            });
    }


    return (
        <div>
            <h2>Novo questionário</h2>

            <Grid container direction="column" spacing={3}>
                <Grid item xs={4}>
                    <FormControl>
                        <FormLabel htmlFor="quiz">Nome do questionário</FormLabel>
                        <OutlinedInput
                            id="quiz"
                            name="quiz"
                            type="quiz"
                            placeholder="Nome do questionário"
                            aria-describedby="Nome do questionário"
                            required
                            size="medium"
                            value={quizName}
                            onChange={(event) => {
                                setQuizName(event.target.value);
                            }}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl>
                        <FormLabel htmlFor="description">Descrição</FormLabel>
                        <OutlinedInput
                            id="description"
                            name="description"
                            type="description"
                            placeholder="Descrição do questionário"
                            aria-describedby="nome-da-turma"
                            required
                            size="medium"
                            value={quizDescription}
                            onChange={(event) => {
                                setQuizDescription(event.target.value);
                            }}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <input
                        type="file"
                        accept=".xls, .xlsx, .ods, .csv"
                        onChange={handleFileUpload} />

                    {quizData && (
                        <Container sx={{ my: 4 }}>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '35%' }}>
                                <h2>Dados do questionário:</h2>
                                {
                                    visible ? (
                                        <Button variant="text" onClick={() => setVisible(!visible)}>Ocultar</Button>
                                    ) : (
                                        <Button variant="text" onClick={() => setVisible(!visible)}>Ver</Button>

                                    )
                                }
                            </Box>

                            {
                                visible && (
                                    <>
                                        <h3>Número de questões: {quizData.length}</h3>
                                        <Grid container spacing={4}>

                                            {quizData.map((item, index) => (
                                                <QuestionCard key={index} question={item[0]} answer={item[1]} subject={item[2]} />
                                            ))}

                                        </Grid>
                                    </>
                                )
                            }

                        </Container>
                    )}
                </Grid>

                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={saveQuiz}>
                        Salvar Questionário
                    </Button>
                </Grid>
            </Grid>

            <Snackbar open={error} autoHideDuration={3000} onClose={handleCloseMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert
                    onClose={handleCloseMessage}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Nome, descrição e questões são obrigatórios
                </Alert>
            </Snackbar>

            <Snackbar open={success} autoHideDuration={3000} onClose={handleCloseMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert
                    onClose={handleCloseMessage}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Questionário cadastrado com sucesso
                </Alert>
            </Snackbar>

        </div>
    )
}
