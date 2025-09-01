import React, { useState, useEffect } from 'react';
import { Grid, Paper, TextField, Button, Typography, Container, Box } from '@mui/material';
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
    <Container maxWidth="xl" sx={{ py: 2, height: '100%', px: { xs: 1, sm: 2, md: 3 } }}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} height="100%">
        {/* Questions List - Responsive Grid */}
        <Grid item xs={12} md={6} lg={6} height="100%">
          <Box sx={{ 
            maxHeight: { xs: '50vh', sm: '70vh', md: '90vh' }, 
            overflowY: 'auto',
            pr: { xs: 0.5, sm: 1 },
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            }
          }}>
            {questions?.length > 0 ? questions?.map((item, index) => (
              <Paper
                key={index}
                sx={{
                  padding: { xs: 1.5, sm: 2 },
                  marginBottom: { xs: 1.5, sm: 2 },
                  borderRadius: 1,
                  height: '100%',
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 4,
                  }
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                  Pitanje {index + 1}
                </Typography>
                <Typography variant="body1" paragraph sx={{ 
                  wordBreak: 'break-word',
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}>
                  {item?.questionText}
                </Typography>
                <Typography variant="body2" color="primary" paragraph sx={{ 
                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                }}>
                  <strong>Odgovor:</strong> {item?.answer}
                </Typography>
                <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                  {item?.options?.map((option, optionIndex) => (
                    <Typography key={optionIndex} component="li" variant="body2" sx={{ 
                      mb: 0.5,
                      fontSize: { xs: '0.8rem', sm: '0.875rem' }
                    }}>
                      {optionIndex + 1}) {option}
                    </Typography>
                  ))}
                </Box>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteQuestion(index)}
                  sx={{ 
                    minWidth: { xs: '100px', sm: '120px' },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
                  Obriši pitanje
                </Button>
              </Paper>
            )) : (
              <Paper sx={{ 
                padding: { xs: 2, sm: 3 }, 
                textAlign: 'center',
                backgroundColor: '#f5f5f5'
              }}>
                <Typography variant="h6" color="textSecondary" sx={{ 
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}>
                  Trenutno nema unesenih pitanja!!!
                </Typography>
              </Paper>
            )}
          </Box>
        </Grid>

        {/* Add Question Form - Responsive Grid */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper sx={{ 
            padding: { xs: 2, sm: 3 }, 
            borderRadius: 1,
            boxShadow: 2,
            position: { xs: 'static', md: 'sticky' },
            top: 16,
            maxHeight: 'fit-content'
          }}>
            <Typography variant="h5" gutterBottom sx={{ 
              mb: 3,
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}>
              Dodaj novo pitanje
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ 
              '& .MuiTextField-root': { mb: 2 },
              '& .MuiButton-root': { mt: 1 }
            }}>
              <TextField
                label="Tekst pitanja"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                {...formik.getFieldProps('questionText')}
                error={formik.touched.questionText && formik.errors.questionText}
                helperText={formik.touched.questionText && formik.errors.questionText}
                sx={{ mb: 2 }}
                size="small"
              />
              <TextField
                label="Odgovor"
                variant="outlined"
                fullWidth
                {...formik.getFieldProps('answer')}
                error={formik.touched.answer && formik.errors.answer}
                helperText={formik.touched.answer && formik.errors.answer}
                sx={{ mb: 2 }}
                size="small"
              />
              <TextField
                label="Opcija 1"
                variant="outlined"
                fullWidth
                {...formik.getFieldProps('option1')}
                error={formik.touched.option1 && formik.errors.option1}
                helperText={formik.touched.option1 && formik.errors.option1}
                sx={{ mb: 2 }}
                size="small"
              />
              <TextField
                label="Opcija 2"
                variant="outlined"
                fullWidth
                {...formik.getFieldProps('option2')}
                error={formik.touched.option2 && formik.errors.option2}
                helperText={formik.touched.option2 && formik.errors.option2}
                sx={{ mb: 2 }}
                size="small"
              />
              <TextField
                label="Opcija 3"
                variant="outlined"
                fullWidth
                {...formik.getFieldProps('option3')}
                error={formik.touched.option3 && formik.errors.option3}
                helperText={formik.touched.option3 && formik.errors.option3}
                sx={{ mb: 2 }}
                size="small"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                Dodaj
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QuizManagment;
