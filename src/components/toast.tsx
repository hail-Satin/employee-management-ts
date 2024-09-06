import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = {
  show: (message, type, options = {}) => {
    toast(message, {
      position: 'bottom-right',
      autoClose: 5000,
      type,
      ...options, 
    });
  },
};

const ToastContainerComponent = () => (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );

  export { Toast, ToastContainerComponent };