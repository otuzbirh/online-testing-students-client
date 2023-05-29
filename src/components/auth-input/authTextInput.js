import { memo } from "react"
import { TextField } from "@mui/material"


const AuthTextInput = ({ fieldData, onChange, triedToSubmitAtLeastOnce }) => {


  return <TextField margin="normal" variant='outlined' autoComplete='off' type='text' fullWidth={true}
    value={fieldData.value} error={!!(triedToSubmitAtLeastOnce && fieldData.error)} label={(triedToSubmitAtLeastOnce && fieldData.error) || fieldData.label}
    onChange={e => onChange(e?.target?.value)} />
}

export default memo(AuthTextInput)