import { FC } from "react";
import Sidebar from "./UI-SubjectPage/Sidebar/Sidebar";
import Main from "./UI-SubjectPage/Main/Main";
import Footer from "./UI/Footer/Footer";
import classes from "./UI-SubjectPage/SubjectPage.module.scss";
import { useTheme } from "./ThemeProvider";


const SubjectPage: FC = () => {

  const { theme } = useTheme();

  return (

      <div className={`${classes.wrapper} ${theme}`}>
        <div className={classes.content}>
          <Sidebar className={classes.sidebar} />
          <Main className={classes.main} />
        </div>
        <Footer className={classes.footer} />
      </div>

  );
}

export default SubjectPage;
