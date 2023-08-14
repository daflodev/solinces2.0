import { Spin } from 'antd';
import axios from "axios";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, login } from '@/services/helper/auth-helper';
import { useJwtTool } from '../../utils/utils';
import "./index.css";

import { URL_BACKEND } from '@/utils/constants';
import { sessionInformationStore } from "../../store/userInformationStore";
import { QueryBuilders } from '@/services/orm/queryBuilders';
import { loginFaseOne } from '@/services/api/services';
import shallow from 'zustand/shallow';

let sesion = false;

const LoadPages = () => {
  const navigate = useNavigate();

  const { updateValue } = sessionInformationStore();

  const { currentRol } = sessionInformationStore(
    (state) => ({
      currentRol: state.currentRol,
    }), shallow);


  console.log(currentRol)
  const tokenInformation = localStorage.getItem('user_token_information');
      const parserTokenInformation: any | null = tokenInformation ? JSON.parse(tokenInformation) : null;

  const getUserF1 = async () => {
    const query = new QueryBuilders('usuario');
    const results: any = await query
      .select('*')
      .schema(parserTokenInformation)
      .where('usuario."CUENTA"', '=', currentRol)
      .limit(1)
      .get()
      .then((resp: any) => {
        console.log(resp[0].IDENTIFICACION)
        loginFaseOne().then((resp: any) => {
          console.log(resp)
          console.log(resp.data.data.access, 'token')
          localStorage.setItem("accesToken", resp.data.data.access)
        })
      })

  }



  const validationUser = () => {
    getUser().then(async user => {
      console.log('i am login');
      if (user && user.access_token) {

        const { myDecodedToken }: any = useJwtTool(user.access_token);

        const localStorageCurrentRol = localStorage.getItem('current_rol');

        if (localStorageCurrentRol && localStorageCurrentRol.length > 0) {
          updateValue({
            element: "currentRol",
            value: localStorageCurrentRol
          })
        } else {

          localStorage.setItem('current_rol', myDecodedToken?.rol[0])
          updateValue({
            element: "currentRol",
            value: myDecodedToken?.rol[0]
          })
        }

        // save token in local store
        localStorage.setItem("tk_sesion", user.access_token);

        localStorage.setItem("user_token_information", JSON.stringify(myDecodedToken))

        // login, session record in db
        if (sesion == false) {
          sesion = true;

          axios
            .post(URL_BACKEND + "/sesion", null, {
              headers: {
                "Authorization": "Bearer " + user.access_token,
              }
            })
            .then((response) => {
              sesion = true;
              localStorage.setItem('pk_sesion', response.data.pk_sesion);
              console.log("Respuesta del endpoint:", response.data);
            })
            .catch((error) => {
              sesion = false;
              console.error("Error al llamar al endpoint:", error);
            });
        }
        await getUserF1()
        navigate("/layout/configuracion");

      } else {
        localStorage.setItem('current_rol', '')
        login()
      }
    });
  }

  useEffect(() => {
    validationUser()

  }, [])

  return (
    <>
      <div className="contenedor">
        <Spin tip="Loading" size="large">
        </Spin>
      </div>
    </>
  );
};
export default LoadPages;