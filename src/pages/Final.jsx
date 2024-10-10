import { Button, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Podium from "../components/Podium";

export default function Final({ onFinishResults }) {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        async function getPodium() {
            const id = setInterval(async () => {
                try {
                    const response = await api.get('/retornaPodio');
                    setStudents(response.data);
                } catch (error) {
                    console.error('Error making API call:', error);
                }
            }, 2000);

            setIntervalId(id);
        }

        getPodium();
    }, []);

    const handleEnd = () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        onFinishResults();
        navigate('/');
    };

    return (
        <Stack spacing={2} sx={{ alignItems: 'center', mt: 4 }}>
            <Typography variant="h5">Questionário finalizado</Typography>

            {
                students.length === 0 ? (
                    <Skeleton variant="rectangular" width={300} height={200} />
                ) : (
                    <Podium students={students} />
                )

            }

            <Button
                variant="contained"
                // sx={{ padding: 10 }}
                onClick={handleEnd}>
                Encerrar
            </Button>

        </Stack>
    )
}