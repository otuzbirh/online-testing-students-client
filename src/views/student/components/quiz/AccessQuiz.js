import React, { useState, useEffect } from 'react';
import quizApi from '../../../../http/quiz';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Radio, FormControlLabel, Typography, Paper, Box } from '@mui/material';
import scoreApi from '../../../../http/score'
import { useSelector } from "react-redux";

function AccessQuiz() {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  

  const studentId = useSelector((state) => state.auth.userID);

  const router = useNavigate()

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
    } else {
      setShowResults(true); // Show results when the last question is reached
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
    setShowResults(true);

    scoreApi().create({
      studentId: studentId,
      quizId: id,
      score: `${score}/${quiz.length}`
    })
    .then(res => console.log("Uspješno"))
    .catch((err) => console.log(err))
    router('/student/scores')
  };

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <Paper elevation={5} sx={{display: 'flex', width: '80%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3%'}}>
      <Typography variant="h4" align="center" sx={{ my: 4 }}>
        Test
      </Typography>

      {currentQuestion && (
        <Box>
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

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, width: '100%' }}>
            <Button
              variant="outlined"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Prethodno
            </Button>
            {currentQuestionIndex < quiz.length - 1 && (
              <Button variant="contained" onClick={handleNextQuestion}>
                Sljedeće
              </Button>
            )}
            {currentQuestionIndex === quiz.length - 1 && (
              <Button variant="contained" onClick={calculateScore} sx={{marginLeft: 2}}>
                Potvrdi odgovore
              </Button>
            )}
          </Box>
        </Box>
      )}

      {showResults && (
        <Box>
          <Typography variant="h5" align="center" sx={{ mt: 4 }}>
            Rezultat: {score}/{quiz.length}
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            Hvala na izradi kviza!
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default AccessQuiz;
