import { FC } from "react";
import classes from './Main.module.scss'
import User from "../User/User";
import { useTheme } from "../../ThemeProvider";

interface MainProps {
    className?: string;
}

const Main:FC<MainProps> = ({ className }) => {

    const { toggleTheme } = useTheme();
  

    return ( 
        <main className={`${classes.main} ${className}`}>
            <User/>
            <div className={classes.main__path}>
                <div className={classes.main__img}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.0123 7.99979C18.0123 7.73457 17.9069 7.48022 17.7194 7.29268C17.5319 7.10514 17.2775 6.99979 17.0123 6.99979C16.7471 6.99979 16.4927 7.10514 16.3052 7.29268C16.1176 7.48022 16.0123 7.73457 16.0123 7.99979H18.0123ZM4.01229 7.99979C4.01229 7.73457 3.90693 7.48022 3.71939 7.29268C3.53186 7.10514 3.2775 6.99979 3.01229 6.99979C2.74707 6.99979 2.49272 7.10514 2.30518 7.29268C2.11765 7.48022 2.01229 7.73457 2.01229 7.99979H4.01229ZM18.3053 10.7068C18.4939 10.8889 18.7465 10.9897 19.0087 10.9875C19.2709 10.9852 19.5217 10.88 19.7071 10.6946C19.8925 10.5092 19.9977 10.2584 20 9.99619C20.0022 9.73399 19.9014 9.48139 19.7193 9.29279L18.3053 10.7068ZM10.0123 0.999786L10.7193 0.292786C10.5318 0.105315 10.2775 0 10.0123 0C9.74712 0 9.49282 0.105315 9.30529 0.292786L10.0123 0.999786ZM0.305288 9.29279C0.209778 9.38503 0.133596 9.49538 0.0811869 9.61738C0.0287779 9.73939 0.00119157 9.87061 3.77567e-05 10.0034C-0.00111606 10.1362 0.0241857 10.2678 0.0744666 10.3907C0.124747 10.5136 0.199001 10.6253 0.292893 10.7192C0.386786 10.8131 0.498438 10.8873 0.621334 10.9376C0.744231 10.9879 0.87591 11.0132 1.00869 11.012C1.14147 11.0109 1.27269 10.9833 1.39469 10.9309C1.5167 10.8785 1.62704 10.8023 1.71929 10.7068L0.305288 9.29279ZM5.01229 19.9998H15.0123V17.9998H5.01229V19.9998ZM18.0123 16.9998V7.99979H16.0123V16.9998H18.0123ZM4.01229 16.9998V7.99979H2.01229V16.9998H4.01229ZM19.7193 9.29279L10.7193 0.292786L9.30529 1.70679L18.3053 10.7068L19.7193 9.29279ZM9.30529 0.292786L0.305288 9.29279L1.71929 10.7068L10.7193 1.70679L9.30529 0.292786ZM15.0123 19.9998C15.8079 19.9998 16.571 19.6837 17.1336 19.1211C17.6962 18.5585 18.0123 17.7954 18.0123 16.9998H16.0123C16.0123 17.265 15.9069 17.5194 15.7194 17.7069C15.5319 17.8944 15.2775 17.9998 15.0123 17.9998V19.9998ZM5.01229 17.9998C4.74707 17.9998 4.49272 17.8944 4.30518 17.7069C4.11765 17.5194 4.01229 17.265 4.01229 16.9998H2.01229C2.01229 17.7954 2.32836 18.5585 2.89097 19.1211C3.45358 19.6837 4.21664 19.9998 5.01229 19.9998V17.9998Z" fill="white"/>
                    </svg>
                </div>
                <div className={classes.main__text}>Головна</div>
                <div className={classes.main__img}>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.73276 5.3517C6.90387 5.52072 7 5.74993 7 5.98892C7 6.22792 6.90387 6.45713 6.73276 6.62615L1.56929 11.7248C1.48509 11.8109 1.38438 11.8796 1.27302 11.9268C1.16166 11.9741 1.04188 11.9989 0.920688 12C0.799493 12.001 0.679302 11.9782 0.567127 11.9329C0.454953 11.8876 0.353041 11.8206 0.26734 11.736C0.181639 11.6514 0.113864 11.5508 0.0679698 11.44C0.0220752 11.3292 -0.00101852 11.2105 3.43323e-05 11.0909C0.00108767 10.9712 0.0262671 10.8529 0.0741038 10.743C0.121941 10.633 0.191476 10.5335 0.278654 10.4504L4.7968 5.98892L0.278654 1.52745C0.112388 1.35747 0.0203867 1.1298 0.0224667 0.893476C0.0245461 0.657156 0.12054 0.431097 0.289772 0.263988C0.459005 0.0968771 0.687936 0.00208759 0.927258 3.33786e-05C1.16658 -0.00201988 1.39714 0.0888271 1.56929 0.253007L6.73276 5.3517Z" fill="white"/>
                    </svg>
                </div>
                <div className={classes.main__text}><span>Курси</span></div>
                <div className={classes.theme} onClick={toggleTheme} >
                    <svg  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10 0C10.185 0 10.3625 0.0735048 10.4933 0.204344C10.6242 0.335183 10.6977 0.51264 10.6977 0.697674V1.62791C10.6977 1.81294 10.6242 1.9904 10.4933 2.12124C10.3625 2.25208 10.185 2.32558 10 2.32558C9.81497 2.32558 9.63751 2.25208 9.50667 2.12124C9.37583 1.9904 9.30233 1.81294 9.30233 1.62791V0.697674C9.30233 0.51264 9.37583 0.335183 9.50667 0.204344C9.63751 0.0735048 9.81497 0 10 0ZM0 10C0 9.81497 0.0735048 9.63751 0.204344 9.50667C0.335183 9.37583 0.51264 9.30233 0.697674 9.30233H1.62791C1.81294 9.30233 1.9904 9.37583 2.12124 9.50667C2.25208 9.63751 2.32558 9.81497 2.32558 10C2.32558 10.185 2.25208 10.3625 2.12124 10.4933C1.9904 10.6242 1.81294 10.6977 1.62791 10.6977H0.697674C0.51264 10.6977 0.335183 10.6242 0.204344 10.4933C0.0735048 10.3625 0 10.185 0 10ZM17.6744 10C17.6744 9.81497 17.7479 9.63751 17.8788 9.50667C18.0096 9.37583 18.1871 9.30233 18.3721 9.30233H19.3023C19.4874 9.30233 19.6648 9.37583 19.7957 9.50667C19.9265 9.63751 20 9.81497 20 10C20 10.185 19.9265 10.3625 19.7957 10.4933C19.6648 10.6242 19.4874 10.6977 19.3023 10.6977H18.3721C18.1871 10.6977 18.0096 10.6242 17.8788 10.4933C17.7479 10.3625 17.6744 10.185 17.6744 10ZM10 17.6744C10.185 17.6744 10.3625 17.7479 10.4933 17.8788C10.6242 18.0096 10.6977 18.1871 10.6977 18.3721V19.3023C10.6977 19.4874 10.6242 19.6648 10.4933 19.7957C10.3625 19.9265 10.185 20 10 20C9.81497 20 9.63751 19.9265 9.50667 19.7957C9.37583 19.6648 9.30233 19.4874 9.30233 19.3023V18.3721C9.30233 18.1871 9.37583 18.0096 9.50667 17.8788C9.63751 17.7479 9.81497 17.6744 10 17.6744ZM15.5814 10C15.5814 11.4803 14.9934 12.8999 13.9466 13.9466C12.8999 14.9934 11.4803 15.5814 10 15.5814C8.51972 15.5814 7.10007 14.9934 6.05336 13.9466C5.00664 12.8999 4.4186 11.4803 4.4186 10C4.4186 8.51972 5.00664 7.10007 6.05336 6.05336C7.10007 5.00664 8.51972 4.4186 10 4.4186C11.4803 4.4186 12.8999 5.00664 13.9466 6.05336C14.9934 7.10007 15.5814 8.51972 15.5814 10ZM3.15464 2.77702C3.06997 2.81211 2.99304 2.86354 2.92825 2.92837V2.9293C2.79759 3.06012 2.72421 3.23744 2.72421 3.42233C2.72421 3.60721 2.79759 3.78454 2.92825 3.91535L3.29476 4.28C3.42701 4.40324 3.60194 4.47033 3.78269 4.46714C3.96343 4.46395 4.13588 4.39073 4.26371 4.26291C4.39153 4.13508 4.46475 3.96263 4.46794 3.78188C4.47113 3.60114 4.40404 3.42621 4.2808 3.29395L3.91522 2.92837C3.85043 2.86354 3.7735 2.81211 3.68883 2.77702C3.60415 2.74193 3.51339 2.72387 3.42173 2.72387C3.33008 2.72387 3.23932 2.74193 3.15464 2.77702ZM17.2737 3.42233C17.2737 3.23744 17.2003 3.06012 17.0696 2.9293C16.9388 2.79865 16.7615 2.72527 16.5766 2.72527C16.3917 2.72527 16.2144 2.79865 16.0836 2.9293L15.7189 3.29488C15.5957 3.42714 15.5286 3.60207 15.5318 3.78281C15.535 3.96356 15.6082 4.13601 15.736 4.26384C15.8639 4.39166 16.0363 4.46488 16.2171 4.46807C16.3978 4.47126 16.5727 4.40417 16.705 4.28093L17.0696 3.91535C17.2003 3.78454 17.2737 3.60721 17.2737 3.42233ZM15.9444 15.5668C15.8597 15.6019 15.7828 15.6533 15.718 15.7181V15.7191C15.5874 15.8499 15.514 16.0272 15.514 16.2121C15.514 16.397 15.5874 16.5743 15.718 16.7051L16.0845 17.0698C16.2168 17.193 16.3917 17.2601 16.5725 17.2569C16.7532 17.2537 16.9256 17.1805 17.0535 17.0527C17.1813 16.9248 17.2545 16.7524 17.2577 16.5716C17.2609 16.3909 17.1938 16.216 17.0706 16.0837L16.705 15.7181C16.6402 15.6533 16.5633 15.6019 16.4786 15.5668C16.3939 15.5317 16.3032 15.5136 16.2115 15.5136C16.1198 15.5136 16.0291 15.5317 15.9444 15.5668ZM4.48484 16.2121C4.48484 16.0272 4.41146 15.8499 4.2808 15.7191H4.27987C4.14906 15.5884 3.97174 15.515 3.78685 15.515C3.60197 15.515 3.42464 15.5884 3.29383 15.7191L2.92918 16.0847C2.86063 16.1485 2.80565 16.2255 2.76752 16.3111C2.72939 16.3967 2.70888 16.4891 2.70723 16.5828C2.70558 16.6764 2.72281 16.7695 2.7579 16.8564C2.79299 16.9432 2.84522 17.0222 2.91147 17.0884C2.97772 17.1547 3.05663 17.2069 3.1435 17.242C3.23038 17.2771 3.32343 17.2943 3.4171 17.2926C3.51078 17.291 3.60317 17.2705 3.68875 17.2324C3.77433 17.1942 3.85135 17.1392 3.91522 17.0707L4.2808 16.7051C4.41146 16.5743 4.48484 16.397 4.48484 16.2121Z" fill="white"/>
                    </svg>
                </div>
            </div>
        </main>
     );
}

export default Main;
