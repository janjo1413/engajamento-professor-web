import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, Grid, Button, Fab, Skeleton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ListItemIcon, ListItemText, List, ListItemButton, Alert, Snackbar, Box } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import ClassIcon from '@mui/icons-material/School';

import useQuizzes from '../hooks/useQuizzes';
import getRandomImage from '../utils/getRandomImage';
import useClasses from '../hooks/useClasses';

import { useQuizClass } from '../contexts/QuizClassContext';

const fabStyle = {
    position: 'absolute',
    bottom: 30,
    right: 30
};

const QuizCard = ({ quiz, onClick }) => {
    const randomImage = useMemo(() => getRandomImage('quiz'), []);

    return (
        <Grid item xs={3}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={randomImage}
                        alt={quiz.descricao}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {quiz.nome}
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {quiz.descricao}
                        </Typography>

                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <Button size="small" color="primary" onClick={onClick}>
                        Iniciar Quiz
                    </Button>
                </CardActions>
            </Card>
        </Grid>

    )
}

export default function Quizzes() {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    const { quizzes } = useQuizzes();
    const { classes } = useClasses();
    const { quiz, setQuiz, classRoom, setClassRoom } = useQuizClass();

    const navigate = useNavigate();

    const handleClickOpen = (quiz) => {
        setOpen(true);
        setClassRoom('');
        setQuiz(quiz);
    };

    const handleClose = () => {
        setOpen(false);
        setError(false);
        setClassRoom('');
    };

    const handleListItemClick = (event, classSelected) => {
        setClassRoom(classSelected);
    };

    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(false);
    }

    const beginQuiz = () => {
        if (classRoom === '') {
            setError(true);
            return;
        }

        setOpen(false);
        navigate(`/quiz?quizId=${quiz._id}&classId=${classRoom._id}`);
    }

    return (
        <Box m={2}>
            <h2>Meus Questionários</h2>

            <Grid container spacing={4}>

                {
                    quizzes ? (
                        quizzes.map(quiz => (
                            <QuizCard quiz={quiz} onClick={() => handleClickOpen(quiz)} key={quiz.codigo} />
                        ))) : (
                        <Grid container spacing={4} direction="row" sx={{ marginLeft: 2, marginTop: 4 }}>
                            <Grid item xs={3}>
                                <Skeleton variant="rectangular" width={300} height={200} />
                            </Grid>
                            <Grid item xs={3}>
                                <Skeleton variant="rectangular" width={300} height={200} />
                            </Grid>
                            <Grid item xs={3}>
                                <Skeleton variant="rectangular" width={300} height={200} />
                            </Grid>
                        </Grid>
                    )
                }

            </Grid>

            <Fab color="secondary" aria-label="novo quiz" sx={fabStyle} LinkComponent={Link} to='/quizzes/new'>
                <AddIcon />
            </Fab>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        beginQuiz();
                    },
                }}
            >
                <DialogTitle>Iniciar Questionário</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Selecione para qual turma iniciar o questionário
                    </DialogContentText>

                    <List>
                        {
                            classes?.map((classItem) => (
                                <ListItemButton
                                    selected={classRoom.codigo === classItem.codigo}
                                    onClick={(event) => handleListItemClick(event, classItem)}
                                    key={classItem._id}
                                >
                                    <ListItemIcon>
                                        <ClassIcon />
                                    </ListItemIcon>

                                    <ListItemText primary={classItem.nome} />

                                </ListItemButton>

                            ))
                        }

                    </List>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit">Aplicar questionário</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={error} autoHideDuration={3000} onClose={handleCloseMessage}
            anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
                <Alert
                    onClose={handleCloseMessage}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Selecione uma turma para continuar
                </Alert>
            </Snackbar>

        </Box>
    )
}