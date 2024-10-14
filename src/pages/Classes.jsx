import { Link } from 'react-router-dom';
import { Grid, Fab, Skeleton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useClasses from '../hooks/useClasses';
import ClassCard from '../components/ClassCard';

const fabStyle = {
    position: 'absolute',
    bottom: 30,
    right: 30
};

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