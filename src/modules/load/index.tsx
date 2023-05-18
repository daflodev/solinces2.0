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
    
          const { myDecodedToken } = useJwtTool(user.access_token);

          updateValue({
            element: "currentRol",
            value: myDecodedToken?.rol[0]
          })

          localStorage.setItem("user_token_information", JSON.stringify(myDecodedToken))    
          navigate("/layout/configuracion");
      
      } else {
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