import {
  ApiServicesThunks,
  ApiServicesThunksMainMenu,
  ApiServicesThunksMainMenuOptionsItem,
  ApiServicesPasswordChange,
  ApiSedeJornada,
  ApiServicesGetPermissionOptions,
  ApiServicesUpdatePermissionOptions,
  ApiServicesGetAllRoles,
  ApiServicesGetUserRoles,
  ApiServicesUpdateUserRoles,
  ApiServicesMembrete,
  ApiSedeJornadaPost,
  ApiSedeNivelPost,
  ApiSedeNivel,
  ApiSedePeripherls,
  ApiSedeAsyncPeripheralsPut,
  ApiSedeAsyncInfraPut,
  ApiSedeAsyncTecnologyPut,
  ApiSedeInfra,
  ApiSedeInfraFK,
  ApiSedeInfraPost,
  ApiSedePeripherlsPost,
  ApiSedeTecnology
} from "./services";

export const apiGetThunksAsync = async (data: any) => {
  const resp = await ApiServicesThunks(data)
    .then((response) => {
      // console.log(response)
      const getdata = response.data.results.map((d: any, i: any) => ({
        ...d,
        key: i,
      }));

      const columnsInformation = response.data?.colums;
      return {
        getdata,
        columnsInformation,
      };
    })
    // @ts-ignore
    .catch((error) => {
      // @ts-ignore
      let results = {
        status: "error",
        message: "No existen datos para la consulta",
      };
    });

  return resp;
};

export const apiPostThunksAsync = async (data: any) => {
  const resp = await ApiServicesThunks(data)
    .then((response) => {
      const getdata = response.data.response;
      return getdata;
    })
    .catch((error) => {
      return error.response;
    });

  return resp;
};

export const apiGetThunksAsyncSedeJornada = async (data: any) => {
  const resp = await ApiSedeJornada(data)
    .then((response) => {
      const getdata = response.data;
      return getdata;
    })
    .catch((error) => {
      return error.response;
    });

  return resp;
};


export const apiPostThunksAsyncSedeNivel= async (data: any) => {
  const resp = await ApiSedeNivelPost(data)
    .then((response) => {
      const getdata = response.data;
      return getdata;
    })
    .catch((error) => {
      return error.response;
    });

  return resp;
};


export const apiGetThunksAsyncSedeNivel = async (data: any) => {
  const resp = await ApiSedeNivel(data)
    .then((response) => {
      const getdata = response.data;
      return getdata;
    })
    .catch((error) => {
      return error.response;
    });

  return resp;
};


export const apiPostThunksAsyncSedeJornada= async (data: any) => {
  const resp = await ApiSedeJornadaPost(data)
    .then((response) => {
      const getdata = response.data;
      return getdata;
    })
    .catch((error) => {
      return error.response;
    });

  return resp;
};

// data categorias FK_TLV_
export const apiFKThunksAsyncSedeInfra = async (data: any) => {
const resp = await ApiSedeInfraFK(data)
  .then((response) => {
    const getdata = response.data.data;
    return getdata;
  })
  .catch((error) => {
    return error.response;
  });

return resp;
};

// thunks sede infraestructura

export const apiPostThunksAsyncSedeInfra = async (data: any) => {
const resp = await ApiSedeInfraPost(data)
  .then((response) => {
   
    const getdata = response;
    return getdata;
  })
  .catch((error) => {
    return error.response;
  });

return resp;
};

export const apiPutSedeInfra = async (FK_TSEDE, data) => {
const resp = ApiSedeAsyncInfraPut(FK_TSEDE, data)
  .then((response) => {
    const editData = response;
    return editData;
  })
  .catch((error) => {
    return error.response;
  });
return resp;
};

export const apiGetThunksAsyncSedeInfra = async (data: any) => {
const resp = await ApiSedeInfra(data)
  .then((response) => {
    const getdata = response.data.data[0];
    return getdata;
  })
  .catch((error) => {
    return error.response;
  });

return resp;
};

// thunks sede tecnologica

export const apiPostThunksAsyncSedeTecnology = async (data: any) => {
const resp = await ApiSedeTecnology(data)
  .then((response) => {
    const getdata = response;
    return getdata;
  })
  .catch((error) => {
    return error.response;
  });

return resp;
};

