import { useEffect, useState } from "react";
import { Avatar, Button, Card, CardHeader, CircularProgress, Container, Grid, Typography } from "@mui/material";
import api from '../services/api';
import { useQuizClass } from '../contexts/QuizClassContext';
import getFirstNames from "../utils/getFirstNames";
import '../css/animation.css';

const StudentCard = ({ student }) => {
    return (
        <Grid item xs={3}>
            <Card key={student.matricula}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="student">
                            {student.nome[0]}
                        </Avatar>
                    }
                    title={getFirstNames(student.nome)}
                    subheader={student.matricula}
                />
            </Card>
        </Grid>
    )
}

export default function Lobby({ onStartQuiz }) {
    const [classLoaded, setClassLoaded] = useState(false);
    const [quizLoaded, setQuizLoaded] = useState(false);
    const [connectedStudents, setConnectedStudents] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const [quizCode, setQuizCode] = useState(null);

    const { quiz, setQuiz, classRoom } = useQuizClass();

    useEffect(() => {
        const reset = async () => {
            await api.post('/conectaQuestionario', JSON.stringify({ valor: false }))
                .then((response) => { console.log(response.data) })
                .catch((error) => { console.error(error) })
            
            await api.get('/limparEstado').then(response => {});
        }

        const getQuizCode = async () => {
            await api.get('/gerarCodigo').then(response => setQuizCode(response.data))
        }

        const loadQuiz = async () => {
            await api.post('/carregaQuestionario', JSON.stringify({ codigoQuestionario: quiz.codigo }))
                .then(response => {
                    setQuiz(response.data);
                    setQuizLoaded(true)
                })
                .catch(error => {
                    console.error(error)
                })
        }

        const loadClass = async () => {
            await api.post('/carregaTurma', JSON.stringify({ codigoTurma: classRoom.codigo }))
                .then(response => {
                    setClassLoaded(true)
                })
                .catch(error => {
                    console.error(error)
                })
        }
        
        reset();
        loadQuiz();
        loadClass();
        getQuizCode();
    }, [])

    useEffect(() => {
        if (!classLoaded) return;
        if (!quizLoaded) return;

        const getConnectedStudents = async () => {
            await api.get('/alunosConectados')
                .then(response => {
                    setConnectedStudents(response.data);
                })
                .catch(error => {
                    console.error(error)
                })
        }

        const id = setInterval(getConnectedStudents, 3000);
        setIntervalId(id);

        return () => clearInterval(id);
    }, [classLoaded, quizLoaded]);

    const liberarQuestionario = async () => {
        if (intervalId) {
            clearInterval(intervalId);
        }

        await api.post('/conectaQuestionario', JSON.stringify({ valor: true }))
            .then((response) => {
                console.log(response)
                onStartQuiz();
            })
            .catch((error) => { console.error(error) });
    }

    return (
        <Container sx={{ textAlign: 'center' }} >
            {
                !quizCode ? (
                    <CircularProgress />
                )
                    : (
                        <Typography variant="h5" sx={{ my: 6, mr: 1 }}>
                            Código do questionário: <Typography variant="h4">{quizCode}</Typography>
                        </Typography>
                    )
            }

            {
                connectedStudents.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
                        <Typography variant="h4" sx={{ my: 6, mr: 1 }}>
                            Aguardando alunos
                        </Typography>
                        <div className="loading-dots"></div>
                    </div>
                ) : (
                    <>
                        <Typography variant="h4" sx={{ my: 4 }}>Alunos conectados</Typography>

                        <Grid container spacing={4} direction="row">
                            {
                                connectedStudents.map(student => (
                                    <StudentCard student={student} />
                                ))
                            }
                        </Grid>

                        <Button
                            sx={{ margin: '1rem auto', width: '50%' }}
                            variant="contained"
                            onClick={liberarQuestionario}>
                            Iniciar questionário
                        </Button>
                    </>
                )
            }
        </Container >
    )
}