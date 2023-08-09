import axios from "axios";
import { removeNullAndEmptyKeys } from "../../utils/utils";
import { environment } from "@/enviroments/enviroment.ts";

const API_URL = environment.API_TEST;

export const ApiServicesThunksORM = async (data: object) => {
  const url = `${API_URL}/orm/`;
  const resp = await axios
    .post(url, removeNullAndEmptyKeys(data))
    .then((response) => {
      return response;
    });
  return resp;
};
