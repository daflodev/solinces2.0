import axios from "axios";

export const ApiServicesThunksORM = async (data: object) => {
    const url = "http://localhost:3001/orm/";
    const resp = await axios.post(url, data).then((response) => {
      return response;
    });
    return resp;
  };