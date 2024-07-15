import React from 'react'
import ReactDOM from 'react-dom/client'
import "./style.scss";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage.tsx';
import AuthPage from './components/AuthPage.tsx';
import NotFound from './components/NotFound.tsx';
import NewsPage from './components/NewsPage.tsx';
import SubjectPage from './components/SubjectPage.tsx';
import SchedulePage from './components/SchedulePage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <NotFound/>
  },
  {
    path: '/auth',
    element: <AuthPage/>
  },
  {
    path: '/news',
    element: <NewsPage/>
  },
  {
    path: '/subject',
    element: <SubjectPage/>
  },
  {
    path: '/schedule',
    element: <SchedulePage/>
  }
])



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
