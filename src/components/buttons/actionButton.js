import React from 'react'
import Button from '@mui/material/Button';


const ActionButton = ({btnText, endIcon, handleClick}) => {
  return (
    <Button variant="contained" endIcon={endIcon} sx={{margin: 2}} onClick={handleClick}>
    {btnText}
  </Button>
  )
}

export default ActionButton