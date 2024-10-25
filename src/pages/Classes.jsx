import { Grid, Skeleton, Box, Typography } from '@mui/material';
import useClasses from '../hooks/useClasses';
import ClassCard from '../components/ClassCard';

export default function Classes() {
    const { classes } = useClasses();

    if (!classes) {
        return (
            <Box m={2}>
                <Typography variant="h4" sx={{ my: 4 }}>Carregando turmas...</Typography>

                <Grid container spacing={4}>
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
            </Box>
        );
    }



    return (
        <Box m={2}>
            <Typography variant="h4" sx={{ my: 4 }}>Minhas turmas</Typography>

            <Grid container spacing={4}>
                {classes.length > 0 ? (
                    classes.map(classObject => (
                        <ClassCard classroom={classObject} key={classObject._id} />
                    ))
                ) : (
                    <Typography variant="h6">Nenhuma turma encontrada.</Typography>
                )}
            </Grid>

            {/* <Fab color="secondary" aria-label="novo quiz" sx={fabStyle} LinkComponent={Link} to='/classes/new'>
                <AddIcon />
            </Fab> */}
        </Box>
    )
}