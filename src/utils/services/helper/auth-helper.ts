import { URL_BACKEND } from "@/utils/constants";
import axios from "axios";
import { UserManager } from "oidc-client";


const currentUrl = new URL(window.location.href);
// @ts-ignore
const getDomaine = (hostName : any) => {
  //TODO: proceso para extraer el dominio  demo.colombiaevaluadora.co
};

const get_client_id = currentUrl.hostname;

const settings = {
  authority: "https://auth.colombiaevaluadora.edu.co/auth/realms/solinces/",
  client_id: `${get_client_id}`,
  redirect_uri: `${currentUrl.origin}/signin-callback.html`,
  response_type: "code",
  scope: "openid",
  post_logout_redirect_uri: `${currentUrl.origin}/`,
};

const userManager = new UserManager(settings);

export const getUser = () => {
  return userManager.getUser();
};

export const login = () => {
  return userManager.signinRedirect();
};

export const logout = () => {
  return userManager.signoutRedirect();
};

export const endSesionClose = () => {
  const pk_sesion = localStorage.getItem('pk_sesion');
  const token = localStorage.getItem("tk_sesion");

  debugger
      const data = {
        "pk_sesion": pk_sesion
      }

      axios
      .put(URL_BACKEND + "/sesion", data, {
        headers: {
          "Authorization": "Bearer " + token,
        }
      })
      .then((response) => {
        console.log("Respuesta del endpoint:", response.data);
      })
      .catch((error) => {
        console.error("Error al llamar al endpoint:", error);
      });
}
