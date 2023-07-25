import axios from "axios";
export const ApiServicesThunks = async (data: any) => {
  const url = "https://apisolinces.colombiaevaluadora.co/base/";
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeInfra = async (data: any) => {
  const url = `https://apisolinces.colombiaevaluadora.co/infrastructure_headquarters/${data}`;

  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeInfraPost = async (data) => {
  const url = `https://apisolinces.colombiaevaluadora.co/infrastructure_headquarters/`;

  const resp = await axios
    .post(url,data )
    .then((response) => {
      return response;
    });
  return resp;
};
export const ApiSedeAsyncInfraPut = async (FK_TSEDE, data) => {
  const url = `https://apisolinces.colombiaevaluadora.co/infrastructure_headquarters/${FK_TSEDE}`;

  const resp = axios
    .put(url,data)
    .then((response) => {
      return response;
    });
  return resp;
};

export const ApiSedeInfraFK = async (data) => {
  const url = `https://apisolinces.colombiaevaluadora.co/value_list/`;

  const resp = await axios
    .post(url,data )
    .then((response) => {
     
      return response;
    });
  return resp;
};

export const ApiSedePeripherls = async (data: any) => {
  const url = `https://apisolinces.colombiaevaluadora.co/mid_peripherals_headquarters/${data}`;

  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedePeripherlsPost = async (data) => {
  const url = `https://apisolinces.colombiaevaluadora.co/mid_peripherals_headquarters`;

  const resp = await axios
    .post(url,data )
    .then((response) => {
      return response;
    });
  return resp;
};

export const ApiSedeAsyncPeripheralsPut = async (FK_TSEDE, data) => {
  const url = `https://apisolinces.colombiaevaluadora.co/mid_peripherals_headquarters/${FK_TSEDE}`;

  const resp = axios
    .put(url,data)
    .then((response) => {
      return response;
    });
  return resp;
};

export const ApiSedeTecnology = async (data: any) => {
  const url = `https://apisolinces.colombiaevaluadora.co/computing_headquarters/${data}`;

  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};

// mid_peripherals_headquarters

export const ApiSedeTecnologyPost = async (data) => {
  const url = `https://apisolinces.colombiaevaluadora.co/computing_headquarters`;

  const resp = await axios
    .post(url,data )
    .then((response) => {
      return response;
    });
  return resp;
};

export const ApiSedeAsyncTecnologyPut = async (FK_TSEDE, data) => {
  const url = `https://apisolinces.colombiaevaluadora.co/computing_headquarters/${FK_TSEDE}`;

  const resp = axios
    .put(url,data)
    .then((response) => {
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

export const ApiSedeNivel = async (data: any) => {
  const url = `https://apisolinces.colombiaevaluadora.co/level_sede/${data}`;
  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeNivelPost = async (data) => {
  const url = `https://apisolinces.colombiaevaluadora.co/level_sede/`;
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
export const ApiServicesMembrete = async (data: any) => {
    const url = "https://apisolinces.colombiaevaluadora.co/upload_file/";
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