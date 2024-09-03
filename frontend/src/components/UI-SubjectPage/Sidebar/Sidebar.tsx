import classes from './Sidebar.module.scss'
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as AuthApi from "../../../network/auth_api";
import { motion } from 'framer-motion';

interface SidebarProps {
    className?: string,
    onLogoutSuccessful: () => void,
}



const Sidebar = ({ onLogoutSuccessful = () => {} }: SidebarProps) => {
    const navigate = useNavigate();

    async function logout() {
        try {
            await AuthApi.logout();
            onLogoutSuccessful();
            navigate('/auth');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }


    return ( 
        <aside className={classes.aside}>
            <motion.div className={classes.aside__logo}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}>
                <div className={classes.aside__img}>
                    <svg className="white" width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.406012 0L0 1.51986C2.01989 2.07098 3.83669 2.83158 5.4589 3.76915C3.68512 5.09662 2.51536 7.36621 2.51536 9.94443C2.51536 11.0894 2.74629 12.1734 3.15789 13.1414C1.33876 14.8568 0.239606 17.3022 0.239606 20.5119C0.239606 26.4653 3.81259 31.6071 8.98095 34.0735L6.42066 39.9999H8.11941L10.4199 34.6752C10.6709 34.7659 10.9243 34.8512 11.1811 34.9296C11.4779 35.162 11.7802 35.3718 12.0872 35.5602L11.0008 40H12.6082L13.5207 36.2669C14.0923 36.4813 14.6747 36.6227 15.2631 36.6886V39.9999H16.8213V36.6849C17.4776 36.6086 18.1261 36.4376 18.7601 36.1748L19.6948 39.9999H21.2997L20.1792 35.4163C20.4627 35.2291 20.742 35.0237 21.0159 34.7977C21.2834 34.7078 21.5486 34.6107 21.811 34.5066L24.1837 39.9998H25.8825L23.2313 33.8625C28.169 31.3217 31.5466 26.3001 31.5466 20.5118C31.5466 17.3857 30.5037 14.9846 28.7687 13.2767C29.2175 12.2747 29.472 11.1434 29.472 9.94451C29.472 7.37548 28.3108 5.11305 26.5479 3.78355C28.1852 2.82888 30.0038 2.06441 32 1.51977L31.594 0C29.4047 0.597363 27.4077 1.45256 25.6122 2.52692C22.7706 0.940013 19.1769 0.154647 15.5899 0.158859C12.1794 0.162902 8.77611 0.881136 6.03116 2.30236C4.34483 1.34264 2.47125 0.563502 0.406178 8.41843e-05L0.406012 0ZM15.5904 1.80253C18.6289 1.79883 21.6727 2.3673 24.1012 3.51646C20.3402 6.20274 17.6052 9.93482 16.0018 14.2803C14.3905 9.88883 11.6131 6.03765 7.61744 3.29493C9.93571 2.30573 12.7605 1.80573 15.5905 1.8022L15.5904 1.80253ZM8.62029 7.56163C10.2377 7.56163 11.5658 8.90283 11.5658 10.5367C11.5658 12.1707 10.2377 13.512 8.62029 13.512C7.00292 13.512 5.67466 12.1705 5.67466 10.5364C5.67466 8.9025 7.00292 7.56138 8.62029 7.56138V7.56163ZM23.5802 7.56163C25.1976 7.56163 26.5257 8.90283 26.5257 10.5367C26.5257 12.1707 25.1976 13.512 23.5802 13.512C21.9627 13.512 20.6345 12.1708 20.6345 10.5367C20.6345 8.90283 21.9626 7.56171 23.58 7.56171L23.5802 7.56163ZM14.378 14.3582C14.7158 15.2297 15.0052 16.127 15.247 17.0462L15.9999 19.907L16.7527 17.0462C16.9907 16.1395 17.2804 15.2474 17.6202 14.3744C18.8199 16.1829 20.7337 17.355 22.8922 17.355C24.096 17.355 25.2235 16.989 26.1943 16.353C25.8605 22.3208 24.6153 26.8588 22.9145 29.9492C20.9166 33.5799 18.3833 35.1946 15.95 35.1577C13.5169 35.1208 10.964 33.4165 8.96336 29.7607C7.25994 26.648 6.0154 22.1367 5.68242 16.2813C6.67761 16.9623 7.84562 17.3549 9.09534 17.3549C11.2602 17.3549 13.1791 16.1756 14.378 14.3579V14.3582ZM3.93457 14.539C3.97066 14.5904 4.0066 14.6418 4.04378 14.692C4.22428 21.5429 5.57695 26.8259 7.59976 30.5225C7.89328 31.0598 8.21435 31.5814 8.56169 32.0849C4.4999 29.7044 1.79771 25.406 1.79771 20.5122C1.79771 17.8146 2.56688 15.9229 3.93465 14.5391L3.93457 14.539ZM27.9686 14.6593C29.2634 16.0319 29.9884 17.8921 29.9884 20.5122C29.9884 25.2602 27.4442 29.4476 23.5832 31.8668C23.829 31.4918 24.0602 31.1074 24.2764 30.7143C26.2909 27.0537 27.6386 21.7733 27.8303 14.8391C27.877 14.7796 27.9239 14.7204 27.9687 14.6593H27.9686ZM8.1686 19.6333C7.85571 20.1608 7.66037 20.8572 7.66037 21.5908C7.66037 23.2809 8.66873 24.616 9.89636 24.616C10.941 24.616 11.8434 23.6401 12.0815 22.3026C11.6903 22.6477 11.2084 22.8366 10.7095 22.8366C9.37729 22.8366 8.25655 21.437 8.1686 19.6333ZM23.6681 19.8419C23.58 21.6456 22.4596 23.0452 21.1272 23.0452C20.6282 23.0452 20.1465 22.8564 19.7551 22.5112C19.9934 23.8488 20.8956 24.8247 21.9402 24.8247C23.1679 24.8247 24.1254 23.4896 24.1254 21.7995C24.1254 21.0658 23.9809 20.3695 23.6681 19.8419ZM17.9381 22.2821C17.6454 23.385 16.7453 24.2346 15.893 24.2346C15.0606 24.2346 14.1747 23.3875 13.8969 22.3388C13.8291 22.6249 13.7508 22.9309 13.7508 23.2481C13.7508 24.8675 14.7171 26.1465 15.8932 26.1465C17.0694 26.1465 18.0356 24.8675 18.0356 23.2481C18.0356 22.9124 18.0139 22.5827 17.9382 22.282H17.9381V22.2821ZM20.8593 27.9008C20.573 29.295 19.6748 30.3446 18.5708 30.3446C17.8839 30.3446 17.2576 29.9571 16.8181 29.3215C16.8796 30.8651 17.8239 32.1063 18.9604 32.1063C20.1365 32.1063 21.1027 30.7703 21.1027 29.151C21.1027 28.6956 20.9941 28.2854 20.8593 27.9007L20.8593 27.9008ZM11.2188 28.0142C11.1109 28.3653 11.0727 28.7462 11.0727 29.1511C11.0727 30.7703 12.039 32.1063 13.2151 32.1063C14.3516 32.1063 15.2472 30.865 15.3087 29.3214C14.8692 29.9569 14.2429 30.3445 13.5559 30.3445C12.4791 30.3445 11.5288 29.356 11.2189 28.0142L11.2188 28.0142Z" fill="black"/>
                    </svg>
                    <svg className="black" width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.406012 0L0 1.51986C2.01989 2.07098 3.83669 2.83158 5.4589 3.76915C3.68512 5.09662 2.51536 7.36621 2.51536 9.94443C2.51536 11.0894 2.74629 12.1734 3.15789 13.1414C1.33876 14.8568 0.239606 17.3022 0.239606 20.5119C0.239606 26.4653 3.81259 31.6071 8.98095 34.0735L6.42066 39.9999H8.11941L10.4199 34.6752C10.6709 34.7659 10.9243 34.8512 11.1811 34.9296C11.4779 35.162 11.7802 35.3718 12.0872 35.5602L11.0008 40H12.6082L13.5207 36.2669C14.0923 36.4813 14.6747 36.6227 15.2631 36.6886V39.9999H16.8213V36.6849C17.4776 36.6086 18.1261 36.4376 18.7601 36.1748L19.6948 39.9999H21.2997L20.1792 35.4163C20.4627 35.2291 20.742 35.0237 21.0159 34.7977C21.2834 34.7078 21.5486 34.6107 21.811 34.5066L24.1837 39.9998H25.8825L23.2313 33.8625C28.169 31.3217 31.5466 26.3001 31.5466 20.5118C31.5466 17.3857 30.5037 14.9846 28.7687 13.2767C29.2175 12.2747 29.472 11.1434 29.472 9.94451C29.472 7.37548 28.3108 5.11305 26.5479 3.78355C28.1852 2.82888 30.0038 2.06441 32 1.51977L31.594 0C29.4047 0.597363 27.4077 1.45256 25.6122 2.52692C22.7706 0.940013 19.1769 0.154647 15.5899 0.158859C12.1794 0.162902 8.77611 0.881136 6.03116 2.30236C4.34483 1.34264 2.47125 0.563502 0.406178 8.41843e-05L0.406012 0ZM15.5904 1.80253C18.6289 1.79883 21.6727 2.3673 24.1012 3.51646C20.3402 6.20274 17.6052 9.93482 16.0018 14.2803C14.3905 9.88883 11.6131 6.03765 7.61744 3.29493C9.93571 2.30573 12.7605 1.80573 15.5905 1.8022L15.5904 1.80253ZM8.62029 7.56163C10.2377 7.56163 11.5658 8.90283 11.5658 10.5367C11.5658 12.1707 10.2377 13.512 8.62029 13.512C7.00292 13.512 5.67466 12.1705 5.67466 10.5364C5.67466 8.9025 7.00292 7.56138 8.62029 7.56138V7.56163ZM23.5802 7.56163C25.1976 7.56163 26.5257 8.90283 26.5257 10.5367C26.5257 12.1707 25.1976 13.512 23.5802 13.512C21.9627 13.512 20.6345 12.1708 20.6345 10.5367C20.6345 8.90283 21.9626 7.56171 23.58 7.56171L23.5802 7.56163ZM14.378 14.3582C14.7158 15.2297 15.0052 16.127 15.247 17.0462L15.9999 19.907L16.7527 17.0462C16.9907 16.1395 17.2804 15.2474 17.6202 14.3744C18.8199 16.1829 20.7337 17.355 22.8922 17.355C24.096 17.355 25.2235 16.989 26.1943 16.353C25.8605 22.3208 24.6153 26.8588 22.9145 29.9492C20.9166 33.5799 18.3833 35.1946 15.95 35.1577C13.5169 35.1208 10.964 33.4165 8.96336 29.7607C7.25994 26.648 6.0154 22.1367 5.68242 16.2813C6.67761 16.9623 7.84562 17.3549 9.09534 17.3549C11.2602 17.3549 13.1791 16.1756 14.378 14.3579V14.3582ZM3.93457 14.539C3.97066 14.5904 4.0066 14.6418 4.04378 14.692C4.22428 21.5429 5.57695 26.8259 7.59976 30.5225C7.89328 31.0598 8.21435 31.5814 8.56169 32.0849C4.4999 29.7044 1.79771 25.406 1.79771 20.5122C1.79771 17.8146 2.56688 15.9229 3.93465 14.5391L3.93457 14.539ZM27.9686 14.6593C29.2634 16.0319 29.9884 17.8921 29.9884 20.5122C29.9884 25.2602 27.4442 29.4476 23.5832 31.8668C23.829 31.4918 24.0602 31.1074 24.2764 30.7143C26.2909 27.0537 27.6386 21.7733 27.8303 14.8391C27.877 14.7796 27.9239 14.7204 27.9687 14.6593H27.9686ZM8.1686 19.6333C7.85571 20.1608 7.66037 20.8572 7.66037 21.5908C7.66037 23.2809 8.66873 24.616 9.89636 24.616C10.941 24.616 11.8434 23.6401 12.0815 22.3026C11.6903 22.6477 11.2084 22.8366 10.7095 22.8366C9.37729 22.8366 8.25655 21.437 8.1686 19.6333ZM23.6681 19.8419C23.58 21.6456 22.4596 23.0452 21.1272 23.0452C20.6282 23.0452 20.1465 22.8564 19.7551 22.5112C19.9934 23.8488 20.8956 24.8247 21.9402 24.8247C23.1679 24.8247 24.1254 23.4896 24.1254 21.7995C24.1254 21.0658 23.9809 20.3695 23.6681 19.8419ZM17.9381 22.2821C17.6454 23.385 16.7453 24.2346 15.893 24.2346C15.0606 24.2346 14.1747 23.3875 13.8969 22.3388C13.8291 22.6249 13.7508 22.9309 13.7508 23.2481C13.7508 24.8675 14.7171 26.1465 15.8932 26.1465C17.0694 26.1465 18.0356 24.8675 18.0356 23.2481C18.0356 22.9124 18.0139 22.5827 17.9382 22.282H17.9381V22.2821ZM20.8593 27.9008C20.573 29.295 19.6748 30.3446 18.5708 30.3446C17.8839 30.3446 17.2576 29.9571 16.8181 29.3215C16.8796 30.8651 17.8239 32.1063 18.9604 32.1063C20.1365 32.1063 21.1027 30.7703 21.1027 29.151C21.1027 28.6956 20.9941 28.2854 20.8593 27.9007L20.8593 27.9008ZM11.2188 28.0142C11.1109 28.3653 11.0727 28.7462 11.0727 29.1511C11.0727 30.7703 12.039 32.1063 13.2151 32.1063C14.3516 32.1063 15.2472 30.865 15.3087 29.3214C14.8692 29.9569 14.2429 30.3445 13.5559 30.3445C12.4791 30.3445 11.5288 29.356 11.2189 28.0142L11.2188 28.0142Z" fill="white"/>
                    </svg>
                </div>
                <div className={classes.aside__text}>КФКЕПІТ ІФНТУНГ</div>
            </motion.div>
            <motion.nav className={classes.aside__menu}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}>
                <NavLink className={classes.aside__link} to={'/schedule'}>
                    <svg className="white" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.84151 0.209209C5.71067 0.0752549 5.5332 0 5.34816 0C5.16328 0.000252367 4.98605 0.0756187 4.85541 0.209546C4.72476 0.343473 4.65138 0.52501 4.65138 0.714286V1.5019C4.41044 1.52095 4.18066 1.54476 3.96391 1.57429C2.87362 1.72476 1.99079 2.04095 1.29401 2.75333C0.598167 3.46667 0.289316 4.37048 0.142332 5.48667C0 6.57143 0 7.9581 0 9.70857V11.72C0 13.4705 0 14.8562 0.142332 15.9419C0.289316 17.0581 0.598167 17.9619 1.29401 18.6752C1.99079 19.3876 2.87362 19.7038 3.96391 19.8543C5.02349 20 6.37797 20 8.08782 20H11.9122C13.622 20 14.9756 20 16.0361 19.8543C17.1264 19.7038 18.0092 19.3876 18.706 18.6752C19.4018 17.9619 19.7107 17.0581 19.8577 15.9419C20 14.8571 20 13.4705 20 11.72V9.70857C20 7.9581 20 6.57238 19.8577 5.48667C19.7107 4.37048 19.4018 3.46667 18.706 2.75333C18.0092 2.04095 17.1264 1.72476 16.0361 1.57429C15.8193 1.54476 15.5905 1.52095 15.3486 1.5019V0.714286C15.3486 0.524845 15.2751 0.343164 15.1443 0.209209C15.0134 0.0752549 14.836 0 14.6509 0C14.4659 0 14.2884 0.0752549 14.1576 0.209209C14.0267 0.343164 13.9532 0.524845 13.9532 0.714286V1.44095C13.3374 1.42857 12.6592 1.42857 11.9122 1.42857H8.08596C7.33988 1.42857 6.66171 1.42857 6.04586 1.44095V0.714286C6.04586 0.524845 5.97236 0.343164 5.84151 0.209209ZM2.28011 3.76381C2.67361 3.36095 3.21317 3.11905 4.1481 2.99048C5.10536 2.85905 6.36495 2.85714 8.13899 2.85714H11.8601C13.6341 2.85714 14.8947 2.85905 15.85 2.99048C16.7859 3.11905 17.3255 3.36095 17.719 3.76381C18.1125 4.16667 18.3488 4.71905 18.4744 5.67619C18.4958 5.83905 18.5134 6.00952 18.5283 6.19048H1.47077C1.48565 6.01048 1.50333 5.83905 1.52472 5.67714C1.65031 4.71905 1.8866 4.16667 2.28011 3.76381ZM1.40658 7.61905C1.39448 8.24095 1.39448 8.94857 1.39448 9.7619V11.6667C1.39448 13.4829 1.39634 14.7733 1.52472 15.7514C1.65031 16.7095 1.8866 17.2619 2.28011 17.6648C2.67361 18.0676 3.21317 18.3095 4.1481 18.4381C5.10536 18.5695 6.36495 18.5714 8.13899 18.5714H11.8601C13.6341 18.5714 14.8947 18.5695 15.85 18.4381C16.7859 18.3095 17.3255 18.0676 17.719 17.6648C18.1125 17.2619 18.3488 16.7095 18.4744 15.7524C18.6027 14.7733 18.6046 13.4829 18.6046 11.6667V9.7619C18.6046 8.94857 18.6046 8.24095 18.5925 7.61905H1.40658ZM15.3087 11.3878C15.1343 11.5664 14.8977 11.6667 14.6509 11.6667C14.4042 11.6667 14.1676 11.5664 13.9931 11.3878C13.8187 11.2092 13.7207 10.9669 13.7207 10.7143C13.7207 10.4618 13.8187 10.2195 13.9931 10.0409C14.1676 9.8623 14.4042 9.76196 14.6509 9.76196C14.8977 9.76196 15.1343 9.8623 15.3087 10.0409C15.4832 10.2195 15.5812 10.4618 15.5812 10.7143C15.5812 10.9669 15.4832 11.2092 15.3087 11.3878ZM15.3087 15.1973C15.1343 15.3759 14.8977 15.4762 14.6509 15.4762C14.4042 15.4762 14.1676 15.3759 13.9931 15.1973C13.8187 15.0187 13.7207 14.7765 13.7207 14.5239C13.7207 14.2713 13.8187 14.029 13.9931 13.8504C14.1676 13.6718 14.4042 13.5715 14.6509 13.5715C14.8977 13.5715 15.1343 13.6718 15.3087 13.8504C15.4832 14.029 15.5812 14.2713 15.5812 14.5239C15.5812 14.7765 15.4832 15.0187 15.3087 15.1973ZM10.6574 11.3878C10.8318 11.2092 10.9298 10.9669 10.9298 10.7143C10.9298 10.4618 10.8318 10.2195 10.6574 10.0409C10.4829 9.8623 10.2463 9.76196 9.99956 9.76196C9.75284 9.76196 9.51622 9.8623 9.34176 10.0409C9.16729 10.2195 9.06928 10.4618 9.06928 10.7143C9.06928 10.9669 9.16729 11.2092 9.34176 11.3878C9.51622 11.5664 9.75284 11.6667 9.99956 11.6667C10.2463 11.6667 10.4829 11.5664 10.6574 11.3878ZM10.6574 15.1973C10.8318 15.0187 10.9298 14.7765 10.9298 14.5239C10.9298 14.2713 10.8318 14.029 10.6574 13.8504C10.4829 13.6718 10.2463 13.5715 9.99956 13.5715C9.75284 13.5715 9.51622 13.6718 9.34176 13.8504C9.16729 14.029 9.06928 14.2713 9.06928 14.5239C9.06928 14.7765 9.16729 15.0187 9.34176 15.1973C9.51622 15.3759 9.75284 15.4762 9.99956 15.4762C10.2463 15.4762 10.4829 15.3759 10.6574 15.1973ZM6.00598 11.3878C5.83152 11.5664 5.5949 11.6667 5.34818 11.6667C5.10145 11.6667 4.86484 11.5664 4.69037 11.3878C4.51591 11.2092 4.4179 10.9669 4.4179 10.7143C4.4179 10.4618 4.51591 10.2195 4.69037 10.0409C4.86484 9.8623 5.10145 9.76196 5.34818 9.76196C5.5949 9.76196 5.83152 9.8623 6.00598 10.0409C6.18044 10.2195 6.27846 10.4618 6.27846 10.7143C6.27846 10.9669 6.18044 11.2092 6.00598 11.3878ZM6.00598 15.1973C5.83152 15.3759 5.5949 15.4762 5.34818 15.4762C5.10145 15.4762 4.86484 15.3759 4.69037 15.1973C4.51591 15.0187 4.4179 14.7765 4.4179 14.5239C4.4179 14.2713 4.51591 14.029 4.69037 13.8504C4.86484 13.6718 5.10145 13.5715 5.34818 13.5715C5.5949 13.5715 5.83152 13.6718 6.00598 13.8504C6.18044 14.029 6.27846 14.2713 6.27846 14.5239C6.27846 14.7765 6.18044 15.0187 6.00598 15.1973Z" fill="white"/>
                    </svg>
                    <svg className="black" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.84151 0.209209C5.71067 0.0752549 5.5332 0 5.34816 0C5.16328 0.000252367 4.98605 0.0756187 4.85541 0.209546C4.72476 0.343473 4.65138 0.52501 4.65138 0.714286V1.5019C4.41044 1.52095 4.18066 1.54476 3.96391 1.57429C2.87362 1.72476 1.99079 2.04095 1.29401 2.75333C0.598167 3.46667 0.289316 4.37048 0.142332 5.48667C0 6.57143 0 7.9581 0 9.70857V11.72C0 13.4705 0 14.8562 0.142332 15.9419C0.289316 17.0581 0.598167 17.9619 1.29401 18.6752C1.99079 19.3876 2.87362 19.7038 3.96391 19.8543C5.02349 20 6.37797 20 8.08782 20H11.9122C13.622 20 14.9756 20 16.0361 19.8543C17.1264 19.7038 18.0092 19.3876 18.706 18.6752C19.4018 17.9619 19.7107 17.0581 19.8577 15.9419C20 14.8571 20 13.4705 20 11.72V9.70857C20 7.9581 20 6.57238 19.8577 5.48667C19.7107 4.37048 19.4018 3.46667 18.706 2.75333C18.0092 2.04095 17.1264 1.72476 16.0361 1.57429C15.8193 1.54476 15.5905 1.52095 15.3486 1.5019V0.714286C15.3486 0.524845 15.2751 0.343164 15.1443 0.209209C15.0134 0.0752549 14.836 0 14.6509 0C14.4659 0 14.2884 0.0752549 14.1576 0.209209C14.0267 0.343164 13.9532 0.524845 13.9532 0.714286V1.44095C13.3374 1.42857 12.6592 1.42857 11.9122 1.42857H8.08596C7.33988 1.42857 6.66171 1.42857 6.04586 1.44095V0.714286C6.04586 0.524845 5.97236 0.343164 5.84151 0.209209ZM2.28011 3.76381C2.67361 3.36095 3.21317 3.11905 4.1481 2.99048C5.10536 2.85905 6.36495 2.85714 8.13899 2.85714H11.8601C13.6341 2.85714 14.8947 2.85905 15.85 2.99048C16.7859 3.11905 17.3255 3.36095 17.719 3.76381C18.1125 4.16667 18.3488 4.71905 18.4744 5.67619C18.4958 5.83905 18.5134 6.00952 18.5283 6.19048H1.47077C1.48565 6.01048 1.50333 5.83905 1.52472 5.67714C1.65031 4.71905 1.8866 4.16667 2.28011 3.76381ZM1.40658 7.61905C1.39448 8.24095 1.39448 8.94857 1.39448 9.7619V11.6667C1.39448 13.4829 1.39634 14.7733 1.52472 15.7514C1.65031 16.7095 1.8866 17.2619 2.28011 17.6648C2.67361 18.0676 3.21317 18.3095 4.1481 18.4381C5.10536 18.5695 6.36495 18.5714 8.13899 18.5714H11.8601C13.6341 18.5714 14.8947 18.5695 15.85 18.4381C16.7859 18.3095 17.3255 18.0676 17.719 17.6648C18.1125 17.2619 18.3488 16.7095 18.4744 15.7524C18.6027 14.7733 18.6046 13.4829 18.6046 11.6667V9.7619C18.6046 8.94857 18.6046 8.24095 18.5925 7.61905H1.40658ZM15.3087 11.3878C15.1343 11.5664 14.8977 11.6667 14.6509 11.6667C14.4042 11.6667 14.1676 11.5664 13.9931 11.3878C13.8187 11.2092 13.7207 10.9669 13.7207 10.7143C13.7207 10.4618 13.8187 10.2195 13.9931 10.0409C14.1676 9.8623 14.4042 9.76196 14.6509 9.76196C14.8977 9.76196 15.1343 9.8623 15.3087 10.0409C15.4832 10.2195 15.5812 10.4618 15.5812 10.7143C15.5812 10.9669 15.4832 11.2092 15.3087 11.3878ZM15.3087 15.1973C15.1343 15.3759 14.8977 15.4762 14.6509 15.4762C14.4042 15.4762 14.1676 15.3759 13.9931 15.1973C13.8187 15.0187 13.7207 14.7765 13.7207 14.5239C13.7207 14.2713 13.8187 14.029 13.9931 13.8504C14.1676 13.6718 14.4042 13.5715 14.6509 13.5715C14.8977 13.5715 15.1343 13.6718 15.3087 13.8504C15.4832 14.029 15.5812 14.2713 15.5812 14.5239C15.5812 14.7765 15.4832 15.0187 15.3087 15.1973ZM10.6574 11.3878C10.8318 11.2092 10.9298 10.9669 10.9298 10.7143C10.9298 10.4618 10.8318 10.2195 10.6574 10.0409C10.4829 9.8623 10.2463 9.76196 9.99956 9.76196C9.75284 9.76196 9.51622 9.8623 9.34176 10.0409C9.16729 10.2195 9.06928 10.4618 9.06928 10.7143C9.06928 10.9669 9.16729 11.2092 9.34176 11.3878C9.51622 11.5664 9.75284 11.6667 9.99956 11.6667C10.2463 11.6667 10.4829 11.5664 10.6574 11.3878ZM10.6574 15.1973C10.8318 15.0187 10.9298 14.7765 10.9298 14.5239C10.9298 14.2713 10.8318 14.029 10.6574 13.8504C10.4829 13.6718 10.2463 13.5715 9.99956 13.5715C9.75284 13.5715 9.51622 13.6718 9.34176 13.8504C9.16729 14.029 9.06928 14.2713 9.06928 14.5239C9.06928 14.7765 9.16729 15.0187 9.34176 15.1973C9.51622 15.3759 9.75284 15.4762 9.99956 15.4762C10.2463 15.4762 10.4829 15.3759 10.6574 15.1973ZM6.00598 11.3878C5.83152 11.5664 5.5949 11.6667 5.34818 11.6667C5.10145 11.6667 4.86484 11.5664 4.69037 11.3878C4.51591 11.2092 4.4179 10.9669 4.4179 10.7143C4.4179 10.4618 4.51591 10.2195 4.69037 10.0409C4.86484 9.8623 5.10145 9.76196 5.34818 9.76196C5.5949 9.76196 5.83152 9.8623 6.00598 10.0409C6.18044 10.2195 6.27846 10.4618 6.27846 10.7143C6.27846 10.9669 6.18044 11.2092 6.00598 11.3878ZM6.00598 15.1973C5.83152 15.3759 5.5949 15.4762 5.34818 15.4762C5.10145 15.4762 4.86484 15.3759 4.69037 15.1973C4.51591 15.0187 4.4179 14.7765 4.4179 14.5239C4.4179 14.2713 4.51591 14.029 4.69037 13.8504C4.86484 13.6718 5.10145 13.5715 5.34818 13.5715C5.5949 13.5715 5.83152 13.6718 6.00598 13.8504C6.18044 14.029 6.27846 14.2713 6.27846 14.5239C6.27846 14.7765 6.18044 15.0187 6.00598 15.1973Z" fill="black"/>
                    </svg>
                    <span>Розклад</span>
                </NavLink>
                <NavLink className={classes.aside__link} to={'/subject'}>
                    <svg className="white" width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6 20H1.4C1.02881 19.9996 0.672931 19.849 0.41046 19.5812C0.147989 19.3133 0.000370634 18.9502 0 18.5714V1.42857C0.000370634 1.04981 0.147989 0.686664 0.41046 0.418837C0.672931 0.151009 1.02881 0.000378198 1.4 0H12.6C12.9712 0.000378198 13.3271 0.151009 13.5895 0.418837C13.852 0.686664 13.9996 1.04981 14 1.42857V13.2986L10.5 11.5129L7 13.2986V1.42857H1.4V18.5714H12.6V15.7143H14V18.5714C13.9994 18.9501 13.8518 19.3132 13.5893 19.581C13.3269 19.8487 12.9711 19.9994 12.6 20ZM10.5 9.91571L12.6 10.9871V1.42857H8.4V10.9871L10.5 9.91571Z" fill="white"/>
                    </svg>
                    <svg className="black" width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6 20H1.4C1.02881 19.9996 0.672931 19.849 0.41046 19.5812C0.147989 19.3133 0.000370634 18.9502 0 18.5714V1.42857C0.000370634 1.04981 0.147989 0.686664 0.41046 0.418837C0.672931 0.151009 1.02881 0.000378198 1.4 0H12.6C12.9712 0.000378198 13.3271 0.151009 13.5895 0.418837C13.852 0.686664 13.9996 1.04981 14 1.42857V13.2986L10.5 11.5129L7 13.2986V1.42857H1.4V18.5714H12.6V15.7143H14V18.5714C13.9994 18.9501 13.8518 19.3132 13.5893 19.581C13.3269 19.8487 12.9711 19.9994 12.6 20ZM10.5 9.91571L12.6 10.9871V1.42857H8.4V10.9871L10.5 9.91571Z" fill="black"/>
                    </svg>
                    <span>Курси</span>                
                </NavLink>
            </motion.nav>
            <motion.button className={classes.aside__relog}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}>
                <svg className="white" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10C0 10.2652 0.105357 10.5196 0.292893 10.7071C0.48043 10.8946 0.734784 11 1 11H8.59L6.29 13.29C6.19627 13.383 6.12188 13.4936 6.07111 13.6154C6.02034 13.7373 5.9942 13.868 5.9942 14C5.9942 14.132 6.02034 14.2627 6.07111 14.3846C6.12188 14.5064 6.19627 14.617 6.29 14.71C6.38296 14.8037 6.49356 14.8781 6.61542 14.9289C6.73728 14.9797 6.86799 15.0058 7 15.0058C7.13201 15.0058 7.26272 14.9797 7.38458 14.9289C7.50644 14.8781 7.61704 14.8037 7.71 14.71L11.71 10.71C11.801 10.6149 11.8724 10.5028 11.92 10.38C12.02 10.1365 12.02 9.86346 11.92 9.62C11.8724 9.49725 11.801 9.3851 11.71 9.29L7.71 5.29C7.61676 5.19676 7.50607 5.1228 7.38425 5.07234C7.26243 5.02188 7.13186 4.99591 7 4.99591C6.86814 4.99591 6.73757 5.02188 6.61575 5.07234C6.49393 5.1228 6.38324 5.19676 6.29 5.29C6.19676 5.38324 6.1228 5.49393 6.07234 5.61575C6.02188 5.73757 5.99591 5.86814 5.99591 6C5.99591 6.13186 6.02188 6.26243 6.07234 6.38425C6.1228 6.50607 6.19676 6.61676 6.29 6.71L8.59 9H1C0.734784 9 0.48043 9.10536 0.292893 9.29289C0.105357 9.48043 0 9.73478 0 10ZM13 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89464 0.734784 7 1 7C1.26522 7 1.51957 6.89464 1.70711 6.70711C1.89464 6.51957 2 6.26522 2 6V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H13C13.2652 2 13.5196 2.10536 13.7071 2.29289C13.8946 2.48043 14 2.73478 14 3V17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V14C2 13.7348 1.89464 13.4804 1.70711 13.2929C1.51957 13.1054 1.26522 13 1 13C0.734784 13 0.48043 13.1054 0.292893 13.2929C0.105357 13.4804 0 13.7348 0 14V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V3C16 2.20435 15.6839 1.44129 15.1213 0.87868C14.5587 0.316071 13.7956 0 13 0Z" fill="white"/>
                </svg>
                <svg className="black" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10C0 10.2652 0.105357 10.5196 0.292893 10.7071C0.48043 10.8946 0.734784 11 1 11H8.59L6.29 13.29C6.19627 13.383 6.12188 13.4936 6.07111 13.6154C6.02034 13.7373 5.9942 13.868 5.9942 14C5.9942 14.132 6.02034 14.2627 6.07111 14.3846C6.12188 14.5064 6.19627 14.617 6.29 14.71C6.38296 14.8037 6.49356 14.8781 6.61542 14.9289C6.73728 14.9797 6.86799 15.0058 7 15.0058C7.13201 15.0058 7.26272 14.9797 7.38458 14.9289C7.50644 14.8781 7.61704 14.8037 7.71 14.71L11.71 10.71C11.801 10.6149 11.8724 10.5028 11.92 10.38C12.02 10.1365 12.02 9.86346 11.92 9.62C11.8724 9.49725 11.801 9.3851 11.71 9.29L7.71 5.29C7.61676 5.19676 7.50607 5.1228 7.38425 5.07234C7.26243 5.02188 7.13186 4.99591 7 4.99591C6.86814 4.99591 6.73757 5.02188 6.61575 5.07234C6.49393 5.1228 6.38324 5.19676 6.29 5.29C6.19676 5.38324 6.1228 5.49393 6.07234 5.61575C6.02188 5.73757 5.99591 5.86814 5.99591 6C5.99591 6.13186 6.02188 6.26243 6.07234 6.38425C6.1228 6.50607 6.19676 6.61676 6.29 6.71L8.59 9H1C0.734784 9 0.48043 9.10536 0.292893 9.29289C0.105357 9.48043 0 9.73478 0 10ZM13 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V6C0 6.26522 0.105357 6.51957 0.292893 6.70711C0.48043 6.89464 0.734784 7 1 7C1.26522 7 1.51957 6.89464 1.70711 6.70711C1.89464 6.51957 2 6.26522 2 6V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H13C13.2652 2 13.5196 2.10536 13.7071 2.29289C13.8946 2.48043 14 2.73478 14 3V17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V14C2 13.7348 1.89464 13.4804 1.70711 13.2929C1.51957 13.1054 1.26522 13 1 13C0.734784 13 0.48043 13.1054 0.292893 13.2929C0.105357 13.4804 0 13.7348 0 14V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V3C16 2.20435 15.6839 1.44129 15.1213 0.87868C14.5587 0.316071 13.7956 0 13 0Z" fill="black"/>
                </svg>
                <div onClick={logout}>Вийти</div>
            </motion.button>
        </aside>
     );
}

export default Sidebar;