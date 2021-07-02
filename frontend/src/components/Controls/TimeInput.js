import React from 'react'
import {TextField} from '@material-ui/core'
const TimeInput = (props) => {
    const {name, label, value, error=null, onChange,type, defaultValue, ...others} = props;
    return (
        <TextField
           variant= 'outlined'
           label={label}
           name={name}
           value={value}
           type={type}
           defaultValue={defaultValue}
           onChange={onChange}
           {...others}
           {...(error && {error:true, helperText:error})}
        />
    )
}

export default TimeInput