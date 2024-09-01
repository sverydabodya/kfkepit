import { useState } from "react";
import classes from './Form.module.scss';
import { useNavigate } from "react-router-dom";
import * as AuthApi from "../../../network/auth_api";
import { User } from "../../../model/user";
import { UnauthorizedError } from "../../../errors/http_errors";
import { useForm } from "react-hook-form";

interface LoginProps {
    onLoginSuccessful: (user: User) => void
}

const Form = ({ onLoginSuccessful }: LoginProps) => {

    const navigate = useNavigate();
    const [, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<AuthApi.LoginCredentials>();

    async function onSubmit(credentials: AuthApi.LoginCredentials) {
        try {
            console.log(credentials)
            const user = await AuthApi.login(credentials);
            onLoginSuccessful(user);
            navigate('/subject');
            
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }
    



    return (
        
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            
            <h1 className={classes.form__title}>Авторизація</h1>
            <input {...register("username", { required: true })}  required placeholder="Логін" type="text" name="username" className={classes.form__input} />
            <input {...register("password", { required: true })}  required placeholder="Пароль" type="password" name="password" className={classes.form__input} />
            <div className={classes.form__remember}>
                <div className={classes.checkboxWrapper30}>
                    <span className={classes.checkbox}>
                        <input {...register("rememberMe", { required: false })}  type="checkbox" name="rememberMe" />
                        <svg viewBox="0 0 22 22">
                            <use href="#checkbox-30" />
                        </svg>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                        <symbol id="checkbox-30" viewBox="0 0 22 22">
                            <path fill="none" stroke="currentColor" d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13 c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2"/>
                        </symbol>
                    </svg>
                </div>
                <p>Запам’ятати мене</p>
            </div>
            <div>
                <button disabled={isSubmitting} className={classes.form__button}>Увійти</button>
            </div>

        </form>
    );
}

export default Form;


