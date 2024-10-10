import React, { useState } from 'react';
import Lobby from './Lobby'; // Componente do Lobby
import ShowQuestion from './ShowQuestion'; // Componente de Questões
import Final from './Final'; // Componente do Pódio

export default function QuizApply () {
  // Estado que controla a fase do quiz
  const [quizStage, setQuizStage] = useState('lobby'); // 'lobby', 'question', 'podium'
  
  // Funções que alteram o estado e mudam a fase do quiz
  const startQuiz = () => {
    setQuizStage('question');
  };

  const finishQuiz = () => {
    setQuizStage('final');
  };

  const finishApply = () => {
    setQuizStage('')
  }

  return (
    <div>
      {quizStage === 'lobby' && <Lobby onStartQuiz={startQuiz} />}
      {/* Lobby notifica o pai quando o quiz começar */}
      
      {quizStage === 'question' && ( <ShowQuestion onFinishQuiz={finishQuiz} /> )}
      {/* ShowQuestion notifica o pai quando o quiz terminar */}
      
      {quizStage === 'final' && <Final onFinishResults={finishApply}/>}
      {/* O Podium não precisa de interação, ele só é exibido */}
    </div>
  );
};

