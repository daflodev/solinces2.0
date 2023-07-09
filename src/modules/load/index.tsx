import { Spin } from 'antd';
import "./index.css"
import { getUser, login } from '../../utils/services/helper/auth-helper';
import { useJwtTool } from '../../utils/utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { sessionInformationStore } from "../../store/userInformationStore";

const LoadPages = () => {
  const navigate = useNavigate();

  const { updateValue } = sessionInformationStore();

  const validationUser = () => {
    getUser().then(user => {
      if (user && user.access_token) {
    
          const { myDecodedToken } : any = useJwtTool(user.access_token);

          const localStorageCurrentRol = localStorage.getItem('current_rol');

          if(localStorageCurrentRol && localStorageCurrentRol.length > 0){
            updateValue({
              element: "currentRol",
              value: localStorageCurrentRol
            })
          }else{

            localStorage.setItem('current_rol', myDecodedToken?.rol[0])
            updateValue({
              element: "currentRol",
              value: myDecodedToken?.rol[0]
            })
          }

          localStorage.setItem("user_token_information", JSON.stringify(myDecodedToken))    
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