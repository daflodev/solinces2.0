import { shallow } from "zustand/shallow";
import { sessionInformationStore } from "../../../../store/userInformationStore";
import { message } from "antd";
//@ts-ignore
import dayjs from "dayjs";
import { useState } from "react";
import { getUserToken } from "@/utils/utils";
import { apiGetThunksAsync, apiPostThunksAsync } from "@/utils/services/api/thunks";
import { QueryBuilders } from "@/utils/orm/queryBuilders";
export const useFormTperiodo = () => {
  const [messageApi, contextHolder] = message.useMessage();

  // const [itemsColumnsInformation, setItemsColumnsInformation] = useState([]);

  // const [inputFilter, setInputFilter] = useState({});
  const [initialValuesPeriodo, setInitialValuePeriodo] = useState<object | null>(null);

  function changeKey(
    json: Record<string, any>,
    llaveActual: string,
    nuevaLlave: string
  ): Record<string, any> {
    // eslint-disable-next-line no-prototype-builtins
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

  const { currentInstitution } = sessionInformationStore(
    (state) => ({
      currentInstitution: state.currentInstitution,
    }),
    shallow
  );

  // const query = new QueryBuilders('periodo_academico_config');
  // const results = await query.select(['*'])
  //                            .where('periodo_academico_config."FK_TPERIODO_ACADEMICO"', '=', 1392)
  //                            .schema(`${schema}`)
  //                            .get();


  const apiGet = async ( key_table) => {
    const tableDateBase = "periodo_academico_config";
    const dataSede = {
      base: tableDateBase,
      schema: parserTokenInformation?.dataSchema[0],
      where: {
        "periodo_academico_config.FK_TPERIODO_ACADEMICO": key_table,
      },
    };
console.log(key_table, "FK")
    const query = new QueryBuilders('periodo_academico_config');

    // const getdata = changeKey(dataSede, "base", "periodo_academico_config");

    const getDataTable = await query.select(['*'])
                                .where('periodo_academico_config."FK_TPERIODO_ACADEMICO"', '=', key_table?.PK_TPERIODO_ACADEMICO)
                                .schema(parserTokenInformation?.dataSchema[0])
                               .get();
  console.log(getDataTable[0])
    setInitialValuePeriodo(getDataTable)
    return getDataTable

    // const initialValuesPeriodo = {
    //   BARRIO: getDataTable.BARRIO ? getDataTable.BARRIO : null,

    //   CODIGO: getDataTable.CODIGO ? getDataTable.CODIGO : null,
    //   COMUNA: getDataTable.COMUNA ? getDataTable.COMUNA : null,

    //   CORREO_ELECTRONICO: getDataTable.CORREO_ELECTRONICO
    //     ? getDataTable.CORREO_ELECTRONICO
    //     : null,
    //   DIRECCION: getDataTable.DIRECCION ? getDataTable.DIRECCION : null,
    //   ETNIAS: getDataTable.ETNIAS ? getDataTable.ETNIAS : null,
    //   FAX: getDataTable.FAX ? getDataTable.FAX : null,
    //   FECHA_LICENCIA: dayjs(
    //     getDataTable.FECHA_LICENCIA ? getDataTable.FECHA_LICENCIA : null
    //   ),
    //   FK_TARCHIVO: getDataTable.FK_TARCHIVO ? getDataTable.FK_TARCHIVO : null,

    //   FK_TFUNCIONARIO_RECTOR: getDataTable.FK_TFUNCIONARIO_RECTOR
    //     ? getDataTable.FK_TFUNCIONARIO_RECTOR
    //     : null,
    //   FK_TFUNCIONARIO_SECRETARIA: getDataTable.FK_TFUNCIONARIO_SECRETARIA
    //     ? getDataTable.FK_TFUNCIONARIO_SECRETARIA
    //     : null,
    //   FK_TLISTA_VALOR_ZONA: getDataTable.FK_TLISTA_VALOR_ZONA
    //     ? getDataTable.FK_TLISTA_VALOR_ZONA
    //     : null,
    //   FK_TLV_ASOCIACION_NACIONAL: getDataTable.FK_TLV_ASOCIACION_NACIONAL
    //     ? getDataTable.FK_TLV_ASOCIACION_NACIONAL
    //     : null,
    //   FK_TLV_CALENDARIO: getDataTable.FK_TLV_CALENDARIO
    //     ? getDataTable.FK_TLV_CALENDARIO
    //     : null,
    //   FK_TLV_DISCAPACIDAD: getDataTable.FK_TLV_DISCAPACIDAD
    //     ? getDataTable.FK_TLV_DISCAPACIDAD
    //     : null,

    //   FK_TLV_ESTADO_ESTABLECIMIENTO: getDataTable.FK_TLV_ESTADO_ESTABLECIMIENTO
    //     ? getDataTable.FK_TLV_ESTADO_ESTABLECIMIENTO
    //     : null,
    //   FK_TLV_GENERO_EST: getDataTable.FK_TLV_GENERO_EST
    //     ? getDataTable.FK_TLV_GENERO_EST
    //     : null,

    //   FK_TLV_IDIOMA: getDataTable.FK_TLV_IDIOMA
    //     ? getDataTable.FK_TLV_IDIOMA
    //     : null,

    //   FK_TLV_RANGO_TARIFA: getDataTable.FK_TLV_RANGO_TARIFA
    //     ? getDataTable.FK_TLV_RANGO_TARIFA
    //     : null,

    //   FK_TLV_REGIMEN_CATCOSTO: getDataTable.FK_TLV_REGIMEN_CATCOSTO
    //     ? getDataTable.FK_TLV_REGIMEN_CATCOSTO
    //     : null,

    //   FK_TMUNICIPIO: getDataTable.FK_TMUNICIPIO
    //     ? getDataTable.FK_TMUNICIPIO
    //     : null,

    //   FK_TPROPIEDAD_JURIDICA: getDataTable.FK_TPROPIEDAD_JURIDICA
    //     ? getDataTable.FK_TPROPIEDAD_JURIDICA
    //     : null,

    //   LICENCIA_FUNCIONAMIENTO: getDataTable.LICENCIA_FUNCIONAMIENTO
    //     ? getDataTable.LICENCIA_FUNCIONAMIENTO
    //     : null,

    //   LOCALIDAD: getDataTable.LOCALIDAD ? getDataTable.LOCALIDAD : null,

    //   NIT: getDataTable.NIT ? getDataTable.NIT : null,

    //   NOMBRE: getDataTable.NOMBRE ? getDataTable.NOMBRE : null,

    //   PAGINA_WEB: getDataTable.PAGINA_WEB ? getDataTable.PAGINA_WEB : null,

    //   PK_TESTABLECIMIENTO: getDataTable.PK_TESTABLECIMIENTO
    //     ? getDataTable.PK_TESTABLECIMIENTO
    //     : null,

    //   RESOLUCION_APROBACION: getDataTable.RESOLUCION_APROBACION
    //     ? getDataTable.RESOLUCION_APROBACION
    //     : null,

    //   SUBSIDIO: getDataTable.SUBSIDIO ? getDataTable.SUBSIDIO : null,

    //   TALENTO: getDataTable.TALENTO ? getDataTable.TALENTO : null,

    //   TELEFONO: getDataTable.TELEFONO ? getDataTable.TELEFONO : null,
    // };

    // setDataTable(initialValuesPeriodo);
  };

  // const handleSubmit = async (values: any) => {
  //   const getdata = {
  //     update_ESTABLECIMIENTO: values,
  //     where: {
  //       PK_TESTABLECIMIENTO: currentInstitution?.value,
  //     },
  //     schema: parserTokenInformation?.dataSchema[0],
  //   };

  //   setInitialValuePeriodo(null);

  //   await apiPostThunksAsync(getdata)
  //     .then((response) => {
  //       if (response.success == "OK") {
  //         messageApi.open({
  //           type: "success",
  //           content: "Los datos fueron actualizados correctamente",
  //           duration: 2,
  //         });
  //       }

  //       if (response.status == 400) {
  //         const messageResponse = response?.data?.message;

  //         if (messageResponse.includes("already exists")) {
  //           messageApi.open({
  //             type: "warning",
  //             content:
  //               "Uno o mas campos de valores unicos ya se encuentran registrado.",
  //             duration: 2,
  //           });

  //         } else {
  //           messageApi.open({
  //             type: "error",
  //             content: "Ocurrio un error inesperado, intentelo mas tarde.",
  //             duration: 2,
  //           });
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       messageApi.open({
  //         type: "error",
  //         content: "Ocurrio un error inesperado, intentelo mas tarde.",
  //         duration: 2,
  //       });

  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setTimeout(() => close(), 2500);
  //       apiGet("establecimiento", setInitialValuePeriodo);
  //     });
  // };

  return {

    apiGet,
    initialValuesPeriodo,
    setInitialValuePeriodo,

    // handleSubmit,
    contextHolder,
  };
};
