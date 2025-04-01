import { useRef, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Container, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDrag, useDrop } from 'react-dnd';

export default function QuestionCard({ index, question, subject, answer, hasDelete = false, onRemove = null, moveCard }) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const ref = useRef(null);
  const ItemTypes = { QUESTION: 'question' };

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.QUESTION,
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.QUESTION,
    item: () => ({ index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <Grid item xs={12}>
        <Card sx={{ mb: 4, height: '100%', transition: 'transform 0.2s ease, background-color 0.2s ease' }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <Container sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" component="div">
                Assunto: {subject}
              </Typography>

              <Typography
                variant="h6"
                component="div"
                sx={{
                  my: 2,
                  maxWidth: '80vw',
                  wordBreak: 'break-word',
                }}
              >
                {question}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" component="div">
                  Resposta:
                </Typography>

                {isAnswerVisible ? (
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      marginLeft: 4,
                      textAlign: 'center',
                      backgroundColor: answer === 'V' ? '#1E90FF' : '#FF4500',
                      color: '#fff',
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                    onClick={() => setIsAnswerVisible(!isAnswerVisible)}
                  >
                    {answer === 'V' ? 'Verdadeiro' : 'Falso'}
                  </Typography>
                ) : (
                  <div
                    style={{
                      height: 30,
                      backgroundColor: 'gray',
                      borderRadius: 10,
                      width: '10vw',
                      marginLeft: 10,
                      cursor: 'pointer',
                    }}
                    onClick={() => setIsAnswerVisible(!isAnswerVisible)}
                  />
                )}
              </Box>
            </Container>

            {hasDelete && (
              <Container sx={{ flexBasis: '10%' }}>
                <IconButton color="error" aria-label="Remover questão" onClick={onRemove}>
                  <Close />
                </IconButton>
              </Container>
            )}
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
