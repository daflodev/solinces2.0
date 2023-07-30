import axios from "axios";
import { removeNullAndEmptyKeys } from "../utils";

export const ApiServicesThunksORM = async (data: object) => {
    // const url = "https://api.colombiaevaluadora.edu.co/coleva4i/orm/";
    const url = "http://201.219.216.217:2023/orm/";
    // const url = "http://localhost:3001/orm/";
    const resp = await axios.post(url, removeNullAndEmptyKeys(data)).then((response) => {
      return response;
    });
    return resp;
  };