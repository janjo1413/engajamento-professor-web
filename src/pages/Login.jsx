import { Box, Container, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";

export default function Login() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 10, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Acesso do Professor
                </Typography>
                <LoginForm />
            </Box>
        </Container>
    );
}
