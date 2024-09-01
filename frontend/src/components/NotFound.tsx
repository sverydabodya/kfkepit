import classes from './UI-HomePage/PostDetail.module.scss';
import Header from "./UI-HomePage/Header/Header";
import Footer from "./UI/Footer/Footer";


function NotFound() {
    return ( 

        <>
            <div className={classes.wrapper}>
            <Header />
            <main className={classes.main}>
                <div className={classes.main__error}>Не знайдено</div>
            </main>
            <Footer className='footer' />
        </div>;
        </>
     );
}

export default NotFound;