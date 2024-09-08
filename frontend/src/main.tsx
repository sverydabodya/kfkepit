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
import AuthProvider from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

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
    path: '/post/:id',
    element: <PostDetail/>
  },
  {
    path: '/subject',
    element:
    (
      <ProtectedRoute>
        <SubjectPage />
      </ProtectedRoute>
    ) 
  },
  {
    path: '/schedule',
    element: 
    (
      <ProtectedRoute>
        <SchedulePage />
      </ProtectedRoute>
    )
  },
  {
    path: '/materials/:subjectName',
    element: 
    (
      <ProtectedRoute>
        <MaterialsPage />
      </ProtectedRoute>
    )
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
