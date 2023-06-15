import {
    ApiServicesThunks,
    ApiServicesThunksMainMenu,
    ApiServicesThunksMainMenuOptionsItem,
    ApiServicesPasswordChange,
    ApiServicesMembrete
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