import { FC } from "react";
import Header from "./UI-AuthPage/Header/Header";
import classes from "../components/UI-AuthPage/AuthPage.module.scss";
import Form from "./UI-AuthPage/Form/Form";
import Footer from "./UI/Footer/Footer";


const AuthPage:FC = () => {
    return ( 

        <div className={classes.wrapper}>
            <Header/>
            <Form/>
            <Footer className=""/>
        </div>

     );
}

export default AuthPage;