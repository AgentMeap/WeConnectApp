import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@pages/RootLayout';
import ModalProvider from '@context/ModalProvider';
import HomePage from '@pages/HomePage';
import { ThemeProvider } from '@mui/material';
import theme from '@configs/muiConfig';
import AuthLayout from '@pages/auth/AuthLayout';
import RegisterPage from '@pages/auth/RegisterPage';
import LoginPage from '@pages/auth/LoginPage';
import OTPVerifyPage from '@pages/auth/OTPVerifyPage';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/register',
            element: <RegisterPage />,
          },
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/verify-otp',
            element: <OTPVerifyPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </ThemeProvider>
  </Provider>,
);
