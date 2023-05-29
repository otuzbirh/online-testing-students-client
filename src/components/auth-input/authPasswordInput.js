import React, { memo, useState } from 'react';

import { InputAdornment, IconButton, TextField } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material'


const AuthPasswordInput = ({ fieldData, onChange, triedToSubmitAtLeastOnce }) => {

  const [visible, setVisible] = useState(false)


  return <TextField margin="normal" variant='outlined' autoComplete='off' type={visible ? 'text' : 'password'} fullWidth={true}
    value={fieldData.value} error={!!(triedToSubmitAtLeastOnce && fieldData.error)} label={(triedToSubmitAtLeastOnce && fieldData.error) || fieldData.label}
    onChange={(e) => onChange(e?.target?.value)} InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton edge="end" tabIndex={-1} onClick={() => setVisible(!visible)}
          >{visible ? <Visibility /> : <VisibilityOff />}</IconButton>
        </InputAdornment>)
    }} />
}

export default memo(AuthPasswordInput)