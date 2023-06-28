import axios from "axios";

export const ApiServicesThunks = async (data: any) => {
  const url = "http://localhost:3001/base/";

  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeJornada = async (data: any) => {
  const url = `http://localhost:3001/journy_sede/${data}`;

  const resp = await axios.get(url).then((response) => {
   
    return response;
  });
  return resp;
};

export const ApiServicesThunksMainMenu = async () => {
  const url = "http://localhost:3001/menu/";
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

  const url = "http://localhost:3001/menu_kids/";
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

export const ApiServicesMembrete = async (data: any) => {

    const url = "http://localhost:3001/upload_file/";
    const formData = new FormData();
    
    formData.append('file', data.file);
    formData.append('idsede', data.idsede);
    formData.append('descripcion',data.descripcion);
    formData.append('etiqueta', data.etiqueta);

    const resp = await axios.post(url, formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      return response;
    });
    return resp;

};