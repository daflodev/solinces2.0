import axios from "axios";

export const ApiServicesThunks = async (data: any) => {
  const url = "http://201.219.216.217:2023/base/";

  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeJornada = async (data: any) => {
  const url = `http://201.219.216.217:2023/journy_sede/${data}`;

  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeJornadaPost = async (data) => {
  const url = `http://201.219.216.217:2023/journy_sede/`;

  const resp = await axios
    .post(url,data )
    .then((response) => {
      return response;
    });
  return resp;
};



export const ApiSedeNivel = async (data: any) => {
  const url = `http://201.219.216.217:2023/level_sede/${data}`;

  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeNivelPost = async (data) => {
  const url = `http://201.219.216.217:2023/level_sede/`;

  const resp = await axios
    .post(url,data )
    .then((response) => {
      return response;
    });
  return resp;
};

export const ApiServicesThunksMainMenu = async () => {
  const url = "http://201.219.216.217:2023/menu/";
  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};

export const ApiServicesThunksMainMenuOptionsItem = async (data: any) => {

  const url = "http://201.219.216.217:2023/menu_kids/";
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

export const ApiServicesGetPermissionOptions = async (data: any) => {
  const url = `http://201.219.216.217:2023/menu_list/`;
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiServicesUpdatePermissionOptions = async (data: any) => {
  const url = `http://201.219.216.217:2023/menu_list/post/`;
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiServicesGetAllRoles = async () => {
  const url = `http://201.219.216.217:2023/rols/`;
  const resp = await axios.get(url);
  return resp;
};

export const ApiServicesGetUserRoles = async (data: any) => {
  const url = `http://201.219.216.217:2023/officer_rols/${data}`;
  const resp = await axios.get(url);
  return resp;
};

export const ApiServicesUpdateUserRoles = async (data: any) => {
  const url = `http://201.219.216.217:2023/officer_rols`;
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};
export const ApiServicesMembrete = async (data: any) => {

    const url = "http://201.219.216.217:2023/upload_file/";
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
