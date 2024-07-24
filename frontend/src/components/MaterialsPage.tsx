import { FC } from "react";
import Sidebar from "./UI-SubjectPage/Sidebar/Sidebar";
import Footer from "./UI/Footer/Footer";
import classes from "./UI-SubjectPage/SubjectPage.module.scss";
import { useTheme } from "./ThemeProvider";
import MainMaterial from "./UI-SubjectPage/MainMaterial/MainMaterial";

const MaterialsPage:FC = () => {
    const { theme } = useTheme();

    return (
  
        <div className={`${classes.wrapper} ${theme}`}>
          <div className={classes.content}>
            <Sidebar className={classes.sidebar} />
            <MainMaterial className={classes.main} />
          </div>
          <Footer className={classes.footer} />
        </div>
  
    );
}

export default MaterialsPage;