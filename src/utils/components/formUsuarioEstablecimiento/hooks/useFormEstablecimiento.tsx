import {shallow} from "zustand/shallow";
import { sessionInformationStore } from "../../../../store/userInformationStore";
import { apiGetThunksAsync } from "../../../services/api/thunks";
import { useEffect, useState } from "react";
import { getUserToken } from "../../../utils";

export const useFormEstablecimiento = () => {
  const [itemsColumnsInformation, setItemsColumnsInformation] = useState([]);
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
        table: "",
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
        // console.log(resultado, 'nuevo json');

        // #######################
        // const filtroColumnYes = columnsInformation.filter((item) => item.is_nullable == 'YES')
        // const filtroColumnNO = columnsInformation.filter((item) => item.is_nullable == 'NO')
        // console.log(filtroColumnYes, 'nueva columna YES')
        // console.log(filtroColumnNO, 'nueva columna NO')
        // #######################
        ProcessingColumnsInformation(filterColumnsInformation, setInputFilter);
        setItemsColumnsInformation(filterColumnsInformation);

        const res = getdata[0];
        return res;
      }
    );

    const initialValues = {
      BARRIO: getDataTable.BARRIO ? getDataTable.BARRIO : "",

      CODIGO: getDataTable.CODIGO ? getDataTable.CODIGO : "",
      COMUNA: getDataTable.COMUNA ? getDataTable.COMUNA : "",

      CORREO_ELECTRONICO: getDataTable.CORREO_ELECTRONICO ? getDataTable.CORREO_ELECTRONICO: "",
      DIRECCION: getDataTable.DIRECCION ? getDataTable.DIRECCION : "",
      ETNIAS: getDataTable.ETNIAS ? getDataTable.ETNIAS : "",
      FAX: getDataTable.FAX ? getDataTable.FAX : "",
      FECHA_LICENCIA: getDataTable.FECHA_LICENCIA ? getDataTable.FECHA_LICENCIA : "",
      FK_TARCHIVO: getDataTable.FK_TARCHIVO ? getDataTable.FK_TARCHIVO : "",

      FK_TFUNCIONARIO_RECTOR: getDataTable.FK_TFUNCIONARIO_RECTOR
        ? getDataTable.FK_TFUNCIONARIO_RECTOR
        : "",
      FK_TFUNCIONARIO_SECRETARIA: getDataTable.FK_TFUNCIONARIO_SECRETARIA
        ? getDataTable.FK_TFUNCIONARIO_SECRETARIA
        : "",
      FK_TLISTA_VALOR_ZONA: getDataTable.FK_TLISTA_VALOR_ZONA
        ? getDataTable.FK_TLISTA_VALOR_ZONA
        : "",
      FK_TLV_ASOCIACION_NACIONAL: getDataTable.FK_TLV_ASOCIACION_NACIONAL
        ? getDataTable.FK_TLV_ASOCIACION_NACIONAL
        : "",
      FK_TLV_CALENDARIO: getDataTable.FK_TLV_CALENDARIO
        ? getDataTable.FK_TLV_CALENDARIO
        : "",
      FK_TLV_DISCAPACIDAD: getDataTable.FK_TLV_DISCAPACIDAD
        ? getDataTable.FK_TLV_DISCAPACIDAD
        : "",

      FK_TLV_ESTADO_ESTABLECIMIENTO: getDataTable.FK_TLV_ESTADO_ESTABLECIMIENTO
        ? getDataTable.FK_TLV_ESTADO_ESTABLECIMIENTO
        : "",
      FK_TLV_GENERO_EST: getDataTable.FK_TLV_GENERO_EST
        ? getDataTable.FK_TLV_GENERO_EST
        : "",

      FK_TLV_IDIOMA: getDataTable.FK_TLV_IDIOMA
        ? getDataTable.FK_TLV_IDIOMA
        : "",

      FK_TLV_RANGO_TARIFA: getDataTable.FK_TLV_RANGO_TARIFA
        ? getDataTable.FK_TLV_RANGO_TARIFA
        : "",

      FK_TLV_REGIMEN_CATCOSTO: getDataTable.FK_TLV_REGIMEN_CATCOSTO
        ? getDataTable.FK_TLV_REGIMEN_CATCOSTO
        : "",

      FK_TMUNICIPIO: getDataTable.FK_TMUNICIPIO
        ? getDataTable.FK_TMUNICIPIO
        : "",

      FK_TPROPIEDAD_JURIDICA: getDataTable.FK_TPROPIEDAD_JURIDICA
        ? getDataTable.FK_TPROPIEDAD_JURIDICA
        : "",

      LICENCIA_FUNCIONAMIENTO:getDataTable.LICENCIA_FUNCIONAMIENTO ? getDataTable.LICENCIA_FUNCIONAMIENTO : '' ,

      LOCALIDAD:getDataTable. LOCALIDAD ? getDataTable. LOCALIDAD : '' ,

      NIT:getDataTable.NIT ? getDataTable.NIT : '' ,

      NOMBRE:getDataTable.NOMBRE ? getDataTable.NOMBRE : '' ,

      PAGINA_WEB:getDataTable.PAGINA_WEB ? getDataTable.PAGINA_WEB : '' ,

      PK_TESTABLECIMIENTO:getDataTable.PK_TESTABLECIMIENTO ? getDataTable.PK_TESTABLECIMIENTO : '' ,

      RESOLUCION_APROBACION:getDataTable.RESOLUCION_APROBACION ? getDataTable.RESOLUCION_APROBACION : '' ,

      SUBSIDIO:getDataTable.SUBSIDIO ? getDataTable.SUBSIDIO : '' ,

      TALENTO:getDataTable.TALENTO ? getDataTable.TALENTO : '' ,

      TELEFONO:getDataTable.TELEFONO ? getDataTable.TELEFONO : '' ,
    };
    console.log("data", getDataTable);
    setDataTable(initialValues);
  };

  return {
    setInputFilter,
    apiGet,
    initialValues,
    setInitialValue,
  };
};
