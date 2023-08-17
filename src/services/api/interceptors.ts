import axios from "axios";

import { getUser, login } from "../helper/auth-helper";

import { sessionInformationStore } from "../../store/userInformationStore";
import { shallow } from "zustand/shallow";
import { environment } from "@/enviroments/enviroment";

const loginMethod = () => {
  localStorage.setItem("current_rol", "");
  login();
};

const interceptor = () => {
  const { currentRol } = sessionInformationStore(
    (state) => ({
      currentRol: state.currentRol,
    }),
    shallow
  );

  axios.interceptors.request.use((config) => {
    return getUser().then((user: any) => {
     
      
        if (user && user.access_token) {
        // @ts-ignore
        config.headers = {
          Authorization: `Bearer ${user.access_token}`,
          // Authorization: `Bearer ${TOKEN}`,
          rol: `${currentRol}`,
          // "x-api-key": "LjHQH2MA.ufs0pVGkji3ciFeW7aE743bQ5pSJsFnM",
        };
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
