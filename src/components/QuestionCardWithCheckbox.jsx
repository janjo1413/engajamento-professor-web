import { useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Container, Checkbox } from '@mui/material';

export default function QuestionCardWithCheckbox({ question, subject, answer }) {
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <Grid item xs={12}>
            <Card sx={{ mb: 2, height: '100%', cursor: 'pointer' }} onClick={handleCheckboxChange}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                    
                    <Container sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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

                            {
                                answer === 'V' ? (
                                    <Typography variant="h6" component="div" sx={{ marginLeft: 2, textAlign: 'center' }}
                                        onClick={() => setIsAnswerVisible(!isAnswerVisible)}
                                    >
                                        Verdadeiro
                                    </Typography>
                                ) : (
                                    <Typography variant="h6" component="div" sx={{ marginLeft: 2, textAlign: 'center' }}
                                        onClick={() => setIsAnswerVisible(!isAnswerVisible)}
                                    >
                                        Falso
                                    </Typography>
                                )
                            }
                        </Box>
                    </Container>
                </CardContent>
            </Card>
        </Grid>
    );
}