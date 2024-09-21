import { FC } from "react";
import Sidebar from "./UI-SubjectPage/Sidebar/Sidebar";
import Footer from "./UI/Footer/Footer";
import classes from "./UI-SubjectPage/SubjectPage.module.scss";
import { useTheme } from "./ThemeProvider";
import MainMaterial from "./UI-SubjectPage/MainMaterial/MainMaterial";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const MaterialsPage: FC = () => {
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
					className={classes.sidebar}
					onLogoutSuccessful={handleLogoutSuccessful}
				/>
				<MainMaterial className={classes.main} loggedInUser={user!} />
			</div>
			<Footer className={classes.footer} />
		</div>
	);
};

export default MaterialsPage;
