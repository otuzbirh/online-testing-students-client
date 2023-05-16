import React, {useState} from 'react'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Stack, Typography } from '@mui/material'
// import styles from "./../components/styles.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
// import api from './../http/api'
// import Select from 'react-select';
// import countries from 'countries-list';

function AddUser() {


  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",    
    email: "",
    role: "",
    password: "",
    firstNameError: " ",
    lastNameError: '',
    emailError: '',
    roleError: '',
    passwordError: ""
    
  })

  const data = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    role: formData.role,
    password: formData.password,
    
  }



  const [submittedOnce, setSubmittedOnce] = useState(false)


//   function handleSubmit() {
//     setSubmittedOnce(true)
//     if (formData.list_id === null) {
//       setFormData(prevFormData => {
//         return {
//           ...prevFormData,
//           list_idError: "List id is required"
//         }
//       })
//     }
//     else if (formData.note === '') {
//       setFormData(prevFormData => {
//         return {
//           ...prevFormData,
//           noteError: "Note is required"
//         }
//       })
//     }
//     else if (formData.form_id === null) {
//       setFormData(prevFormData => {
//         return {
//           ...prevFormData,
//           form_idError: "Form id is required"
//         }
//       })
//     }
 
//     else {
//       setFormData(prevFormData => {
//         return {
//           ...prevFormData,
//           list_idError: " ",
//           form_idError: '',
//           noteError: " ",
//           app_idError: '',
//           app_secretError: '',
//           country_codeError: ''
//         }
//       })



//       api().create(data).then(
//         setTimeout(() => {
//           handleCreateCloseModal();
//           setCounter(counter + 1)

//         }, 1000))

//       setTimeout(() => {
//         window.location.reload();
//       }, 2000)


//     }
//   }



  function handleChange(e) {
    e.preventDefault()

    const { name, value } = e.target

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    }
    )
  }

  return (
    <div className="form">

      {/* <Typography sx={{ mb: 2, borderBottom: '2px solid black', fontSize: '25px' }}>Create lead</Typography> */}
      <br></br>
      <Stack direction={'row'} spacing={2}>

        <TextField
          error={!!formData.firstName && submittedOnce}
          name="firstName"
          label="Ime"
          onChange={handleChange}
          value={formData.firstName}
          helperText={formData.firstNameError ? formData.firstNameError : " "}
        />
        <br></br>
        <TextField
          error={!!formData.lastName && submittedOnce}
          name="lastName"
          label="Prezime"
          onChange={handleChange}
          value={formData.lastName}
          helperText={formData.lastNameError ? formData.lastNameError : " "}
        />
      </Stack>
   

      <Stack direction={'row'} spacing={2}>

        <TextField
          error={!!formData.emailError && submittedOnce}
          name="email"
          label="Email"
          onChange={handleChange}
          value={formData.email}
          helperText={formData.emailError ? formData.emailError : " "}
        />
        <TextField
          error={!!formData.passwordError && submittedOnce}
          name="password"
          label="Password"
          onChange={handleChange}
          value={formData.password}
          helperText={formData.passwordError ? formData.passwordError : " "}
        />

      </Stack>

      <Stack direction={'row'} spacing={2}>

      <TextField
        error={!!formData.role && submittedOnce}
        name="role"
        label="Role"
        onChange={handleChange}
        value={formData.role}
        helperText={formData.roleError ? formData.roleError : " "}
      />
      

      </Stack>

     
      <br></br>
      {/* <Stack direction='row' spacing={2} sx={{ borderTop: '2px solid black', mt: 2, pt: 2 }}>
        <Button color='error' variant="contained" onClick={handleCreateCloseModal}>Close</Button>
        <Button color='success' variant="contained" onClick={handleSubmit}>Submit</Button>
      </Stack> */}

    </div>
  )
}

export default AddUser