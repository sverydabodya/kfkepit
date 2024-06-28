import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./style.scss";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage.tsx';
import AuthPage from './components/AuthPage.tsx';
import NotFound from './components/NotFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    errorElement: <NotFound/>
  },
  {
    path: '/auth',
    element: <AuthPage/>
  }
])



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
