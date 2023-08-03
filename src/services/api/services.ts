import { environment } from "@/enviroments/enviroment";
import axios from "axios";

const API_URL = environment.API_TEST;

export const ApiServicesThunks = async (data: any) => {
  const url = `${API_URL}/base/`;
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeInfra = async (data: any) => {
  const url = `${API_URL}/infrastructure_headquarters/${data}`;

  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeInfraPost = async (data) => {
  const url = `${API_URL}/infrastructure_headquarters/`;

  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};
export const ApiSedeAsyncInfraPut = async (FK_TSEDE, data) => {
  const url = `${API_URL}/infrastructure_headquarters/${FK_TSEDE}`;

  const resp = axios.put(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeInfraFK = async (data) => {
  const url = `${API_URL}/value_list/`;

  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedePeripherls = async (data: any) => {
  const url = `${API_URL}/mid_peripherals_headquarters/${data}`;

  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedePeripherlsPost = async (data) => {
  const url = `${API_URL}/mid_peripherals_headquarters`;

  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeAsyncPeripheralsPut = async (FK_TSEDE, data) => {
  const url = `${API_URL}/mid_peripherals_headquarters/${FK_TSEDE}`;

  const resp = axios.put(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeTecnology = async (data: any) => {
  const url = `${API_URL}/computing_headquarters/${data}`;

  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};

// mid_peripherals_headquarters

export const ApiSedeTecnologyPost = async (data) => {
  const url = `${API_URL}/computing_headquarters`;

  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeAsyncTecnologyPut = async (FK_TSEDE, data) => {
  const url = `${API_URL}/computing_headquarters/${FK_TSEDE}`;

  const resp = axios.put(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeJornada = async (data: any) => {
  const url = `${API_URL}/journy_sede/${data}`;
  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeJornadaPost = async (data) => {
  const url = `${API_URL}/journy_sede/`;
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeNivel = async (data: any) => {
  const url = `${API_URL}/level_sede/${data}`;
  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};

export const ApiSedeNivelPost = async (data) => {
  const url = `${API_URL}/level_sede/`;
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};

export const ApiServicesThunksMainMenu = async () => {
  const url = `${API_URL}/menu/`;
  const resp = await axios.get(url).then((response) => {
    return response;
  });
  return resp;
};

export const ApiServicesThunksMainMenuOptionsItem = async (data: any) => {
  const url = `${API_URL}/menu_kids/`;
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
  const url = environment.API_AUTH + user;
  const resp = await axios.put(url, data).then((response) => {
    return response;
  });
  return resp;
};
export const ApiServicesGetPermissionOptions = async (data: any) => {
  const url = `${API_URL}/menu_list/`;
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};
export const ApiServicesUpdatePermissionOptions = async (data: any) => {
  const url = `${API_URL}/menu_list/post/`;
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};
export const ApiServicesGetAllRoles = async () => {
  const url = `${API_URL}/rols/`;
  const resp = await axios.get(url);
  return resp;
};
export const ApiServicesGetUserRoles = async (data: any) => {
  const url = `${API_URL}/officer_rols/${data}`;
  const resp = await axios.get(url);
  return resp;
};
export const ApiServicesUpdateUserRoles = async (data: any) => {
  const url = `${API_URL}/officer_rols`;
  const resp = await axios.post(url, data).then((response) => {
    return response;
  });
  return resp;
};
export const ApiServicesMembrete = async (data: any) => {
  // const url = "${API_URL}/upload_file/";
  const url = `${API_URL}/upload_file/`;
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("idsede", data.idsede);
  formData.append("descripcion", data.descripcion);
  formData.append("etiqueta", data.etiqueta);
  const resp = await axios
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    });
  return resp;
};
