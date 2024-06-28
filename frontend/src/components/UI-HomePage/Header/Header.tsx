import { FC, useEffect, useState } from "react";
import classes from './Header.module.scss';
import { NavLink } from "react-router-dom";



const Header:FC = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);


    const toggleMenu = (): void => {
        setIsOpen(!isOpen);
        document.body.classList.toggle('_lock', !isOpen);
    };
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    

    return ( 

        <header className={`${classes.header} ${isScrolled ? classes.scroll : ''}`}>
            <div className={classes.header__container}>
                <NavLink to={"/"} className={classes.header__logo}>
                    <div className={classes.header__img}>
                        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.406012 0L0 1.51986C2.01989 2.07098 3.83669 2.83158 5.4589 3.76915C3.68512 5.09662 2.51536 7.36621 2.51536 9.94443C2.51536 11.0894 2.74629 12.1734 3.15789 13.1414C1.33876 14.8568 0.239606 17.3022 0.239606 20.5119C0.239606 26.4653 3.81259 31.6071 8.98095 34.0735L6.42066 39.9999H8.11941L10.4199 34.6752C10.6709 34.7659 10.9243 34.8512 11.1811 34.9296C11.4779 35.162 11.7802 35.3718 12.0872 35.5602L11.0008 40H12.6082L13.5207 36.2669C14.0923 36.4813 14.6747 36.6227 15.2631 36.6886V39.9999H16.8213V36.6849C17.4776 36.6086 18.1261 36.4376 18.7601 36.1748L19.6948 39.9999H21.2997L20.1792 35.4163C20.4627 35.2291 20.742 35.0237 21.0159 34.7977C21.2834 34.7078 21.5486 34.6107 21.811 34.5066L24.1837 39.9998H25.8825L23.2313 33.8625C28.169 31.3217 31.5466 26.3001 31.5466 20.5118C31.5466 17.3857 30.5037 14.9846 28.7687 13.2767C29.2175 12.2747 29.472 11.1434 29.472 9.94451C29.472 7.37548 28.3108 5.11305 26.5479 3.78355C28.1852 2.82888 30.0038 2.06441 32 1.51977L31.594 0C29.4047 0.597363 27.4077 1.45256 25.6122 2.52692C22.7706 0.940013 19.1769 0.154647 15.5899 0.158859C12.1794 0.162902 8.77611 0.881136 6.03116 2.30236C4.34483 1.34264 2.47125 0.563502 0.406178 8.41843e-05L0.406012 0ZM15.5904 1.80253C18.6289 1.79883 21.6727 2.3673 24.1012 3.51646C20.3402 6.20274 17.6052 9.93482 16.0018 14.2803C14.3905 9.88883 11.6131 6.03765 7.61744 3.29493C9.93571 2.30573 12.7605 1.80573 15.5905 1.8022L15.5904 1.80253ZM8.62029 7.56163C10.2377 7.56163 11.5658 8.90283 11.5658 10.5367C11.5658 12.1707 10.2377 13.512 8.62029 13.512C7.00292 13.512 5.67466 12.1705 5.67466 10.5364C5.67466 8.9025 7.00292 7.56138 8.62029 7.56138V7.56163ZM23.5802 7.56163C25.1976 7.56163 26.5257 8.90283 26.5257 10.5367C26.5257 12.1707 25.1976 13.512 23.5802 13.512C21.9627 13.512 20.6345 12.1708 20.6345 10.5367C20.6345 8.90283 21.9626 7.56171 23.58 7.56171L23.5802 7.56163ZM14.378 14.3582C14.7158 15.2297 15.0052 16.127 15.247 17.0462L15.9999 19.907L16.7527 17.0462C16.9907 16.1395 17.2804 15.2474 17.6202 14.3744C18.8199 16.1829 20.7337 17.355 22.8922 17.355C24.096 17.355 25.2235 16.989 26.1943 16.353C25.8605 22.3208 24.6153 26.8588 22.9145 29.9492C20.9166 33.5799 18.3833 35.1946 15.95 35.1577C13.5169 35.1208 10.964 33.4165 8.96336 29.7607C7.25994 26.648 6.0154 22.1367 5.68242 16.2813C6.67761 16.9623 7.84562 17.3549 9.09534 17.3549C11.2602 17.3549 13.1791 16.1756 14.378 14.3579V14.3582ZM3.93457 14.539C3.97066 14.5904 4.0066 14.6418 4.04378 14.692C4.22428 21.5429 5.57695 26.8259 7.59976 30.5225C7.89328 31.0598 8.21435 31.5814 8.56169 32.0849C4.4999 29.7044 1.79771 25.406 1.79771 20.5122C1.79771 17.8146 2.56688 15.9229 3.93465 14.5391L3.93457 14.539ZM27.9686 14.6593C29.2634 16.0319 29.9884 17.8921 29.9884 20.5122C29.9884 25.2602 27.4442 29.4476 23.5832 31.8668C23.829 31.4918 24.0602 31.1074 24.2764 30.7143C26.2909 27.0537 27.6386 21.7733 27.8303 14.8391C27.877 14.7796 27.9239 14.7204 27.9687 14.6593H27.9686ZM8.1686 19.6333C7.85571 20.1608 7.66037 20.8572 7.66037 21.5908C7.66037 23.2809 8.66873 24.616 9.89636 24.616C10.941 24.616 11.8434 23.6401 12.0815 22.3026C11.6903 22.6477 11.2084 22.8366 10.7095 22.8366C9.37729 22.8366 8.25655 21.437 8.1686 19.6333ZM23.6681 19.8419C23.58 21.6456 22.4596 23.0452 21.1272 23.0452C20.6282 23.0452 20.1465 22.8564 19.7551 22.5112C19.9934 23.8488 20.8956 24.8247 21.9402 24.8247C23.1679 24.8247 24.1254 23.4896 24.1254 21.7995C24.1254 21.0658 23.9809 20.3695 23.6681 19.8419ZM17.9381 22.2821C17.6454 23.385 16.7453 24.2346 15.893 24.2346C15.0606 24.2346 14.1747 23.3875 13.8969 22.3388C13.8291 22.6249 13.7508 22.9309 13.7508 23.2481C13.7508 24.8675 14.7171 26.1465 15.8932 26.1465C17.0694 26.1465 18.0356 24.8675 18.0356 23.2481C18.0356 22.9124 18.0139 22.5827 17.9382 22.282H17.9381V22.2821ZM20.8593 27.9008C20.573 29.295 19.6748 30.3446 18.5708 30.3446C17.8839 30.3446 17.2576 29.9571 16.8181 29.3215C16.8796 30.8651 17.8239 32.1063 18.9604 32.1063C20.1365 32.1063 21.1027 30.7703 21.1027 29.151C21.1027 28.6956 20.9941 28.2854 20.8593 27.9007L20.8593 27.9008ZM11.2188 28.0142C11.1109 28.3653 11.0727 28.7462 11.0727 29.1511C11.0727 30.7703 12.039 32.1063 13.2151 32.1063C14.3516 32.1063 15.2472 30.865 15.3087 29.3214C14.8692 29.9569 14.2429 30.3445 13.5559 30.3445C12.4791 30.3445 11.5288 29.356 11.2189 28.0142L11.2188 28.0142Z" fill="white"/>
                        </svg>
                    </div>
                    <div className={classes.header__text}>КФКЕПІТ ІФНТУНГ</div>
                </NavLink>
                <div className={`${classes.body__icon} ${isOpen ? classes.open : ''}`} onClick={toggleMenu}>
                    <span></span>
                </div>
                <nav className={`${classes.header__menu} ${classes.menu} ${isOpen ? classes.open : ''}`}>
                    <ul className={classes.menu__items}>
                        <li className={classes.menu__item}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 20V6.66667L10 0L20 6.66667V20H12.5V12.2222H7.5V20H0Z" fill="black"/>
                            </svg>
                            <NavLink className={classes.menu__link} to={"/"}>Головна</NavLink>
                        </li>
                        <li className={classes.menu__item}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="20" height="20" rx="3" fill="black"/>
                                <path d="M6.1015 5L6 5.37996C6.50497 5.51774 6.95917 5.70789 7.36473 5.94229C6.92128 6.27416 6.62884 6.84155 6.62884 7.48611C6.62884 7.77234 6.68657 8.04336 6.78947 8.28535C6.33469 8.71419 6.0599 9.32555 6.0599 10.128C6.0599 11.6163 6.95315 12.9018 8.24524 13.5184L7.60516 15H8.02985L8.60498 13.6688C8.66772 13.6915 8.73108 13.7128 8.79527 13.7324C8.86947 13.7905 8.94505 13.8429 9.02179 13.8901L8.75021 15H9.15205L9.38018 14.0667C9.52307 14.1203 9.66868 14.1557 9.81578 14.1722V15H10.2053V14.1712C10.3694 14.1522 10.5315 14.1094 10.69 14.0437L10.9237 15H11.3249L11.0448 13.8541C11.1157 13.8073 11.1855 13.7559 11.254 13.6994C11.3209 13.6769 11.3871 13.6527 11.4528 13.6267L12.0459 15H12.4706L11.8078 13.4656C13.0422 12.8304 13.8867 11.575 13.8867 10.128C13.8867 9.34642 13.6259 8.74615 13.1922 8.31917C13.3044 8.06867 13.368 7.78584 13.368 7.48613C13.368 6.84387 13.0777 6.27826 12.637 5.94589C13.0463 5.70722 13.5009 5.5161 14 5.37994L13.8985 5C13.3512 5.14934 12.8519 5.36314 12.403 5.63173C11.6927 5.235 10.7942 5.03866 9.89749 5.03971C9.04486 5.04073 8.19403 5.22028 7.50779 5.57559C7.08621 5.33566 6.61781 5.14088 6.10154 5.00002L6.1015 5ZM9.89761 5.45063C10.6572 5.44971 11.4182 5.59183 12.0253 5.87911C11.0851 6.55068 10.4013 7.48371 10.0004 8.57007C9.59762 7.47221 8.90328 6.50941 7.90436 5.82373C8.48393 5.57643 9.19013 5.45143 9.89763 5.45055L9.89761 5.45063ZM8.15507 6.89041C8.55942 6.89041 8.89144 7.22571 8.89144 7.63416C8.89144 8.04268 8.55942 8.378 8.15507 8.378C7.75073 8.378 7.41867 8.04262 7.41867 7.6341C7.41867 7.22562 7.75073 6.89034 8.15507 6.89034V6.89041ZM11.8951 6.89041C12.2994 6.89041 12.6314 7.22571 12.6314 7.63416C12.6314 8.04268 12.2994 8.378 11.8951 8.378C11.4907 8.378 11.1586 8.0427 11.1586 7.63418C11.1586 7.22571 11.4906 6.89043 11.895 6.89043L11.8951 6.89041ZM9.5945 8.58955C9.67895 8.80743 9.7513 9.03176 9.81176 9.26156L9.99997 9.97676L10.1882 9.26156C10.2477 9.03488 10.3201 8.81186 10.405 8.59361C10.705 9.04572 11.1834 9.33876 11.723 9.33876C12.024 9.33876 12.3059 9.24724 12.5486 9.08826C12.4651 10.5802 12.1538 11.7147 11.7286 12.4873C11.2292 13.395 10.5958 13.7986 9.9875 13.7894C9.37924 13.7802 8.741 13.3541 8.24084 12.4402C7.81499 11.662 7.50385 10.5342 7.4206 9.07032C7.6694 9.24059 7.96141 9.33872 8.27383 9.33872C8.81505 9.33872 9.29478 9.04391 9.5945 8.58948V8.58955ZM6.98364 8.63476C6.99267 8.6476 7.00165 8.66045 7.01094 8.673C7.05607 10.3857 7.39424 11.7065 7.89994 12.6306C7.97332 12.765 8.05359 12.8953 8.14042 13.0212C7.12497 12.4261 6.44943 11.3515 6.44943 10.128C6.44943 9.45365 6.64172 8.98074 6.98366 8.63478L6.98364 8.63476ZM12.9922 8.66483C13.3158 9.00798 13.4971 9.47302 13.4971 10.128C13.4971 11.3151 12.8611 12.3619 11.8958 12.9667C11.9572 12.873 12.0151 12.7769 12.0691 12.6786C12.5727 11.7634 12.9096 10.4433 12.9576 8.70979C12.9693 8.6949 12.981 8.6801 12.9922 8.66483H12.9922ZM8.04215 9.90833C7.96393 10.0402 7.91509 10.2143 7.91509 10.3977C7.91509 10.8202 8.16718 11.154 8.47409 11.154C8.73525 11.154 8.96084 10.91 9.02037 10.5756C8.92258 10.6619 8.80211 10.7091 8.67739 10.7091C8.34432 10.7091 8.06414 10.3593 8.04215 9.90833ZM11.917 9.96048C11.895 10.4114 11.6149 10.7613 11.2818 10.7613C11.1571 10.7613 11.0366 10.7141 10.9388 10.6278C10.9983 10.9622 11.2239 11.2062 11.4851 11.2062C11.792 11.2062 12.0313 10.8724 12.0313 10.4499C12.0313 10.2665 11.9952 10.0924 11.917 9.96048ZM10.4845 10.5705C10.4114 10.8463 10.1863 11.0586 9.97325 11.0586C9.76516 11.0586 9.54368 10.8469 9.47422 10.5847C9.45727 10.6562 9.4377 10.7327 9.4377 10.812C9.4377 11.2169 9.67926 11.5366 9.97331 11.5366C10.2674 11.5366 10.5089 11.2169 10.5089 10.812C10.5089 10.7281 10.5035 10.6457 10.4846 10.5705H10.4845V10.5705ZM11.2148 11.9752C11.1432 12.3237 10.9187 12.5861 10.6427 12.5861C10.471 12.5861 10.3144 12.4893 10.2045 12.3304C10.2199 12.7163 10.456 13.0266 10.7401 13.0266C11.0341 13.0266 11.2757 12.6926 11.2757 12.2878C11.2757 12.1739 11.2485 12.0713 11.2148 11.9752L11.2148 11.9752ZM8.80469 12.0036C8.77772 12.0913 8.76818 12.1866 8.76818 12.2878C8.76818 12.6926 9.00974 13.0266 9.30377 13.0266C9.58791 13.0266 9.8118 12.7163 9.82718 12.3304C9.7173 12.4892 9.56073 12.5861 9.38897 12.5861C9.11977 12.5861 8.88221 12.339 8.80471 12.0035L8.80469 12.0036Z" fill="white"/>
                            </svg>
                            <NavLink className={classes.menu__link} to={"/"}>Новини</NavLink>
                        </li>
                    </ul>
                    <div className={classes.header__link}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 4.44444L7.6 6L10.2 8.88889H0V11.1111H10.2L7.6 14L9 15.5556L14 10L9 4.44444ZM18 17.7778H10V20H18C19.1 20 20 19 20 17.7778V2.22222C20 1 19.1 0 18 0H10V2.22222H18V17.7778Z" fill="black"/>
                            </svg>
                            <NavLink to={"/auth"}>Увійти</NavLink>
                    </div>
                    <div className={classes.header__socials}>
                        <a href="">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.25 0H17.75C21.75 0 25 3.25 25 7.25V17.75C25 19.6728 24.2362 21.5169 22.8765 22.8765C21.5169 24.2362 19.6728 25 17.75 25H7.25C3.25 25 0 21.75 0 17.75V7.25C0 5.32718 0.763837 3.48311 2.12348 2.12348C3.48311 0.763837 5.32718 0 7.25 0ZM7 2.5C5.80653 2.5 4.66193 2.97411 3.81802 3.81802C2.97411 4.66193 2.5 5.80653 2.5 7V18C2.5 20.4875 4.5125 22.5 7 22.5H18C19.1935 22.5 20.3381 22.0259 21.182 21.182C22.0259 20.3381 22.5 19.1935 22.5 18V7C22.5 4.5125 20.4875 2.5 18 2.5H7ZM19.0625 4.375C19.4769 4.375 19.8743 4.53962 20.1674 4.83265C20.4604 5.12567 20.625 5.5231 20.625 5.9375C20.625 6.3519 20.4604 6.74933 20.1674 7.04235C19.8743 7.33538 19.4769 7.5 19.0625 7.5C18.6481 7.5 18.2507 7.33538 17.9576 7.04235C17.6646 6.74933 17.5 6.3519 17.5 5.9375C17.5 5.5231 17.6646 5.12567 17.9576 4.83265C18.2507 4.53962 18.6481 4.375 19.0625 4.375ZM12.5 6.25C14.1576 6.25 15.7473 6.90848 16.9194 8.08058C18.0915 9.25268 18.75 10.8424 18.75 12.5C18.75 14.1576 18.0915 15.7473 16.9194 16.9194C15.7473 18.0915 14.1576 18.75 12.5 18.75C10.8424 18.75 9.25268 18.0915 8.08058 16.9194C6.90848 15.7473 6.25 14.1576 6.25 12.5C6.25 10.8424 6.90848 9.25268 8.08058 8.08058C9.25268 6.90848 10.8424 6.25 12.5 6.25ZM12.5 8.75C11.5054 8.75 10.5516 9.14509 9.84835 9.84835C9.14509 10.5516 8.75 11.5054 8.75 12.5C8.75 13.4946 9.14509 14.4484 9.84835 15.1517C10.5516 15.8549 11.5054 16.25 12.5 16.25C13.4946 16.25 14.4484 15.8549 15.1517 15.1517C15.8549 14.4484 16.25 13.4946 16.25 12.5C16.25 11.5054 15.8549 10.5516 15.1517 9.84835C14.4484 9.14509 13.4946 8.75 12.5 8.75Z" fill="black"/>
                            </svg>
                        </a>
                        <a href="">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 12.5766C25 5.63055 19.4038 0 12.5016 0C5.59617 0.0015623 0 5.63055 0 12.5781C0 18.8539 4.5713 24.0564 10.5456 25V16.212H7.37408V12.5781H10.5487V9.80503C10.5487 6.65386 12.4156 4.91345 15.27 4.91345C16.6385 4.91345 18.0681 5.15873 18.0681 5.15873V8.25209H16.4917C14.9403 8.25209 14.456 9.22229 14.456 10.2175V12.5766H17.9212L17.3681 16.2105H14.4544V24.9984C20.4287 24.0548 25 18.8523 25 12.5766Z" fill="black"/>
                            </svg>
                        </a>
                        <a href="">
                            <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6607 3.91667C15.7452 2.83281 15.2407 1.44088 15.2411 0H11.1027V17.2222C11.0708 18.1542 10.6913 19.037 10.0443 19.6846C9.39731 20.3323 8.53319 20.6943 7.63393 20.6944C5.73214 20.6944 4.15179 19.0833 4.15179 17.0833C4.15179 14.6944 6.375 12.9028 8.66518 13.6389V9.25C4.04464 8.61111 0 12.3333 0 17.0833C0 21.7083 3.69643 25 7.62054 25C11.8259 25 15.2411 21.4583 15.2411 17.0833V8.34722C16.9192 9.59701 18.934 10.2676 21 10.2639V5.97222C21 5.97222 18.4821 6.09722 16.6607 3.91667Z" fill="black"/>
                            </svg>
                        </a>
                        <a href="">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 5.6 25 12.5 25C19.4 25 25 19.4 25 12.5C25 5.6 19.4 0 12.5 0ZM18.3 8.5C18.1125 10.475 17.3 15.275 16.8875 17.4875C16.7125 18.425 16.3625 18.7375 16.0375 18.775C15.3125 18.8375 14.7625 18.3 14.0625 17.8375C12.9625 17.1125 12.3375 16.6625 11.275 15.9625C10.0375 15.15 10.8375 14.7 11.55 13.975C11.7375 13.7875 14.9375 10.875 15 10.6125C15.0087 10.5727 15.0075 10.5315 14.9966 10.4923C14.9857 10.453 14.9654 10.4171 14.9375 10.3875C14.8625 10.325 14.7625 10.35 14.675 10.3625C14.5625 10.3875 12.8125 11.55 9.4 13.85C8.9 14.1875 8.45 14.3625 8.05 14.35C7.6 14.3375 6.75 14.1 6.1125 13.8875C5.325 13.6375 4.7125 13.5 4.7625 13.0625C4.7875 12.8375 5.1 12.6125 5.6875 12.375C9.3375 10.7875 11.7625 9.7375 12.975 9.2375C16.45 7.7875 17.1625 7.5375 17.6375 7.5375C17.7375 7.5375 17.975 7.5625 18.125 7.6875C18.25 7.7875 18.2875 7.925 18.3 8.025C18.2875 8.1 18.3125 8.325 18.3 8.5Z" fill="black"/>
                            </svg>
                        </a>
                    </div>
                    <div className={classes.header__copy}><span>ⓒ</span> STK 2023</div>
                </nav>
            </div>
        </header>

     );
}

export default Header;