import { useMemo, useState } from "react";
import {
    Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Snackbar,
    Alert,
    Box,
} from "@mui/material";
import { Delete } from '@mui/icons-material';
import api from '../services/api';
import getRandomImage from "../utils/getRandomImage";

const QuizCard = ({ quiz, onMainClick, onSecondaryClick, onRefresh }) => {
    const randomImage = useMemo(() => getRandomImage('quiz'), []);
    const [open, setOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        await api.post('/deletarQuestionario', JSON.stringify({
            codigoQuestionario: quiz.codigo
        }))
            .then(response => {
                setDeleted(true);
                onRefresh();
            })
            .catch(error => {
                console.error(error);
            });
        handleClose();
    };

    return (
        <Grid item xs={3}>
            <Box sx={{ height: '100%' }}> 
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardActionArea onClick={onSecondaryClick}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={randomImage}
                        alt={quiz.descricao}
                        sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, overflow: 'auto' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {quiz.nome}
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {quiz.descricao}
                        </Typography>

                    </CardContent>
                </CardActionArea>

                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button color="primary" onClick={onMainClick}>
                        Iniciar Questionário
                    </Button>

                    <IconButton color="error" aria-label="Excluir questionário" onClick={handleClickOpen}>
                        <Delete />
                    </IconButton>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Excluir questionário"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Tem certeza que deseja excluir o questionário "{quiz.nome}"?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button onClick={handleDelete} color="error">
                                Excluir
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Snackbar open={deleted} autoHideDuration={3000}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            Questionário excluído com sucesso
                        </Alert>
                    </Snackbar>
                </CardActions>
            </Card>
            </Box>
        </Grid>

    )
}

export default QuizCard;