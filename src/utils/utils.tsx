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

export {
  alterSwal,
  formik,
  useJwtTool,
  InputRef,
  FormInstance,
  Yup,
};
