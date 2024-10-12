import { useState } from 'react';

import Lobby from '../components/Lobby';
import ShowQuestion from '../components/ShowQuestion';
import Final from '../components/Final';

export default function QuizApply () {
  const [quizStage, setQuizStage] = useState('lobby'); // 'lobby', 'question', 'podium'
  
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
      
      {quizStage === 'question' && ( <ShowQuestion onFinishQuiz={finishQuiz} /> )}
      
      {quizStage === 'final' && <Final onFinishResults={finishApply}/>}
    </div>
  );
};

