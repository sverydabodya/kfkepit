import { FC } from "react";
import Header from "./UI-AuthPage/Header/Header";
import classes from "../components/UI-AuthPage/AuthPage.module.scss";
import Form from "./UI-AuthPage/Form/Form";
import Footer from "./UI/Footer/Footer";
import { User } from "../model/user";
import { useNavigate } from "react-router-dom";




const AuthPage:FC = () => {

    const navigate = useNavigate();

    const handleLoginSuccessful = (user: User) => {
        console.log("Login successful!", user);
        navigate('/subject');
    }


    return ( 

        <div className={classes.wrapper}>
            <Header/>
            <Form onLoginSuccessful={handleLoginSuccessful} />
            <Footer className=""/>
        </div>

     );
}

export default AuthPage;