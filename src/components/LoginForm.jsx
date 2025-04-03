import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import api from "../services/api"; // quando for usar o backend
import DarkSwal from "../components/DarkSwal"; // alertas bonitos

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    
    /*
    try {
      const response = await api.post('/login', {
        email,
        password
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      DarkSwal.fire({
        title: "Login realizado com sucesso!",
        icon: "success"
      });

      navigate("/quizzes");

    } catch (error) {
      DarkSwal.fire({
        title: "Erro ao fazer login",
        text: "E-mail ou senha incorretos",
        icon: "error"
      });
    }
    */

    
    if (email === "prof@teste.com" && password === "123456") {
      DarkSwal.fire({
        title: "Login simulado com sucesso!",
        icon: "success"
      });

      navigate("/quizzes");
    } else {
      DarkSwal.fire({
        title: "Login inválido",
        text: "E-mail ou senha estão incorretos.",
        icon: "error"
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
      <TextField
        label="E-mail"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Senha"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={!email || !password}
      >
        Entrar
      </Button>
    </Box>
  );
}
