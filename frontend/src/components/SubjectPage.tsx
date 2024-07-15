import { FC } from "react";
import classes from "./UI-SubjectPage/SubjectPage.module.scss";
import Sidebar from "./UI-SubjectPage/Sidebar/Sidebar";
import Main from "./UI-SubjectPage/Main/Main";
import Footer from "./UI/Footer/Footer";
import { ThemeProvider } from "./ThemeProvider";

const SubjectPage: FC = () => {
  return (
    <ThemeProvider>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <Sidebar className={classes.sidebar} />
          <Main className={classes.main} />
        </div>
        <Footer className={classes.footer} />
      </div>
    </ThemeProvider>
  );
}

export default SubjectPage;
