import React from 'react';
import './index.css';
import { RouterProvider, } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import router from "./router/index"
import { NotificationsProvider } from '@mantine/notifications';


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1A5557',
    },
    secondary: {
      main: '#EBC26B',
    },
  },
 });

export default function App(){
  return(
    
      <ThemeProvider theme = {theme}>
        <NotificationsProvider position="top-center" zIndex={2077}>
          <RouterProvider router={router} />
        </NotificationsProvider>
      </ThemeProvider>
    
  )
}
