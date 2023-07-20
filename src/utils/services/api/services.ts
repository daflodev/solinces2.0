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
<<<<<<< HEAD
  const url = `http://201.219.216.217:2023/journy_sede/${data}`;

=======
  const url = `https://apisolinces.colombiaevaluadora.co/journy_sede/${data}`;
>>>>>>> f33f3c3ed19a1e9d037269987a890304fc9736e5
  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};
export const ApiSedeJornadaPost = async (data) => {
<<<<<<< HEAD
  const url = `http://201.219.216.217:2023/journy_sede/`;

=======
  const url = `https://apisolinces.colombiaevaluadora.co/journy_sede/`;
>>>>>>> f33f3c3ed19a1e9d037269987a890304fc9736e5
  const resp = await axios
    .post(url,data )
    .then((response) => {
      return response;
    });
  return resp;
};
export const ApiSedeNivel = async (data: any) => {
<<<<<<< HEAD
  const url = `http://201.219.216.217:2023/level_sede/${data}`;

=======
  const url = `https://apisolinces.colombiaevaluadora.co/level_sede/${data}`;
>>>>>>> f33f3c3ed19a1e9d037269987a890304fc9736e5
  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};
export const ApiSedeNivelPost = async (data) => {
<<<<<<< HEAD
  const url = `http://201.219.216.217:2023/level_sede/`;

=======
  const url = `https://apisolinces.colombiaevaluadora.co/level_sede/`;
>>>>>>> f33f3c3ed19a1e9d037269987a890304fc9736e5
  const resp = await axios
    .post(url,data )
    .then((response) => {
      return response;
    });
  return resp;
};
export const ApiServicesThunksMainMenu = async () => {
<<<<<<< HEAD
  const url = "http://201.219.216.217:2023/menu/";
=======
  const url = "https://apisolinces.colombiaevaluadora.co/menu/";
>>>>>>> f33f3c3ed19a1e9d037269987a890304fc9736e5
  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};
export const ApiServicesThunksMainMenuOptionsItem = async (data: any) => {
<<<<<<< HEAD

  const url = "http://201.219.216.217:2023/menu_kids/";
=======
  const url = "https://apisolinces.colombiaevaluadora.co/menu_kids/";
>>>>>>> f33f3c3ed19a1e9d037269987a890304fc9736e5
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
<<<<<<< HEAD
  const url = `http://201.219.216.217:2023/menu_list/`;
=======
  const url = `https://apisolinces.colombiaevaluadora.co/menu_list/`;
>>>>>>> f33f3c3ed19a1e9d037269987a890304fc9736e5
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};
export const ApiServicesUpdatePermissionOptions = async (data: any) => {
<<<<<<< HEAD
  const url = `http://201.219.216.217:2023/menu_list/post/`;
=======
  const url = `https://apisolinces.colombiaevaluadora.co/menu_list/post/`;
>>>>>>> f33f3c3ed19a1e9d037269987a890304fc9736e5
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};
export const ApiServicesGetAllRoles = async () => {
<<<<<<< HEAD
  const url = `http://201.219.216.217:2023/rols/`;
=======
  const url = `https://apisolinces.colombiaevaluadora.co/rols/`;
>>>>>>> f33f3c3ed19a1e9d037269987a890304fc9736e5
  const resp = await axios.get(url);
  return resp;
};
export const ApiServicesGetUserRoles = async (data: any) => {
<<<<<<< HEAD
  const url = `http://201.219.216.217:2023/officer_rols/${data}`;
=======
  const url = `https://apisolinces.colombiaevaluadora.co/officer_rols/${data}`;
>>>>>>> f33f3c3ed19a1e9d037269987a890304fc9736e5
  const resp = await axios.get(url);
  return resp;
};
export const ApiServicesUpdateUserRoles = async (data: any) => {
<<<<<<< HEAD
  const url = `http://201.219.216.217:2023/officer_rols`;
=======
  const url = `https://apisolinces.colombiaevaluadora.co/officer_rols`;
>>>>>>> f33f3c3ed19a1e9d037269987a890304fc9736e5
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};
export const ApiServicesMembrete = async (data: any) => {
<<<<<<< HEAD

    const url = "http://201.219.216.217:2023/upload_file/";
=======
    const url = "https://apisolinces.colombiaevaluadora.co/upload_file/";
>>>>>>> f33f3c3ed19a1e9d037269987a890304fc9736e5
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