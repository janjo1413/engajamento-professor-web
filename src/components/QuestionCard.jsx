import { useState } from 'react';
import { Card, CardContent, Typography, Button, IconButton, Grid, Container } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function QuestionCard({ question, subject, answer }) {
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);

    return (
        <Grid item xs={6}>
            <Card sx={{ margin: 2, height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="h6" component="div">
                        {question}
                    </Typography>

                    <Typography variant="h6" component="div" sx={{ my: 2 }}>
                        Assunto: {subject}
                    </Typography>

                    <Container sx={{ textAlign: 'center' }}>
                        <Button variant="text" onClick={() => setIsAnswerVisible(!isAnswerVisible)} sx={{ mt: 2 }}>
                            {isAnswerVisible ? (
                                <IconButton aria-label="hide answer">
                                    <VisibilityOff />
                                </IconButton>
                            ) : (
                                <IconButton aria-label="show answer">
                                    <Visibility />
                                </IconButton>
                            )}
                        </Button>

                        {isAnswerVisible ? (
                            answer === 'V' ? (
                                <Typography variant="h6" component="div" sx={{ mt: 2, textAlign: 'center' }}>
                                    Verdadeiro
                                </Typography>
                            ) : (
                                <Typography variant="h6" component="div" sx={{ mt: 2, textAlign: 'center' }}>
                                    Falso
                                </Typography>
                            )
                        ) : (
                            <div style={{ height: 40, backgroundColor: 'gray', borderRadius: 10, marginTop: 10, width: '10vw', margin: 'auto' }} />
                        )}
                    </Container>
                </CardContent>
            </Card>
        </Grid>
    );
}