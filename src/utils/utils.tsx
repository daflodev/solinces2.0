import { isExpired, decodeToken } from "react-jwt";

import * as alterSwal from "sweetalert2";


import * as formik from "formik";

import * as Yup from "yup";

import type { InputRef } from "antd";

import type { FormInstance } from "antd/es/form";

function useJwtTool(token: any) {
  const myDecodedToken = decodeToken(token);
  const isMyTokenExpired = isExpired(token);

  return { myDecodedToken, isMyTokenExpired };
}

const getUserToken = () => {
  const getUser: string = localStorage.getItem('user_token_information')!!;
  const user : any =  JSON.parse(getUser) ?? null;
  return user;
}

const removeNullAndEmptyKeys = (json: any): any => {
  if (typeof json !== 'object' || json === null) {
    return json;
  }

  if (Array.isArray(json)) {
    return json.map(removeNullAndEmptyKeys);
  }

  const result: any = {};

  for (const key in json) {
    const value = json[key];

    if (value !== null && !(Array.isArray(value) && value.length === 0)) {
      result[key] = removeNullAndEmptyKeys(value);
    }
  }

  return result;
}

export {
  alterSwal,
  formik,
  useJwtTool,
  InputRef,
  FormInstance,
  Yup,
  getUserToken,
  removeNullAndEmptyKeys,
};
