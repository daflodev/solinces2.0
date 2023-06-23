import {shallow} from "zustand/shallow";
import { sessionInformationStore } from "../../../../store/userInformationStore";
import { apiGetThunksAsync, apiPostThunksAsync } from "../../../services/api/thunks";
import { useState } from "react";
import { getUserToken } from "../../../utils";
import { message } from "antd";
import dayjs from 'dayjs';
export const useFormEstablecimiento = () => {


  const [messageApi, contextHolder] = message.useMessage()

  // @ts-ignore
  const [itemsColumnsInformation, setItemsColumnsInformation] = useState([]);
  // @ts-ignore
  const [inputFilter, setInputFilter] = useState({});
  const [initialValues, setInitialValue] = useState<object | null>(null);

  function changeKey(
    json: Record<string, any>,
    llaveActual: string,
    nuevaLlave: string
  ): Record<string, any> {
    if (json.hasOwnProperty(llaveActual)) {
      json[nuevaLlave] = json[llaveActual];
      delete json[llaveActual];
    }
    return json;
  }

  const select_type = (params: any) => {
    const type: any = {
      establecimiento: {
        table: [
          "PK_TESTABLECIMIENTO",
          "CODIGO",
          "NOMBRE",
          "NIT",
          "FK_TMUNICIPIO",
          "FK_TLISTA_VALOR_ZONA",
          "FK_TPROPIEDAD_JURIDICA",
          "FK_TLV_CALENDARIO",
          "FK_TLV_ESTADO_ESTABLECIMIENTO",
        ],
      },
      defauld: {
        table: '',
      },
    };

    const user = getUserToken();
    let validate: any = type["defauld"];
    if (user.rol[0] == "SUPER_ADMINISTRADOR") {
      validate = type[params] ?? type["defauld"];
    }
    // validate = params == 'establecimiento' ? type[params] : type['defauld'];
    return validate;
  };

  const tokenInformation = localStorage.getItem("user_token_information");
  const parserTokenInformation: any | null = tokenInformation
    ? JSON.parse(tokenInformation)
    : null;
  // @ts-ignore
  const { currentRol, currentInstitution } = sessionInformationStore(
    (state) => ({
      currentRol: state.currentRol,
      currentInstitution: state.currentInstitution,
    }),
    shallow
  );

  const filtrarJsonArray = (jsonArray: any[], columnas: any): any[] => {
    if (columnas !== "") {
      return jsonArray.filter((objeto) => {
        return columnas.some((columna: any) => objeto.column_name === columna);
      });
    } else {
      return jsonArray;
    }
  };

  const ProcessingColumnsInformation = (
    columnsInformation: any,
    setFunction: any
  ) => {
    const columnsKeys = columnsInformation.map((item: any) => item.column_name);

    const filteredKeys = columnsKeys.filter(
      (key: any) =>
        key !== "AUTHOR_RC" && key !== "CLIENTS_RC" && !key.startsWith("PK_")
    );

    let newInputFilter = {};

    filteredKeys.map((key: any) => {
      newInputFilter = {
        ...newInputFilter,
        [key]: "",
      };
    });

    setFunction(newInputFilter);
  };

  const apiGet = async (nameTable: any, setDataTable: any) => {
    const tableDateBase = select_type(nameTable);
    const dataSede = {
      base: tableDateBase.table,
      schema: parserTokenInformation?.dataSchema[0],
      where: {
        "establecimiento.PK_TESTABLECIMIENTO": currentInstitution?.value,
      },
    };
    const getdata = changeKey(dataSede, "base", nameTable);

    const getDataTable = await apiGetThunksAsync(getdata).then(
      (response: any) => {
        const { getdata, columnsInformation } = response;

        const filterColumnsInformation: any = filtrarJsonArray(
          columnsInformation,
          tableDateBase.table
        );

        ProcessingColumnsInformation(filterColumnsInformation, setInputFilter);
        setItemsColumnsInformation(filterColumnsInformation);

        const res = getdata[0];
        return res;
      }
    );

    const initialValues = {
      BARRIO: getDataTable.BARRIO ? getDataTable.BARRIO : null,

      CODIGO: getDataTable.CODIGO ? getDataTable.CODIGO : null,
      COMUNA: getDataTable.COMUNA ? getDataTable.COMUNA : null,

      CORREO_ELECTRONICO: getDataTable.CORREO_ELECTRONICO ? getDataTable.CORREO_ELECTRONICO: null,
      DIRECCION: getDataTable.DIRECCION ? getDataTable.DIRECCION : null,
      ETNIAS: getDataTable.ETNIAS ? getDataTable.ETNIAS : null,
      FAX: getDataTable.FAX ? getDataTable.FAX : null,
      FECHA_LICENCIA:dayjs(getDataTable.FECHA_LICENCIA ? getDataTable.FECHA_LICENCIA : null),
      FK_TARCHIVO: getDataTable.FK_TARCHIVO ? getDataTable.FK_TARCHIVO : null,

      FK_TFUNCIONARIO_RECTOR: getDataTable.FK_TFUNCIONARIO_RECTOR? getDataTable.FK_TFUNCIONARIO_RECTOR : null,
      FK_TFUNCIONARIO_SECRETARIA: getDataTable.FK_TFUNCIONARIO_SECRETARIA ? getDataTable.FK_TFUNCIONARIO_SECRETARIA : null,
      FK_TLISTA_VALOR_ZONA: getDataTable.FK_TLISTA_VALOR_ZONA ? getDataTable.FK_TLISTA_VALOR_ZONA : null,
      FK_TLV_ASOCIACION_NACIONAL: getDataTable.FK_TLV_ASOCIACION_NACIONAL ? getDataTable.FK_TLV_ASOCIACION_NACIONAL : null,
      FK_TLV_CALENDARIO: getDataTable.FK_TLV_CALENDARIO ? getDataTable.FK_TLV_CALENDARIO: null,
      FK_TLV_DISCAPACIDAD: getDataTable.FK_TLV_DISCAPACIDAD? getDataTable.FK_TLV_DISCAPACIDAD: null,

      FK_TLV_ESTADO_ESTABLECIMIENTO: getDataTable.FK_TLV_ESTADO_ESTABLECIMIENTO? getDataTable.FK_TLV_ESTADO_ESTABLECIMIENTO: null,
      FK_TLV_GENERO_EST: getDataTable.FK_TLV_GENERO_EST? getDataTable.FK_TLV_GENERO_EST: null,

      FK_TLV_IDIOMA: getDataTable.FK_TLV_IDIOMA? getDataTable.FK_TLV_IDIOMA: null,

      FK_TLV_RANGO_TARIFA: getDataTable.FK_TLV_RANGO_TARIFA? getDataTable.FK_TLV_RANGO_TARIFA: null,

      FK_TLV_REGIMEN_CATCOSTO: getDataTable.FK_TLV_REGIMEN_CATCOSTO? getDataTable.FK_TLV_REGIMEN_CATCOSTO: null,

      FK_TMUNICIPIO: getDataTable.FK_TMUNICIPIO? getDataTable.FK_TMUNICIPIO: null,

      FK_TPROPIEDAD_JURIDICA: getDataTable.FK_TPROPIEDAD_JURIDICA? getDataTable.FK_TPROPIEDAD_JURIDICA: null,

      LICENCIA_FUNCIONAMIENTO:getDataTable.LICENCIA_FUNCIONAMIENTO ? getDataTable.LICENCIA_FUNCIONAMIENTO : null ,

      LOCALIDAD:getDataTable.LOCALIDAD ? getDataTable.LOCALIDAD : null ,

      NIT:getDataTable.NIT ? getDataTable.NIT : null ,

      NOMBRE:getDataTable.NOMBRE ? getDataTable.NOMBRE : null ,

      PAGINA_WEB:getDataTable.PAGINA_WEB ? getDataTable.PAGINA_WEB : null ,

      PK_TESTABLECIMIENTO:getDataTable.PK_TESTABLECIMIENTO ? getDataTable.PK_TESTABLECIMIENTO : null ,

      RESOLUCION_APROBACION:getDataTable.RESOLUCION_APROBACION ? getDataTable.RESOLUCION_APROBACION : null ,

      SUBSIDIO:getDataTable.SUBSIDIO ? getDataTable.SUBSIDIO : null ,

      TALENTO:getDataTable.TALENTO ? getDataTable.TALENTO : null ,

      TELEFONO:getDataTable.TELEFONO ? getDataTable.TELEFONO : null ,
    };
  
    setDataTable(initialValues);
  };




  const handleSubmit = async (
    values:any,
) => {

    const getdata = {
        update_ESTABLECIMIENTO: values,
        where: {
          PK_TESTABLECIMIENTO: currentInstitution?.value
        },
        schema: parserTokenInformation?.dataSchema[0]
    }

    setInitialValue(null)

    await apiPostThunksAsync(getdata)
    .then((response) => {
        if (response.success == "OK") {

            messageApi.open({
                type: 'success',
                content: 'Los datos fueron actualizados correctamente',
                duration: 2
            });
        }

        if(response.status == 400){

            const messageResponse = response?.data?.message;   
            
            if(messageResponse.includes("already exists")){

                messageApi.open({
                    type: 'warning',
                    content: 'Uno o mas campos de valores unicos ya se encuentran registrado.',
                    duration: 2
                });
            }else{

                messageApi.open({
                    type: 'error',
                    content: 'Ocurrio un error inesperado, intentelo mas tarde.',
                    duration: 2
                });
            }
        }
    })
    .catch((error)=>{
        messageApi.open({
            type: 'error',
            content: 'Ocurrio un error inesperado, intentelo mas tarde.',
            duration: 2
        });

        console.log(error)
    })
    .finally(() => {
        setTimeout( () =>
            close()
        , 2500);
         apiGet('establecimiento', setInitialValue)
    });
};

  return {
    setInputFilter,
    apiGet,
    initialValues,
    setInitialValue,

    handleSubmit,
    contextHolder
  };
};
