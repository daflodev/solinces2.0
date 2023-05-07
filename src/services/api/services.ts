import axios from "axios";

export const ApiServicesThunks = async (data: any) => {
  const url = "https://apisolinces.colombiaevaluadora.co/base/";

  const resp = await axios.post(url, data).then((response) => {
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

