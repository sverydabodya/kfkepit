import { FC } from "react";
import Sidebar from "./UI-SubjectPage/Sidebar/Sidebar";
import { useTheme } from "./ThemeProvider";
import Footer from "./UI/Footer/Footer";
import classes from "./UI-SubjectPage/SubjectPage.module.scss";
import SсheduleMain from "./UI-SubjectPage/ScheduleMain/SсheduleMain";

const SchedulePage:FC = () => {
    const { theme } = useTheme();

    return (
  
        <div className={`${classes.wrapper} ${theme}`}>
          <div className={classes.content}>
            <Sidebar className={classes.sidebar} />
            <SсheduleMain className={classes.main} />
          </div>
          <Footer className={classes.footer} />
        </div>
  
    );
}

export default SchedulePage;