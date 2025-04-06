import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DarkSwal from "../components/DarkSwal";
import api from "../services/api";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/getUsuario', {
        usuario: email,
        senha: password
      });

      const data = response.data;

      console.log("🔍 Resposta da API:", data);

      const isInvalid =
        !data ||
        (typeof data === "object" && Object.keys(data).length === 0) ||
        (typeof data === "string" && data.trim() === "") ||
        (Array.isArray(data) && data.length === 0);

      if (isInvalid) {
        throw new Error("Login inválido");
      }

      DarkSwal.fire({
        title: "Login realizado!",
        icon: "success"
      });


      navigate("/quizzes");

    } catch (error) {
      console.error("❌ Erro ao fazer login:", error);
      DarkSwal.fire({
        title: "Erro ao fazer login",
        text: "Usuário ou senha incorretos.",
        icon: "error"
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
      <TextField
        label="Usuário"
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
