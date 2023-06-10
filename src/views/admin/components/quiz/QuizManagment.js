import React, { useState, useEffect } from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import quizApi from '../../../../http/quiz';

const validationSchema = Yup.object().shape({
  questionText: Yup.string().required('Tekst pitanja je obavezan'),
  answer: Yup.string().required('Odgovor je obavezan'),
  option1: Yup.string().required('Pitanje mora sadržavati 3 odgovora!'),
  option2: Yup.string().required('Pitanje mora sadržavati 3 odgovora!'),
  option3: Yup.string().required('Pitanje mora sadržavati 3 odgovora!'),
});

const QuizManagment = () => {
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();

  const fetchQuiz = async () => {
    try {
      const response = await quizApi().singleQuiz(id);
      setQuestions(response.data.questions);
    } catch (error) {
      alert('Error occurred while fetching quiz', error.message);
    }
  };

  const handleDeleteQuestion = async (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);

    try {
      await quizApi().editQuiz(id, { questions: updatedQuestions });
      setQuestions(updatedQuestions);
    } catch (error) {
      alert('Error occurred while deleting question', error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      questionText: '',
      answer: '',
      option1: '',
      option2: '',
      option3: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const optionsArray = [
        values.option1,
        values.option2,
        values.option3,
      ];
      const updatedQuestions = [
        ...questions,
        {
          questionText: values.questionText,
          answer: values.answer,
          options: optionsArray,
        },
      ];

      try {
        await quizApi().editQuiz(id, { questions: updatedQuestions });
        setQuestions(updatedQuestions);
        resetForm();
      } catch (error) {
        alert('Error occurred while adding question', error.message);
      }
    },
  });

  useEffect(() => {
    if (id) {
      fetchQuiz();
    }
  }, [id]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {questions?.length > 0 ? questions?.map((item, index) => (
            <Paper
              key={index}
              style={{
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
              }}
            >
              <h3>Pitanje {index + 1}</h3>
              <p>{item?.questionText}</p>
              <p>Odgovor: {item?.answer}</p>
              <ul>
                {item?.options?.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    {optionIndex + 1}) {option}
                  </li>
                ))}
              </ul>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteQuestion(index)}
              >
                Obriši pitanje
              </Button>
            </Paper>
          )) : (<Paper sx={{padding:3}}>
              <Typography>Trenutno nema unesenih pitanja!!!</Typography>
          </Paper>) }
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ padding: '10px', borderRadius: '5px' }}>
            <h3>Dodaj novo pitanje</h3>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="Tekst pitanja"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('questionText')}
                error={formik.touched.questionText && formik.errors.questionText}
                helperText={formik.touched.questionText && formik.errors.questionText}
              />
              <TextField
                label="Odgovor"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('answer')}
                error={formik.touched.answer && formik.errors.answer}
                helperText={formik.touched.answer && formik.errors.answer}
              />
              <TextField
                label="Opcija 1"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('option1')}
                error={formik.touched.option1 && formik.errors.option1}
                helperText={formik.touched.option1 && formik.errors.option1}
              />
              <TextField
                label="Opcija 2"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('option2')}
                error={formik.touched.option2 && formik.errors.option2}
                helperText={formik.touched.option2 && formik.errors.option2}
              />
              <TextField
                label="Opcija 3"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('option3')}
                error={formik.touched.option3 && formik.errors.option3}
                helperText={formik.touched.option3 && formik.errors.option3}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Dodaj
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default QuizManagment;