export const apiPutSedeTecnology = async (FK_TSEDE, data) => {
const resp = ApiSedeAsyncTecnologyPut(FK_TSEDE, data)
  .then((response) => {
    const editData = response;
    return editData;
  })
  .catch((error) => {
    return error.response;
  });
return resp;
};

export const apiGetThunksAsyncSedeTecnology = async (data: any) => {
const resp = await ApiSedeTecnology(data)
  .then((response) => {
    const getdata = response.data.data[0];
    return getdata;
  })
  .catch((error) => {
    return error.response;
  });

return resp;
};


//perifericos medios

export const apiPostThunksAsyncPeripherals = async (data: any) => {
const resp = await ApiSedePeripherlsPost(data)
  .then((response) => {
    const getdata = response;
    return getdata;
  })
  .catch((error) => {
    return error.response;
  });

return resp;
};

export const apiPutSedePeripherals = async (FK_TSEDE, data) => {
const resp = ApiSedeAsyncPeripheralsPut(FK_TSEDE, data)
  .then((response) => {
    const editData = response;
    return editData;
  })
  .catch((error) => {
    return error.response;
  });
return resp;
};

export const apiGetThunksAsyncSedePeripherals = async (data: any) => {
const resp = await ApiSedePeripherls(data)
  .then((response) => {
    const getdata = response.data.data[0];
    return getdata;
  })
  .catch((error) => {
    return error.response;
  });

return resp;
};

//------------------------------------------------------//--------------------------------------------------------------------



// @ts-ignore
export const apiGetThunksMainMenuAsync = async (data: any) => {
  const resp = await ApiServicesThunksMainMenu()
    .then((response) => {
      
      const getdata = response.data.results.map((d:any, i:any) => ({
        ...d,
        key: i,
      }));
      return getdata;
    })
    // @ts-ignore
    .catch((error) => {
      // @ts-ignore
      let results = {
        status: "error",
        message: "No existen datos para la consulta",
      };
    });

  return resp;
};

export const apiGetThunksMenuItemsOptionsAsync = async (data: any) => {
  const resp = await ApiServicesThunksMainMenuOptionsItem(data)
    .then((response) => {
      const getdata = response.data.results.map((d: any, i: any) => ({
        ...d,
        key: i,
      }));
      return {
        getdata,
      };
    })
    // @ts-ignore
    .catch((error) => {
      // @ts-ignore
      let results = {
        status: "error",
        message: "No existen datos para la consulta",
      };
    });

  return resp;
};

export const apiPostPasswordChange = async (data: any) => {
  const resp = await ApiServicesPasswordChange(data)
    .then(() => {
      // console.log('respuesta cambio contraseña: ', response)
    })
    .catch((error) => {
      return error.response;
    });

  return resp;
};

export const apiGetPermissionOptions = async (data: any) => {

  try {
    const resp = ApiServicesGetPermissionOptions(data)
    .then((response) => {

      return response?.data?.data
    })

    return resp
  } catch (error) {
      //TODO: abjust action to error
      // @ts-ignore
      let results = {
        status: "error",
        message: "No existen datos para la consulta",
      };
  }
};

export const apiUpdatePermissionOptions = async (data: any) => {

  try {
    const resp = ApiServicesUpdatePermissionOptions(data)
    .then((response) => {

      return response?.data?.response
    })

    return resp
  } catch (error) {
      //TODO: abjust action to error
      // @ts-ignore
      let results = {
        status: "error",
        message: "La operacion no se pudo realizar",
      };
  }
};

export const apiGetAllRoles = async () => {

    try {
      const {data} = await ApiServicesGetAllRoles()
      return data;
    } catch(error) {
      //TODO: manejo de erroes.
    }
};

export const apiGetUserRoles = async (id: any) => {
  
  try {
    const {data} = await ApiServicesGetUserRoles(id)
    return data;
  } catch (error) {
    //TODO: manejo de erroes.
    //console.warn(results);
  }
};

export const apiUpdateUserRoles = async (data: any) => {
  const resp = await ApiServicesUpdateUserRoles(data)
    .then((response) => {
      const getdata = response.data.response;
      return getdata;
    })
    .catch((error) => {
      return error.response;
    });

  return resp;
};
export const apiGetUrlMembrete = async (data: any) => {
  const resp = await ApiServicesMembrete(data)
    .then((response) => {
      return response.data.data
    })
    .catch((error) => {
      return error.response;
    });

  return resp;
};