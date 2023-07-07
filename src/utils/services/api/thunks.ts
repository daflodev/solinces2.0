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
  } from "./services";
  
  export const apiGetThunksAsync = async (data: any) => {
    const resp = await ApiServicesThunks(data)
      .then((response) => {
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

  export const apiPostThunksAsyncSedeJornada = async (data: any) => {
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
      .then((response) => {
        console.log('respuesta cambio contraseña: ', response)
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
      } catch (error) {
        let results = {
          status: "error",
          message: "No existen datos para la consulta",
        };
        //TODO: manejo de erroes.
        //console.warn(results);
      }
  };

  export const apiGetUserRoles = async (id: any) => {
    
    try {
      const {data} = await ApiServicesGetUserRoles(id)
      return data;
    } catch (error) {
      let results = {
        status: "error",
        message: "No existen datos para la consulta",
      };
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