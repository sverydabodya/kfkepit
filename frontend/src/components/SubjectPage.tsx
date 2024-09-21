import { FC } from "react";
import Sidebar from "./UI-SubjectPage/Sidebar/Sidebar";
import Main from "./UI-SubjectPage/Main/Main";
import Footer from "./UI/Footer/Footer";
import classes from "./UI-SubjectPage/SubjectPage.module.scss";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const SubjectPage: FC = () => {
	const { theme } = useTheme();
	const { user } = useAuth();
	const navigate = useNavigate();

	const handleLogoutSuccessful = () => {
		console.log("User has been logged out");
		navigate("/auth");
	};

	return (
		<div className={`${classes.wrapper} ${theme}`}>
			<div className={classes.content}>
				<Sidebar
					onLogoutSuccessful={handleLogoutSuccessful}
					className={classes.sidebar}
				/>
				<Main className={classes.main} loggedInUser={user!} />
			</div>
			<Footer className={classes.footer} />
		</div>
	);
};

export default SubjectPage;
