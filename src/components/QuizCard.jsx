import { useMemo } from "react";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import getRandomImage from "../utils/getRandomImage";

const QuizCard = ({ quiz, onMainClick, onSecondaryClick }) => {
    const randomImage = useMemo(() => getRandomImage('quiz'), []);

    return (
        <Grid item xs={3}>
            <Card>
                <CardActionArea onClick={onSecondaryClick}>
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
                    <Button size="small" color="primary" onClick={onMainClick}>
                        Iniciar Questionário
                    </Button>
                </CardActions>
            </Card>
        </Grid>

    )
}

export default QuizCard;