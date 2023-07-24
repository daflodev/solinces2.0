import { message } from "antd";
//@ts-ignore
import dayjs from "dayjs";
import { useState } from "react";
import { apiFKThunksAsyncSedeInfra, } from "@/utils/services/api/thunks";
import { QueryBuilders } from "@/utils/orm/queryBuilders";
import _ from "lodash";
export const useFormTperiodo = () => {
  const [messageApi, contextHolder] = message.useMessage();

  // const [itemsColumnsInformation, setItemsColumnsInformation] = useState([]);

  // const [inputFilter, setInputFilter] = useState({});
  const [initialValuesPeriodo, setInitialValuePeriodo] = useState<any>({});
  const [dataTperiodo, setDataTperiodo] = useState<any>({});
  const [dataSeelectPeriodo, setDataSelect] = useState<any>();

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


  const tokenInformation = localStorage.getItem("user_token_information");
  const parserTokenInformation: any | null = tokenInformation
    ? JSON.parse(tokenInformation)
    : null;

  // const { currentInstitution } = sessionInformationStore(
  //   (state) => ({
  //     currentInstitution: state.currentInstitution,
  //   }),
  //   shallow
  // );

  // const query = new QueryBuilders('periodo_academico_config');
  // const results = await query.select(['*'])
  //                            .where('periodo_academico_config."FK_TPERIODO_ACADEMICO"', '=', 1392)
  //                            .schema(`${schema}`)
  //                            .get();

  const fkTlvCategoria = [
    "'CRITERIO_AREA'",
    "'CRITERIO_DESEMPENO'",
    "'CRITERIO_FINAL_PERACA'",
    "'MODIF_FINAL_PERACA'",
    "'CALCULO_DEFINITIVA'",
    "'CALCULO_DESCRIPTOR'",
    "'ORDEN_PLANTILLA'",
    "'ELEMENTO_CALCULO_DEF'",
    "'FORMATO_BOLETIN'",
    "'MODO_REDONDEAR'",
  ];

  const periodoFKData = async () => {
    try {
      const response = await apiFKThunksAsyncSedeInfra(fkTlvCategoria);
      console.log(response, "useInfra")
      const predata = response;

      setDataSelect(predata);

      return predata;
    } catch (error) {
      console.log("catch response: ", error);
      return null;
    }
  };
  // Agrupar por la propiedad 'categoria'
  const agrupados = _.groupBy(dataSeelectPeriodo, "CATEGORIA");

  // Imprimir los resultadoPeriodos
  // Crear un objeto final con el nombre de la categoría como llave
  const resultadoPeriodo = {};
  Object.entries(agrupados).forEach(([categoria, productos]) => {
    // if(categoria ===  )
    resultadoPeriodo[`FK_TLV_${categoria}`] = productos;
    // console.log(resultadoPeriodo, "resultadoPeriodo");
  });










  const apiGet = async (key_table) => {
    const query = new QueryBuilders('periodo_academico_config');

    // const getdata = changeKey(dataSede, "base", "periodo_academico_config");

    const getDataTable = await query.select(['*'])
      .where('periodo_academico_config."FK_TPERIODO_ACADEMICO"', '=', key_table?.PK_TPERIODO_ACADEMICO)
      .schema(parserTokenInformation?.dataSchema[0])
      .get();
    console.log(getDataTable)

    const preData = getDataTable[0]
    setDataTperiodo(preData)

    setInitialValuePeriodo(
      {
        CALIFICAR_ACTIVIDADES: preData.CALIFICAR_ACTIVIDADES ? preData.CALIFICAR_ACTIVIDADES : null,
        CALIFICAR_CRITERIOS: preData.CALIFICAR_CRITERIOS ? preData.CALIFICAR_CRITERIOS : null,


        CALIFICAR_DESCRIPTORES: preData.CALIFICAR_DESCRIPTORES ? preData.CALIFICAR_DESCRIPTORES : null,
        COMPARTIR_DESCRIPTORES: preData.COMPARTIR_DESCRIPTORES ? preData.COMPARTIR_DESCRIPTORES : null,
        DATOS_ESTUDIANTE: preData.DATOS_ESTUDIANTE ? preData.DATOS_ESTUDIANTE : null,
        DESCARGA_BOLETIN: preData.DESCARGA_BOLETIN ? preData.DESCARGA_BOLETIN : null,
        DESEMPENO_SUGERIDO: preData.DESEMPENO_SUGERIDO ? preData.DESEMPENO_SUGERIDO : null,
        DOCENTE_CREAR_CRITERIO: preData.DOCENTE_CREAR_CRITERIO ? preData.DOCENTE_CREAR_CRITERIO : null,
        FK_TFORMATO_CALIFICACION_ACT: preData.FK_TFORMATO_CALIFICACION_ACT ? preData.FK_TFORMATO_CALIFICACION_ACT : null,
        FK_TFORMATO_CALIFICACION_DEF: preData.FK_TFORMATO_CALIFICACION_DEF ? preData.FK_TFORMATO_CALIFICACION_DEF : null,
        FK_TLV_CALCULO_DEFINITIVA: preData.FK_TLV_CALCULO_DEFINITIVA ? preData.FK_TLV_CALCULO_DEFINITIVA : null,
        FK_TLV_CALCULO_DESCRIPTOR: preData.FK_TLV_CALCULO_DESCRIPTOR ? preData.FK_TLV_CALCULO_DESCRIPTOR : null,
        FK_TLV_CRITERIO_AREA: preData.CALIFICAR_CRITERIOS ? preData.CALIFICAR_CRITERIOS : null,
        FK_TLV_CRITERIO_DESEMPENO: preData.FK_TLV_CRITERIO_DESEMPENO ? preData.FK_TLV_CRITERIO_DESEMPENO : null,
        FK_TLV_CRITERIO_FINAL_PERACA: preData.FK_TLV_CRITERIO_FINAL_PERACA ? preData.FK_TLV_CRITERIO_FINAL_PERACA : null,
        FK_TLV_ELEMENTO_CALCULO_DEF: preData.FK_TLV_ELEMENTO_CALCULO_DEF ? preData.FK_TLV_ELEMENTO_CALCULO_DEF : null,
        FK_TLV_FORMATO_BOLETIN: preData.FK_TLV_FORMATO_BOLETIN ? preData.FK_TLV_FORMATO_BOLETIN : null,
        FK_TLV_MODIF_FINAL_PERACA: preData.FK_TLV_MODIF_FINAL_PERACA ? preData.FK_TLV_MODIF_FINAL_PERACA : null,
        FK_TLV_MODO_REDONDEAR: preData.FK_TLV_MODO_REDONDEAR ? preData.FK_TLV_MODO_REDONDEAR : null,
        FK_TLV_ORDEN_PLANTILLA: preData.FK_TLV_ORDEN_PLANTILLA ? preData.FK_TLV_ORDEN_PLANTILLA : null,
        INGERESO_ESTUDIANTES: preData.INGERESO_ESTUDIANTES ? preData.INGERESO_ESTUDIANTES : null,
        NOTAS_ACTIVIDADES: preData.NOTAS_ACTIVIDADES ? preData.NOTAS_ACTIVIDADES : null,
        PER_JEFE_ELIMINAR_CALIFICACION: preData.PER_JEFE_ELIMINAR_CALIFICACION ? preData.PER_JEFE_ELIMINAR_CALIFICACION : null,
        PORCENTAJE_FINAL_CALIF: preData.PORCENTAJE_FINAL_CALIF ? preData.PORCENTAJE_FINAL_CALIF : null,
        PORCENTAJE_INICIAL_CALIF: preData.PORCENTAJE_INICIAL_CALIF ? preData.PORCENTAJE_INICIAL_CALIF : null,
        VALIDA_CALIFICACION_PERACA: preData.VALIDA_CALIFICACION_PERACA ? preData.VALIDA_CALIFICACION_PERACA : null,
      })
  };


  const isValuesEmpty = (values: any) => {
    return Object.values(values).every(value => value === null || value === undefined);
  };


  const handleSubmitPeriodo = async (values: any) => {
    console.log(values)
    const updateForm = new QueryBuilders('periodo_academico_config');
    if (isValuesEmpty(values)) {

      const results = await updateForm.create(values).schema(parserTokenInformation?.dataSchema[0]).save();
      console.log(results);
      setInitialValuePeriodo(results);
    } else {
      // If values are not empty, perform the update operation
      const results = await updateForm.update(values)
        .where('"FK_TPERIODO_ACADEMICO"', '=', dataTperiodo.FK_TPERIODO_ACADEMICO)
        .schema(parserTokenInformation?.dataSchema[0])
        .save();
      console.log(results);
      setInitialValuePeriodo(results);
    }
  };

  return {

    apiGet,
    initialValuesPeriodo,
    setInitialValuePeriodo,
    periodoFKData,
    dataSeelectPeriodo,
    resultadoPeriodo,
    dataTperiodo,
    handleSubmitPeriodo,
    contextHolder,
  };
};
