import { FC, ReactNode } from 'react';
import classes from './MainSubject.module.scss';
import { NavLink } from 'react-router-dom';

interface MainSubjectProps {
    children: ReactNode;
    subjectName: string
}

const MainSubject: FC<MainSubjectProps> = ({ children, subjectName }) => {
    return (
        <NavLink className={classes.material} to={`/materials/${subjectName}`}>
            <svg className='white' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.4615 2.22218H10.7692V0.740727C10.7692 0.544274 10.6882 0.355867 10.5439 0.216954C10.3997 0.0780407 10.204 0 10 0C9.79599 0 9.60033 0.0780407 9.45607 0.216954C9.31181 0.355867 9.23077 0.544274 9.23077 0.740727V2.22218H1.53846C1.13044 2.22218 0.739122 2.37826 0.450605 2.65609C0.162087 2.93392 0 3.31073 0 3.70364V14.8145C0 15.2075 0.162087 15.5843 0.450605 15.8621C0.739122 16.1399 1.13044 16.296 1.53846 16.296H5.32308L3.24519 18.796C3.11768 18.9494 3.05871 19.1454 3.08125 19.3407C3.1038 19.5361 3.206 19.7148 3.36538 19.8376C3.52477 19.9604 3.72828 20.0172 3.93114 19.9955C4.13401 19.9738 4.31961 19.8753 4.44712 19.7219L7.29231 16.296H12.7077L15.5529 19.7219C15.616 19.7979 15.6941 19.8611 15.7826 19.9081C15.8711 19.955 15.9684 19.9847 16.0689 19.9955C16.1693 20.0062 16.271 19.9978 16.368 19.9707C16.4651 19.9436 16.5557 19.8984 16.6346 19.8376C16.7135 19.7768 16.7792 19.7016 16.828 19.6164C16.8767 19.5311 16.9076 19.4375 16.9187 19.3407C16.9299 19.244 16.9212 19.1461 16.893 19.0527C16.8649 18.9592 16.8179 18.8719 16.7548 18.796L14.6769 16.296H18.4615C18.8696 16.296 19.2609 16.1399 19.5494 15.8621C19.8379 15.5843 20 15.2075 20 14.8145V3.70364C20 3.31073 19.8379 2.93392 19.5494 2.65609C19.2609 2.37826 18.8696 2.22218 18.4615 2.22218ZM18.4615 14.8145H1.53846V3.70364H18.4615V14.8145Z" fill="white"/>
            </svg>
            <svg className='black' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.4615 2.22218H10.7692V0.740727C10.7692 0.544274 10.6882 0.355867 10.5439 0.216954C10.3997 0.0780407 10.204 0 10 0C9.79599 0 9.60033 0.0780407 9.45607 0.216954C9.31181 0.355867 9.23077 0.544274 9.23077 0.740727V2.22218H1.53846C1.13044 2.22218 0.739122 2.37826 0.450605 2.65609C0.162087 2.93392 0 3.31073 0 3.70364V14.8145C0 15.2075 0.162087 15.5843 0.450605 15.8621C0.739122 16.1399 1.13044 16.296 1.53846 16.296H5.32308L3.24519 18.796C3.11768 18.9494 3.05871 19.1454 3.08125 19.3407C3.1038 19.5361 3.206 19.7148 3.36538 19.8376C3.52477 19.9604 3.72828 20.0172 3.93114 19.9955C4.13401 19.9738 4.31961 19.8753 4.44712 19.7219L7.29231 16.296H12.7077L15.5529 19.7219C15.616 19.7979 15.6941 19.8611 15.7826 19.9081C15.8711 19.955 15.9684 19.9847 16.0689 19.9955C16.1693 20.0062 16.271 19.9978 16.368 19.9707C16.4651 19.9436 16.5557 19.8984 16.6346 19.8376C16.7135 19.7768 16.7792 19.7016 16.828 19.6164C16.8767 19.5311 16.9076 19.4375 16.9187 19.3407C16.9299 19.244 16.9212 19.1461 16.893 19.0527C16.8649 18.9592 16.8179 18.8719 16.7548 18.796L14.6769 16.296H18.4615C18.8696 16.296 19.2609 16.1399 19.5494 15.8621C19.8379 15.5843 20 15.2075 20 14.8145V3.70364C20 3.31073 19.8379 2.93392 19.5494 2.65609C19.2609 2.37826 18.8696 2.22218 18.4615 2.22218ZM18.4615 14.8145H1.53846V3.70364H18.4615V14.8145Z" fill="black"/>
            </svg>
            <p className={classes.material__text}>{children}</p>
        </NavLink>
    );
}

export default MainSubject;
