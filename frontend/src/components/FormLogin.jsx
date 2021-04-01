import React, {Fragment} from 'react'
import { useForm } from 'react-hook-form';
import '../css/form.css'

const FormLogin = () => {
    const {register, handleSubmit, watch, errors} = useForm();
    const onSubmit = data=>console.log(data)
    console.log(watch('example'))
    return(
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="user" defaultValue="test" ref={register}/>
                <input name="password" ref={register({required:true})}/>
                {errors.password && <span>Este campo es requerido</span>}
                <input type="submit"/>
            </form>
        </Fragment>
    )
}

export default FormLogin;