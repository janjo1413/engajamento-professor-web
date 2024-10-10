import { Card, CardContent, CardMedia, CardActionArea, Typography, Grid, Fab, Skeleton, Box, Button, CardActions } from '@mui/material';
import { useMemo } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';

import useClasses from '../hooks/useClasses';
import getRandomImage from '../utils/getRandomImage';

const fabStyle = {
    position: 'absolute',
    bottom: 30,
    right: 30
};


const ClassCard = ({ classroom }) => {
    const randomImage = useMemo(() => getRandomImage('class'), []);

    return (
        <Grid item xs={3} >
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={randomImage}
                        alt={classroom.nome}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {classroom.nome}
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {classroom.periodo}
                        </Typography>

                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <Button size="small" color="primary" component={Link} to='/lobby'>
                        Questionário para esta turma
                    </Button>
                </CardActions>

            </Card>
        </Grid>
    )
}

export default function Classes() {
    const { classes } = useClasses();

    return (
        <Box m={2}>
            <h2>Minhas turmas</h2>

            <Grid container spacing={4}>

                {
                    classes ? (

                        classes.map(classObject => (
                            <ClassCard classroom={classObject} key={classObject._id} />
                        )))
                        : (
                            <Grid container spacing={2} direction="row" sx={{ marginLeft: 2, marginTop: 4 }}>
                                <Grid item xs={3}>
                                    <Skeleton variant="rectangular" width={300} height={200} />
                                </Grid>
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

            <Fab color="secondary" aria-label="novo quiz" sx={fabStyle} LinkComponent={Link} to='/classes/new'>
                <AddIcon />
            </Fab>
        </Box>
    )
}