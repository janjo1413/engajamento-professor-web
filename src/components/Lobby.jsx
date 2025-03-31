import { useEffect, useState } from "react";
import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardHeader,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    Typography
} from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';

import api from '../services/api';
import { useQuizClass } from '../contexts/QuizClassContext';
import getFirstNames from "../utils/getFirstNames";
import '../css/animation.css';
import StudentCard from "./StudentCard";

export default function Lobby({ onStartQuiz }) {
    const [classLoaded, setClassLoaded] = useState(false);
    const [quizLoaded, setQuizLoaded] = useState(false);
    const [connectedStudents, setConnectedStudents] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const [quizCode, setQuizCode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const { quiz, setQuiz, classRoom } = useQuizClass();

    useEffect(() => {
        const reset = async () => {
            await api.post('/conectaQuestionario', JSON.stringify({ valor: false }))
                .then((response) => { console.log(response.data) })
                .catch((error) => { console.error(error) });
        };

        const getQuizCode = async () => {
            await api.get('/gerarCodigo').then(response => setQuizCode(response.data));
        };

        const loadQuiz = async () => {
            await api.post('/carregaQuestionario', JSON.stringify({ codigoQuestionario: quiz.codigo }))
                .then(response => {
                    setQuiz(response.data);
                    setQuizLoaded(true);
                })
                .catch(error => {
                    console.error(error);
                });
        };

        const loadClass = async () => {
            await api.post('/carregaTurma', JSON.stringify({ codigoTurma: classRoom.codigo }))
                .then(response => {
                    setClassLoaded(true);
                })
                .catch(error => {
                    console.error(error);
                });
        };

        reset();
        loadQuiz();
        loadClass();
        getQuizCode();
    }, []);

    useEffect(() => {
        if (!classLoaded || !quizLoaded) return;

        const getConnectedStudents = async () => {
            await api.get('/alunosConectados')
                .then(response => {
                    setConnectedStudents(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        };

        const id = setInterval(getConnectedStudents, 3000);
        setIntervalId(id);

        return () => clearInterval(id);
    }, [classLoaded, quizLoaded]);

    const liberarQuestionario = async () => {
        if (intervalId) clearInterval(intervalId);

        await api.post('/conectaQuestionario', JSON.stringify({ valor: true }))
            .then((response) => {
                console.log(response);
                onStartQuiz();
            })
            .catch((error) => { console.error(error) });
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Container sx={{ textAlign: 'center' }} >
            {
                isLoading ? (
                    <CircularProgress sx={{ mt: 4 }} />
                ) : (
                    <>
                        <Typography variant="h4" sx={{ my: 4 }}>Código do questionário:</Typography>
                        <Typography variant="h3">{quizCode}</Typography>
                    </>
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
                        <Box display="flex" alignItems="center" justifyContent="center" gap={2} sx={{ my: 4 }}>
                            <Typography variant="h4">Alunos conectados</Typography>
                            <Badge
                                badgeContent={connectedStudents.length}
                                color="primary"
                                showZero
                                sx={{ '& .MuiBadge-badge': { fontSize: '1rem', height: 24, minWidth: 24 } }}
                            >
                                <GroupIcon fontSize="large" />
                            </Badge>
                        </Box>

                        <Grid container spacing={4} direction="row">
                            {
                                connectedStudents.map(student => (
                                    <StudentCard student={student} key={student.matricula} />
                                ))
                            }
                        </Grid>

                        <Button
                            sx={{ my: 4, mx: 'auto', width: '50%' }}
                            variant="contained"
                            onClick={liberarQuestionario}>
                            Iniciar questionário
                        </Button>
                    </>
                )
            }
        </Container >
    );
}
