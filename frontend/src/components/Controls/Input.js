import React from 'react'
import {TextField} from '@material-ui/core'
const Input = (props) => {
    const {name, label, classN, value, error=null, onChange, ...others} = props;
    return (
        <TextField
           variant= 'outlined'
           label={label}
           name={name}
           value={value}
           className={classN}
           onChange={onChange}
           {...others}
           {...(error && {error:true, helperText:error})}
        />
    )
}

export default Input
