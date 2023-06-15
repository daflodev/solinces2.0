import axios from "axios";

export const ApiServicesThunksORM = async (data: object) => {
    const url = "https://apisolinces.colombiaevaluadora.co/orm/";
    const resp = await axios.post(url, data).then((response) => {
      return response;
    });
    return resp;
  };