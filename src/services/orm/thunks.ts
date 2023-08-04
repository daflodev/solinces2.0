import { ApiServicesThunksORM } from "./services";


export const apiPostThunksAsync = async (data: any) => {
    const resp = await ApiServicesThunksORM(data)
      .then((response) => {
        const getdata = response.data;
        return getdata;
      })
      .catch((error) => {
        return error.response;
      });
  
    return resp;
};