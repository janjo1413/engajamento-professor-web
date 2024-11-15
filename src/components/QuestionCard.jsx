import { useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

export default function QuestionCard({ question, subject, answer }) {
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);

    return (
        <Grid item xs={12}>
            <Card sx={{ mb: 4, height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
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
                            onClick={() => setIsAnswerVisible(!isAnswerVisible)}/>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}