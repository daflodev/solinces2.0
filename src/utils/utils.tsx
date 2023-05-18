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

export {
  alterSwal,
  formik,
  useJwtTool,
  InputRef,
  FormInstance,
  Yup,
  getUserToken,
};
