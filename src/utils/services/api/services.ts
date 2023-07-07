import axios from "axios";

export const ApiServicesThunks = async (data: any) => {
  const url = "https://apisolinces.colombiaevaluadora.co/base/";

  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeJornada = async (data: any) => {
  const url = `https://apisolinces.colombiaevaluadora.co/journy_sede/${data}`;

  const resp = await axios.get(url).then((response) => {
   
    return response;
  });
  return resp;
};

export const ApiServicesThunksMainMenu = async () => {
  const url = "https://apisolinces.colombiaevaluadora.co/menu/";
  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};

export const ApiServicesThunksMainMenuOptionsItem = async (data: any) => {

  const url = "https://apisolinces.colombiaevaluadora.co/menu_kids/";
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiServicesPasswordChange = async (data: any) => {

  const tokenInformation = localStorage.getItem('user_token_information');
  const parserTokenInformation: any | null = tokenInformation ? JSON.parse(tokenInformation) : null;

  const user = parserTokenInformation?.sub

  const url = "https://auth.colombiaevaluadora.edu.co/auth/admin/realms/solinces/users/" + user;

  const resp = await axios.put(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiServicesGetPermissionOptions = async (data: any) => {
  const url = `https://apisolinces.colombiaevaluadora.co/menu_list/`;
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiServicesUpdatePermissionOptions = async (data: any) => {
  const url = `https://apisolinces.colombiaevaluadora.co/menu_list/post/`;
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiServicesGetAllRoles = async () => {
  const url = `https://apisolinces.colombiaevaluadora.co/rols/`;
  const resp = await axios.get(url);
  return resp;
};

export const ApiServicesGetUserRoles = async (data: any) => {
  const url = `https://apisolinces.colombiaevaluadora.co/officer_rols/${data}`;
  const resp = await axios.get(url);
  return resp;
};

export const ApiServicesUpdateUserRoles = async (data: any) => {
  const url = `https://apisolinces.colombiaevaluadora.co/officer_rols`;
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};