import React from 'react';
import ReactDOM from 'react-dom/client';
import "./style.scss";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import NotFound from './components/NotFound';
import NewsPage from './components/NewsPage';
import SubjectPage from './components/SubjectPage';
import SchedulePage from './components/SchedulePage';
import ThemeProvider from './components/ThemeProvider';
import MaterialsPage from './components/MaterialsPage';
import PostDetail from './components/PostDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFound />
  },
  {
    path: '/auth',
    element: <AuthPage />
  },
  {
    path: '/news',
    element: <NewsPage />
  },
  {
    path: '/subject',
    element: <SubjectPage />
  },
  {
    path: '/schedule',
    element: <SchedulePage />
  },
  {
    path: '/materials',
    element: <MaterialsPage />
  },
  {
    path: '/post/:id',
    element: <PostDetail/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
