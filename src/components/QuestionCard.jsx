import { useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Container, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function QuestionCard({ question, subject, answer, hasDelete = false, onRemove = null }) {
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);

    return (
        <Grid item xs={12}>
            <Card sx={{ mb: 4, height: '100%' }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" component="div">
                            Assunto: {subject}
                        </Typography>

                        <Typography variant="h6" component="div" sx={{ my: 2 }}>
                            {question}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h6" component="div">
                                Resposta:
                            </Typography>

                            {isAnswerVisible ? (
                                answer === 'V' ? (
                                    <Typography variant="h6" component="div" sx={{ marginLeft: 4, textAlign: 'center' }}
                                        onClick={() => setIsAnswerVisible(!isAnswerVisible)}
                                    >
                                        Verdadeiro
                                    </Typography>
                                ) : (
                                    <Typography variant="h6" component="div" sx={{ marginLeft: 4, textAlign: 'center' }}
                                        onClick={() => setIsAnswerVisible(!isAnswerVisible)}
                                    >
                                        Falso
                                    </Typography>
                                )
                            ) : (
                                <div style={{ height: 30, backgroundColor: 'gray', borderRadius: 10, width: '10vw', marginLeft: 10 }}
                                    onClick={() => setIsAnswerVisible(!isAnswerVisible)} />
                            )}
                        </Box>
                    </Container>

                    {
                        hasDelete && (
                            <Container sx={{ flexBasis: '10%'}}>
                                <IconButton color="error" aria-label="Remover questão" onClick={onRemove}>
                                    <Close />
                                </IconButton>
                            </Container>
                        )
                    }

                </CardContent>
            </Card>
        </Grid>
    );
}