import { useMemo } from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import getRandomImage from "../utils/getRandomImage";

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

export default QuizCard;