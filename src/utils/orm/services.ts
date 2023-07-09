import axios from "axios";
import { removeNullAndEmptyKeys } from "../utils";

export const ApiServicesThunksORM = async (data: object) => {
    const url = "https://apisolinces.colombiaevaluadora.co/orm/";
    // const url = "http://localhost:3001/orm/";
    const resp = await axios.post(url, removeNullAndEmptyKeys(data)).then((response) => {
      return response;
    });
    return resp;
  };