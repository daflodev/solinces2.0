import { isExpired, decodeToken } from "react-jwt";

import * as alterSwal from "sweetalert2";


import * as formik from "formik";

import * as Yup from "yup";

import type { InputRef } from "antd";

import type { FormInstance } from "antd/es/form";
import { linkIcon, pdfIcon } from "@/assets/icon/iconManager";

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

const obtenerExtension = (url: any) => {
  if(!url){
    return 'url'
  }
  const partes = url.split('.');
  if (partes.length > 1) {
    console.log(partes[partes.length - 1])
    return partes[partes.length - 1];
  } else {
    return 'url';
  }
}


const select_type = (params: any) => {
  const type: any = {
    pdf: pdfIcon,
    url: linkIcon,
    defauld: linkIcon,
  };

  let extencion = obtenerExtension(params)
  let validate: any = type[extencion] ?? type["defauld"];
  return validate;
};

export {
  alterSwal,
  formik,
  useJwtTool,
  InputRef,
  FormInstance,
  Yup,
  getUserToken,
  removeNullAndEmptyKeys,
  select_type,
};
