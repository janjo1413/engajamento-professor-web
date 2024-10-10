import React from 'react';
import { Box, Grid, Typography, Badge, Container } from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import getFirstNames from '../utils/getFirstNames';

const Podium = ({ students }) => {
  // Ordena alunos por pontuação
  //const sortedStudents = students.sort((a, b) => b.pontuacao - a.pontuacao).slice(0, 3);
  const podiumStudents = students.slice(0, 3);

  const setMedalColor = (index) => {
    if (index === 0) {
      return '#a57c00';
    } else if (index === 1) {
      return '#c0c0c0';
    } else if (index === 2) {
      return '#cd7f32';
    }
  };

  const renderPodiumItem = ({ item, index }) => {
    const positionColor = setMedalColor(index);

    return (
      <Grid item key={item.matricula}>
        <Box my={4}>

          <Container>
            <Typography variant="h6">
              {index + 1}º Lugar
            </Typography>

            <EmojiEvents sx={{ color: positionColor }} fontSize='large' />
          </Container>


          <Typography variant="h5" my={1}>{getFirstNames(item.nome)}</Typography>

          {
            item.pontuacao === 0 &&
            <Typography variant="h5">Nenhum acerto</Typography>
          }

          {
            item.pontuacao === 1 &&
            <Typography variant="h5">1 acerto</Typography>
          }

          {
            item.pontuacao > 1 &&
            <Typography variant="h5">{item.pontuacao} acertos</Typography>

          }

        </Box>
      </Grid>
    )
  };

  return (
    <Box sx={{ textAlign: 'center' }} m={4}>
      <Typography variant="h5">Pódio</Typography>

      <Grid container direction="column" my={2}>
        {podiumStudents.map((item, index) => renderPodiumItem({ item, index }))}
      </Grid>
    </Box>
  );
};

export default Podium;