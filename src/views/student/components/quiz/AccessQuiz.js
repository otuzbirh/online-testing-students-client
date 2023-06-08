import React, { useState, useEffect } from 'react';
import quizApi from '../../../../http/quiz';
import { useParams } from 'react-router-dom';
import { Button, Radio, FormControlLabel, Typography, Container } from '@mui/material';

function AccessQuiz() {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    // Fetch quiz data from API
    quizApi()
      .singleQuiz(id)
      .then(data => setQuiz(data.data.questions))
      .catch(error => console.log(error));
  }, [id]);

  const handleAnswerSelection = (questionIndex, answer) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;

    quiz.forEach((question, index) => {
      const { answer } = question;
      const userAnswer = userAnswers[index];

      if (userAnswer === answer) {
        score++;
      }
    });

    setScore(score);
  };

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" sx={{ my: 4 }}>
        Quiz
      </Typography>

      {currentQuestion && (
        <div>
          <Typography variant="h6" sx={{ mt: 2 }}>{currentQuestion.questionText}</Typography>

          {currentQuestion.options.map((option, optionIndex) => (
            <FormControlLabel
              key={optionIndex}
              control={
                <Radio
                  color="primary"
                  checked={userAnswers[currentQuestionIndex] === option}
                  onChange={e => handleAnswerSelection(currentQuestionIndex, option)}
                />
              }
              label={option}
            />
          ))}

          <div sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            {currentQuestionIndex < quiz.length - 1 && (
              <Button variant="contained" onClick={handleNextQuestion}>
                Next
              </Button>
            )}
            {currentQuestionIndex === quiz.length - 1 && (
              <Button variant="contained" onClick={calculateScore}>
                Submit Answers
              </Button>
            )}
          </div>
        </div>
      )}

      {currentQuestionIndex === quiz.length -1 && (
        <div>
          <Typography variant="h5" align="center" sx={{ mt: 4 }}>
            Rezultat: {score}/{quiz.length}
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            Thank you for completing the quiz!
          </Typography>
        </div>
      )}
    </Container>
  );
}

export default AccessQuiz;
