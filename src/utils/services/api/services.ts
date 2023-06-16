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

export const ApiSedeJornadaPost = async (data) => {
  const url = `https://apisolinces.colombiaevaluadora.co/journy_sede/`;

  const resp = await axios
    .post(url,data )
    .then((response) => {
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
  // // estructura
  // const exampleJSonFormat = {
  //   url:"opcion"
  // }

  const url = "https://apisolinces.colombiaevaluadora.co/menu_kids/";
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiServicesPasswordChange = async (data: any) => {
  const tokenInformation = localStorage.getItem("user_token_information");
  const parserTokenInformation: any | null = tokenInformation
    ? JSON.parse(tokenInformation)
    : null;

  const user = parserTokenInformation?.sub;

  const url =
    "https://auth.colombiaevaluadora.edu.co/auth/admin/realms/solinces/users/" +
    user;

  const resp = await axios.put(url, data).then((response) => {
    return response;
  });
  return resp;
};
