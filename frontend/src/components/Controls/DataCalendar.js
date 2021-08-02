import React from 'react'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const DataCalendar = (props) => {
    const {name,label, value, onChange} = props;
    const convertToDefEvent = (name, value)=>({
        target:{
            name,value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant='inline' inputVariant='outlined'
                label={label}
                format="MMM/dd/yyyy"
                name={name}
                value={value}
                onChange={date => onChange(convertToDefEvent(name,date))}
                defaultValue="05/24/2017T10:30"
            />
        </MuiPickersUtilsProvider>
    )
}

export default DataCalendar
