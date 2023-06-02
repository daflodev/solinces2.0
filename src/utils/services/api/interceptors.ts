import { useEffect } from 'react';
import axios from "axios";

import { getUser, login } from "../helper/auth-helper";

import { sessionInformationStore } from '../../../store/userInformationStore';
import shallow from 'zustand/shallow';

const loginMethod = () => {
  login();
};

const interceptor = () => {

  const { currentRol } = sessionInformationStore(
    (state) => ({
        currentRol: state.currentRol,
    }),
    shallow
  );

  console.log("a rol: ", currentRol)

  axios.interceptors.request.use((config) => {

    return getUser().then((user: any) => {
      if (user && user.access_token) {
        config.headers ={
          Authorization: `Bearer ${user.access_token}`,
          rol: `${currentRol}`,
        } 
      } else {
        loginMethod();
      }

      return config;
    });
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      let user_token = localStorage.getItem("_tk_")
        ? localStorage.getItem("_tk_")
        : null;
      if (
        error.response.status === 401 &&
        error.response.data.code_transaction === "ERROR_AUTH" &&
        user_token
      ) {
        localStorage.removeItem("_tk_");
        localStorage.removeItem("_rf_");
        window.location.replace("/");
      }

      return Promise.reject(error);
    }
  );
};

export default interceptor;
