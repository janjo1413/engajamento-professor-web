import { createContext, useState, useContext } from 'react';

const QuizClassContext = createContext();

export const QuizClassProvider = ({ children }) => {
  const [quiz, setQuiz] = useState('');
  const [classRoom, setClassRoom] = useState('');

  return (
    <QuizClassContext.Provider value={{ quiz, setQuiz, classRoom, setClassRoom }}>
      {children}
    </QuizClassContext.Provider>
  );
};

export const useQuizClass = () => {
  return useContext(QuizClassContext);
};
