import { UserManager } from "oidc-client";

const currentUrl = new URL(window.location.href);

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

