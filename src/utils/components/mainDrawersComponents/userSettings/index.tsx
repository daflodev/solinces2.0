import { Popover, Col, Row, Spin } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { useEffect } from 'react';
import { sessionInformationStore } from '../../../../store/userInformationStore';
import shallow from 'zustand/shallow';
import { logout } from "../../../../utils/services/helper/auth-helper";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { mainHook } from "./hooks/mainHook";
import MultiSelectUserSettings from './selectInput';
import NumericInputUserSettings from './numericInput'

import { userIcon, logOutIcon, changeRolIcon, saveIcon } from "../../../assets/icon/iconManager";
import icon_four from "../../../assets/nav/images/rectangle-25.png";

import "./userSettings.css";
import { Yup } from '../../../utils';

const UserSettings: React.FC = () => {

  // const tokenInformation = localStorage.getItem('user_token_information');
  // const parserTokenInformation: any | null = tokenInformation ? JSON.parse(tokenInformation) : null;

  const {
    bloodType, 
    municipalResidence,
    documentType,
    parserTokenInformation,
    initialValuesUser,
    handleSubmitUserSettings,
    mainDrawerStore,
    contextHolder,
    currentPasswordErrorMessageState, setCurrentPasswordErrorMessageState,
    newPasswordErrorMessageState, setNewPasswordErrorMessageState,
    verifyNewPasswordErrorMessageState, setVerifyNewPasswordErrorMessageState,
    handleSubmitUserPasswordChange
  } = mainHook()

    const { currentRol, roles } = sessionInformationStore(
        (state) => ({
            currentRol: state.currentRol,
            roles: state.currentRoles,
        }),
        shallow
    );

    const getLocalStorage = JSON.parse(localStorage.getItem('user_token_information')!!);
    const rolesLocalStorage = getLocalStorage.rol;

    const { updateValue } = sessionInformationStore();

    const { close } = mainDrawerStore()
    
    const handleClick = (event) => {
        updateValue({element: 'currentRol',
                    value:event.target.textContent
                })
        localStorage.setItem('current_rol', event.target.textContent);
    }

    const capitalizeWords = (str) => {
      return str
          ?.toLowerCase()
          ?.split(" ")
          ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
          ?.join(" ");
  };

    const ListaItems = () => {
      console.log('roles: ', roles)
        return (
          <div style={{ padding: '10px', backgroundColor: 'var(--bg-color)' }}>
            <ul>
              {rolesLocalStorage.map((elemento, index) => (
                <li className='listRoles' onClick={handleClick} key={index}>{elemento}</li>
              ))}
            </ul>
          </div>
        );
      }

    const validationForm = Yup.object().shape({
      primer_nombre: Yup.string().required('Campo requerido'),
      primer_apellido: Yup.string().required('Campo requerido'),
      tipo_identificacion: Yup.string().required('Campo requerido'),
      numero_identificacion: Yup.string().required('Campo requerido'),
      correo_electronico: Yup.string().email('Correo electrónico inválido'),
      new_password: Yup.string(),
      verify_new_password: Yup.string().oneOf([Yup.ref('new_password')], 'Las contraseñas deben coincidir')
    });

    const validateChangePasswordOperation = (oldPassword, newPassword, verifyNewPassword) => {

      let status = true;

      if(oldPassword.length > 0 || newPassword.length > 0 || verifyNewPassword.length > 0){

        if(oldPassword.length == 0){
          setCurrentPasswordErrorMessageState(true)
          status = false
        }else(
          setCurrentPasswordErrorMessageState(false)
        )

        if(newPassword.length == 0){
          setNewPasswordErrorMessageState(true)
          status = false
        }else(
          setNewPasswordErrorMessageState(false)
        )

        if(verifyNewPassword.length == 0){
          setVerifyNewPasswordErrorMessageState(true)
          status = false
        }else{
          setVerifyNewPasswordErrorMessageState(false)
        }
      }

      return status
    }

    useEffect(() => {
      ListaItems()
    }, [roles, currentRol])

    return(
        <>
            {contextHolder}
            <Row
                align='middle'
                justify='center'
                className='user_settings_top'
            >
                <Col span={2}>
                  <div className="user_settings_icon_user">
                    {userIcon}
                  </div>
                </Col>
                <Col span={20}>
                    <div className="user_settings_title">
                      Perfil de usuario
                    </div>
                </Col>
                <Col span={2}>
                  <span className="user_settings_close_icon" onClick={close}>
                    <CloseOutlined/>
                  </span>
                </Col>
            </Row>
            <br/>
            <Row
                align='middle'
                justify='center'
                className='user_settings_top'
            >
                <Col span={3}>
                  <img
                    className="user_settings_rectangle-25-yrx"
                    src={icon_four}
                  />
                </Col>
                <Col span={17}>
                    <div className="user_settings_name_and_rol">
                      <div className="user_settings_name_and_rol_name">
                        {capitalizeWords(parserTokenInformation.name)}
                      </div>
                      <div className="user_settings_name_and_rol_rol">
                        {currentRol}
                      </div>
                    </div>
                </Col>
                <Col span={2}>
                    <Popover placement="bottom" content={ListaItems}>
                      <span className="user_settings_change_rol_icon">
                        {changeRolIcon}
                      </span>
                    </Popover>
                </Col>
                <Col span={2}>
                    <span className="user_settings_log_out_icon" onClick={() =>{
                      localStorage.setItem('current_rol', '');
                      logout();
                      }}>
                      {logOutIcon}
                    </span>
                </Col>
            </Row>

            { initialValuesUser ?
              <Formik
                  initialValues={initialValuesUser}
                  validationSchema = {validationForm}
                  validateOnChange={true}
                  onSubmit={(values: any) => {
                    const userValuesToUpdate = {
                        PRIMER_NOMBRE: values?.primer_nombre,
                        SEGUNDO_NOMBRE: values?.segundo_nombre,
                        PRIMER_APELLIDO: values?.primer_apellido,
                        SEGUNDO_APELLIDO: values?.segundo_apellido,
                        FK_TTIPO_DOCUMENTO: values?.tipo_identificacion,
                        FK_TMUNICIPIO_RESIDENCIA: values?.municipio,
                        FK_TLV_TIPO_SANGRE: values?.tipo_sangre,
                        IDENTIFICACION: values?.numero_identificacion,
                        TELEFONO: values?.telefono,
                        CORREO_ELECTRONICO: values?.correo_electronico
                    }

                    const currentPassword = values?.current_password;
                    const newPassword = values?.new_password;
                    const verifyNewPassword = values?.verify_new_password;

                    const isValidPasswordInputs = validateChangePasswordOperation(currentPassword, newPassword, verifyNewPassword)

                    if(isValidPasswordInputs){
                        handleSubmitUserSettings(userValuesToUpdate);

                        if(currentPassword.length > 0 &&  newPassword.length > 0 && verifyNewPassword.length > 0){

                          const passwordObject = {
                            current: currentPassword,
                            new: newPassword,
                            confirmedNew: verifyNewPassword
                          };

                          handleSubmitUserPasswordChange(passwordObject);
                        }
                    }
                  }}>

                    <Form>
                      <Row
                        align='middle'
                        justify='center'
                        className='user_settings_top'
                        gutter={[16, 16]}
                      >
                          <Col span={24}>
                            <div className="user_settings_sub_title">
                                <p>Datos de Identificación</p>
                            </div>
                          </Col>

                          <Col span={12}>
                              <Field
                                  component={MultiSelectUserSettings} 
                                  className='user_settings_select_input'
                                  placeholder="Tipo de Identificación"
                                  id="tipo_identificacion"
                                  name="tipo_identificacion"
                                  autoComplete="off"
                                  options={documentType}             
                                  filterOption={(input:any, option:any) =>
                                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                              />          
                              <ErrorMessage
                                name="tipo_identificacion"
                                component={"div"}
                                className="text-danger"
                              />
                          </Col>
                          <Col span={12}>
                            <Field
                                component={NumericInputUserSettings}
                                placeholder="Nº de Identificación"
                                id="numero_identificacion"
                                name="numero_identificacion"
                                autoComplete="off"
                                //@ts-ignore
                                defaultValue={initialValuesUser?.numero_identificacion}
                              />          
                              <ErrorMessage
                                name="numero_identificacion"
                                component={"div"}
                                className="text-danger"
                              />
                          </Col>
                          <Col span={12}>
                              <Field
                                  style={{
                                    borderRadius: "8px",
                                    border: "1px solid rgb(233, 231, 248)",
                                    padding: "3px 10px",
                                    width: "100%",
                                    height: "2.5rem",
                                    gap: '37px',
                                    fontWeight: '400',
                                    fontSize: '18px',
                                    background: 'var(--bg-color)',
                                  }}
                                  placeholder="Primer Nombre"
                                  id="primer_nombre"
                                  name="primer_nombre"
                                  autoComplete="off"
                              />          
                              <ErrorMessage
                                name="primer_nombre"
                                component={"div"}
                                className="text-danger"
                              />
                          </Col>
                          <Col span={12}>
                            <Field
                                  style={{
                                    borderRadius: "8px",
                                    border: "1px solid rgb(233, 231, 248)",
                                    padding: "3px 10px",
                                    width: "100%",
                                    height: "2.5rem",
                                    gap: '37px',
                                    fontWeight: '400',
                                    fontSize: '18px',
                                    background: 'var(--bg-color)',
                                  }}
                                  placeholder="Segundo Nombre"
                                  id="segundo_nombre"
                                  name="segundo_nombre"
                                  autoComplete="off"
                                />          
                                <ErrorMessage
                                  name="segundo_nombre"
                                  component={"div"}
                                  className="text-danger"
                                />
                          </Col>
                          <Col span={12}>
                            <Field
                                    style={{
                                      borderRadius: "8px",
                                      border: "1px solid rgb(233, 231, 248)",
                                      padding: "3px 10px",
                                      width: "100%",
                                      height: "2.5rem",
                                      gap: '37px',
                                      fontWeight: '400',
                                      fontSize: '18px',
                                      background: 'var(--bg-color)',
                                    }}
                                    placeholder="Primer Apellido"
                                    id="primer_apellido"
                                    name="primer_apellido"
                                    autoComplete="off"
                                  />          
                                  <ErrorMessage
                                    name="primer_apellido"
                                    component={"div"}
                                    className="text-danger"
                                  />
                          </Col>
                          <Col span={12}>
                            <Field
                                      style={{
                                        borderRadius: "8px",
                                        border: "1px solid rgb(233, 231, 248)",
                                        padding: "3px 10px",
                                        width: "100%",
                                        height: "2.5rem",
                                        gap: '37px',
                                        fontWeight: '400',
                                        fontSize: '18px',
                                        background: 'var(--bg-color)',
                                      }}
                                      placeholder="Segundo Apellido"
                                      id="segundo_apellido"
                                      name="segundo_apellido"
                                      autoComplete="off"
                                    />          
                                    <ErrorMessage
                                      name="segundo_apellido"
                                      component={"div"}
                                      className="text-danger"
                                    />
                          </Col>
                          <Col span={12}>
                            <Field
                                component={NumericInputUserSettings}
                                placeholder="Teléfono"
                                id="telefono"
                                name="telefono"
                                autoComplete="off"
                                //@ts-ignore
                                defaultValue={initialValuesUser?.telefono}
                              />          
                              <ErrorMessage
                                name="telefono"
                                component={"div"}
                                className="text-danger"
                              />
                          </Col>
                          <Col span={12}>
                            <Field
                                style={{
                                  borderRadius: "8px",
                                  border: "1px solid rgb(233, 231, 248)",
                                  padding: "3px 10px",
                                  width: "100%",
                                  height: "2.5rem",
                                  gap: '37px',
                                  fontWeight: '400',
                                  fontSize: '18px',
                                  background: 'var(--bg-color)',
                                }}
                                placeholder="Correo Electrónico"
                                id="correo_electronico"
                                name="correo_electronico"
                                autoComplete="off"
                              />          
                              <ErrorMessage
                                name="correo_electronico"
                                component={"div"}
                                className="text-danger"
                              />
                          </Col>
                          <Col span={12}>
                              <Field
                                  component={MultiSelectUserSettings} 
                                  className='user_settings_select_input'
                                  placeholder="Municipio"
                                  id="municipio"
                                  name="municipio"
                                  autoComplete="off"
                                  options={municipalResidence}             
                                  filterOption={(input:any, option:any) =>
                                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                  }
                              />          
                                  <ErrorMessage
                                    name="municipio"
                                    component={"div"}
                                    className="text-danger"
                                  />
                            </Col>
                            <Col span={12}>
                                <Field
                                    component={MultiSelectUserSettings} 
                                    className='user_settings_select_input'
                                    placeholder="Tipo de Sangre"
                                    id="tipo_sangre"
                                    name="tipo_sangre"
                                    autoComplete="off"
                                    options={bloodType}             
                                    filterOption={(input:any, option:any) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                  />          
                                  <ErrorMessage
                                    name="tipo_sangre"
                                    component={"div"}
                                    className="text-danger"
                                  />
                            </Col>
                          <Col span={24}>
                            <div className="user_settings_sub_title">
                                <p>Actualizar Contraseña</p>
                            </div>
                          </Col>

                          <Col span={24}>
                            <Field
                                style={{
                                  borderRadius: "8px",
                                  border: "1px solid rgb(233, 231, 248)",
                                  padding: "3px 10px",
                                  width: "100%",
                                  height: "2.5rem",
                                  gap: '37px',
                                  fontWeight: '400',
                                  fontSize: '18px',
                                  background: 'var(--bg-color)',
                                }}
                                placeholder="Contraseña Actual"
                                id="current_password"
                                name="current_password"
                                autoComplete="off"
                                type="password"
                              />          
                              <ErrorMessage
                                name="current_password"
                                component={"div"}
                                className="text-danger"
                              />
                              {currentPasswordErrorMessageState && 
                                <label htmlFor="current_password">
                                  Este campo es obligatorio para actualizar contraseña
                                </label>
                              }
                          </Col>
                          <Col span={12}>
                            <Field
                                style={{
                                  borderRadius: "8px",
                                  border: "1px solid rgb(233, 231, 248)",
                                  padding: "3px 10px",
                                  width: "100%",
                                  height: "2.5rem",
                                  gap: '37px',
                                  fontWeight: '400',
                                  fontSize: '18px',
                                  background: 'var(--bg-color)',
                                }}
                                placeholder="Nueva Contraseña"
                                id="new_password"
                                name="new_password"
                                autoComplete="off"
                                type="password"
                              />          
                              <ErrorMessage
                                name="new_password"
                                component={"div"}
                                className="text-danger"
                              />
                              {newPasswordErrorMessageState && 
                                <label htmlFor="new_password">
                                  Este campo es obligatorio para actualizar contraseña
                                </label>
                              }
                          </Col>
                          <Col span={12}>
                            <Field
                                style={{
                                  borderRadius: "8px",
                                  border: "1px solid rgb(233, 231, 248)",
                                  padding: "3px 10px",
                                  width: "100%",
                                  height: "2.5rem",
                                  gap: '37px',
                                  fontWeight: '400',
                                  fontSize: '18px',
                                  background: 'var(--bg-color)',
                                }}
                                placeholder="Verificar Contraseña"
                                id="verify_new_password"
                                name="verify_new_password"
                                autoComplete="off"
                                type="password"
                              />          
                              <ErrorMessage
                                name="verify_new_password"
                                component={"div"}
                                className="text-danger"
                              />
                              {verifyNewPasswordErrorMessageState && 
                                <label htmlFor="verify_new_password">
                                  Este campo es obligatorio para actualizar contraseña
                                </label>
                              }
                          </Col>
                      </Row>
                      <div className='user_settings_save_button'>
                        <button type="submit" style={{ background: 'none', border: 'none', padding: '0', margin: '0' }}>
                          {saveIcon}
                        </button>
                      </div>
                    </Form>

              </Formik>
              :
              <div className="user_settings_loading_spin">
                <Spin tip="" size="large" />
              </div>
              }
        </>
    )
};

export{UserSettings};