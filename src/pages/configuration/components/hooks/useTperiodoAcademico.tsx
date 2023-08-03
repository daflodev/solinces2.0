import { message } from "antd";
import { useEffect, useState } from "react";
;
import _ from "lodash";
import { apiFKThunksAsyncSedeInfra } from "@/services/api/thunks";
import { QueryBuilders } from "@/services/orm/queryBuilders";
// import { sessionInformationStore } from "@/store/userInformationStore";
// import shallow from "zustand/shallow";
export const useFormTperiodo = () => {
  const [messageApi, contextHolderPeriodo] = message.useMessage();

  // const [itemsColumnsInformation, setItemsColumnsInformation] = useState([]);

  // const [inputFilter, setInputFilter] = useState({});
  const [initialValuesPeriodo, setInitialValuePeriodo] = useState<any | null>(
    null
  );
  const [dataTperiodo, setDataTperiodo] = useState<any>(null);
  const [dataSeelectPeriodo, setDataSelectPeriodo] = useState<any>();
  const [colunmFieldPeriodo, setColumnFieldPeriodo] = useState<any>([]);

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

  const apiGetFK = async (tablePrincipal: any, key_table: any) => {

    console.log(tablePrincipal);


    const query = new QueryBuilders(tablePrincipal);
    // console.log(tablePrincipal)
    if (tablePrincipal === "escala") {
      const getDataTable = await query
        .select(["*"])
        .schema(parserTokenInformation?.dataSchema[0])
        .where(
          `${tablePrincipal}."FK_TPERIODO_ACADEMICO"`,
          "=", key_table?.PK_TPERIODO_ACADEMICO
        )

        // .limit(10)
        .get();
      // console.log(getDataTable);
      return getDataTable;
    }
    if (tablePrincipal === "formato_calificacion") {
      const getDataTable = await query
        .select(
          ' DISTINCT formato_calificacion."PK_TFORMATO_CALIFICACION", formato_calificacion."CODIGO", formato_calificacion."NOMBRE"'
        )
        .schema(parserTokenInformation?.dataSchema[0])
        .join(
          "periodo_academico_config",
          '"FK_TFORMATO_CALIFICACION_DEF"',
          'formato_calificacion."PK_TFORMATO_CALIFICACION"'
        )
        .get()
      return getDataTable;

    }
  };

  const apiGetFKTFormatoACT = async (tablePrincipal: any) => {
    const query = new QueryBuilders(tablePrincipal);
    let getDataTable
    if (tablePrincipal === "formato_calificacion") {
      getDataTable = await query
        .select(
          ' DISTINCT formato_calificacion."PK_TFORMATO_CALIFICACION", formato_calificacion."CODIGO", formato_calificacion."NOMBRE"'
        )
        .schema(parserTokenInformation?.dataSchema[0])
        .join(
          "periodo_academico_config",
          '"FK_TFORMATO_CALIFICACION_ACT"',
          'formato_calificacion."PK_TFORMATO_CALIFICACION"'
        )
        .get()
      return getDataTable;

    }
  };
  //Grupo de informacion par ala FK
  const [fkGroupTFormatoACT, setFkGroupTFormatoACT] = useState({});


  const FKConsultManagerFKTFormatoACT = (FKNameList: any) => {
    let answer = {};

    FKNameList.map((name) => {
      const tableName = name;
      //  ` console.log(tableName, "table name")`;
      if (tableName.startsWith("FK_TF")) {
        // console.log(tableName, "table name");
        const parserTablename = tableName.replace("FK_T", "");
        // console.log(parserTablename, "parse table");
        apiGetFKTFormatoACT(parserTablename.toLowerCase())
          .then((response) => {
            const res = response;
            answer = {
              ...answer,
              [name]: res,
            };
          })
          .then(() => {
            setFkGroupTFormatoACT({
              ...fkGroupTFormatoACT,
              ...answer,
            });
          })
          .catch((e) => {
            // const pre = {
            //   [name]: []
            // }

            // setFkGroup({
            //   ... fkGroup,
            //   ...pre
            // })

            console.log(` error en ${name}: `, e);
          });
      }
    });
    return answer;
  };

  //Grupo de informacion par ala FK
  const [fkGroup, setFkGroup] = useState({});

  const FKConsultManager = (FKNameList: any, key_table: any) => {
    let answer = {};

    FKNameList.map((name) => {
      const tableName = name;
      // console.log(tableName, "table name");
      if (tableName.startsWith("FK_TE") || tableName.startsWith("FK_TF")) {
        // console.log(tableName, "table name");
        const parserTablename = tableName.replace("FK_T", "");
        // console.log(parserTablename, "parse table");
        apiGetFK(parserTablename.toLowerCase(), key_table)
          .then((response) => {
            const res = response;
            answer = {
              ...answer,
              [name]: res,
            };
          })
          .then(() => {
            setFkGroup({
              ...fkGroup,
              ...answer,
            });
          })
          .catch((e) => {
            // const pre = {
            //   [name]: []
            // }

            // setFkGroup({
            //   ... fkGroup,
            //   ...pre
            // })

            console.log(` error en ${name}: `, e);
          });
      }
    });
    return answer;
  };






  const periodoFKData = async () => {
    try {
      const response = await apiFKThunksAsyncSedeInfra(fkTlvCategoria);
      // console.log(response, "usePeriodo")
      const predata = response;
      // console.log(predata, "consulta")
      setDataSelectPeriodo(predata);

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
  // console.log(resultadoPeriodo)

  const columInfoPeriodo = async (key_table) => {
    const query = new QueryBuilders("periodo_academico_config");

    // const getdata = changeKey(dataSede, "base", "sede_infraestructura");

    const getDataTable = await query
      .select(["*"])
      .where(
        'periodo_academico_config."FK_TPERIODO_ACADEMICO"',
        "=",
        key_table?.PK_TPERIODO_ACADEMICO
      )
      .schema(parserTokenInformation?.dataSchema[0])
      .columninfo();

    const preData = Object.values(getDataTable);
    const filteredData = preData.filter(
      (obj: any) =>
        obj.column_name !== "FK_TPERIODO_ACADEMICO" &&
        obj.column_name !== "AUTHOR_RC" &&
        obj.column_name !== "CLIENTS_RC"
    );

    // console.log(filteredData, "COLUMN_INFO");
    setColumnFieldPeriodo(filteredData);
  };

  const apiGet = async (key_table) => {
    const query = new QueryBuilders("periodo_academico_config");

    // const getdata = changeKey(dataSede, "base", "periodo_academico_config");

    const getDataTable = await query
      .select(["*"])
      .where(
        'periodo_academico_config."FK_TPERIODO_ACADEMICO"',
        "=",
        key_table?.PK_TPERIODO_ACADEMICO
      )
      .schema(parserTokenInformation?.dataSchema[0])
      .get();
    // console.log(getDataTable);

    const preData = getDataTable[0] ? getDataTable[0] : [];
    setDataTperiodo(preData);

    setInitialValuePeriodo({
      CALIFICAR_ACTIVIDADES: preData.CALIFICAR_ACTIVIDADES
        ? preData.CALIFICAR_ACTIVIDADES
        : null,
      CALIFICAR_CRITERIOS: preData.CALIFICAR_CRITERIOS
        ? preData.CALIFICAR_CRITERIOS
        : null,
      CALIFICAR_DESCRIPTORES: preData.CALIFICAR_DESCRIPTORES
        ? preData.CALIFICAR_DESCRIPTORES
        : null,
      COMPARTIR_DESCRIPTORES: preData.COMPARTIR_DESCRIPTORES
        ? preData.COMPARTIR_DESCRIPTORES
        : null,
      DATOS_ESTUDIANTE: preData.DATOS_ESTUDIANTE
        ? preData.DATOS_ESTUDIANTE
        : null,
      DESCARGA_BOLETIN: preData.DESCARGA_BOLETIN
        ? preData.DESCARGA_BOLETIN
        : null,
      DESEMPENO_SUGERIDO: preData.DESEMPENO_SUGERIDO
        ? preData.DESEMPENO_SUGERIDO
        : null,
      DOCENTE_CREAR_CRITERIO: preData.DOCENTE_CREAR_CRITERIO
        ? preData.DOCENTE_CREAR_CRITERIO
        : null,
      FK_TFORMATO_CALIFICACION_ACT: preData.FK_TFORMATO_CALIFICACION_ACT
        ? preData.FK_TFORMATO_CALIFICACION_ACT
        : null,
      FK_TFORMATO_CALIFICACION_DEF: preData.FK_TFORMATO_CALIFICACION_DEF
        ? preData.FK_TFORMATO_CALIFICACION_DEF
        : null,
      FK_TESCALA: preData.FK_TESCALA ? preData.FK_TESCALA : null,
      FK_TLV_CALCULO_DEFINITIVA: preData.FK_TLV_CALCULO_DEFINITIVA
        ? preData.FK_TLV_CALCULO_DEFINITIVA
        : null,
      FK_TLV_CALCULO_DESCRIPTOR: preData.FK_TLV_CALCULO_DESCRIPTOR
        ? preData.FK_TLV_CALCULO_DESCRIPTOR
        : null,
      FK_TLV_CRITERIO_AREA: preData.FK_TLV_CRITERIO_AREA
        ? preData.FK_TLV_CRITERIO_AREA
        : null,
      FK_TLV_CRITERIO_DESEMPENO: preData.FK_TLV_CRITERIO_DESEMPENO
        ? preData.FK_TLV_CRITERIO_DESEMPENO
        : null,
      FK_TLV_CRITERIO_FINAL_PERACA: preData.FK_TLV_CRITERIO_FINAL_PERACA
        ? preData.FK_TLV_CRITERIO_FINAL_PERACA
        : null,
      FK_TLV_ELEMENTO_CALCULO_DEF: preData.FK_TLV_ELEMENTO_CALCULO_DEF
        ? preData.FK_TLV_ELEMENTO_CALCULO_DEF
        : null,
      FK_TLV_FORMATO_BOLETIN: preData.FK_TLV_FORMATO_BOLETIN
        ? preData.FK_TLV_FORMATO_BOLETIN
        : null,
      FK_TLV_MODIF_FINAL_PERACA: preData.FK_TLV_MODIF_FINAL_PERACA
        ? preData.FK_TLV_MODIF_FINAL_PERACA
        : null,
      FK_TLV_MODO_REDONDEAR: preData.FK_TLV_MODO_REDONDEAR
        ? preData.FK_TLV_MODO_REDONDEAR
        : null,
      FK_TLV_ORDEN_PLANTILLA: preData.FK_TLV_ORDEN_PLANTILLA
        ? preData.FK_TLV_ORDEN_PLANTILLA
        : null,
      INGERESO_ESTUDIANTES: preData.INGERESO_ESTUDIANTES
        ? preData.INGERESO_ESTUDIANTES
        : null,
      NOTAS_ACTIVIDADES: preData.NOTAS_ACTIVIDADES
        ? preData.NOTAS_ACTIVIDADES
        : null,
      PER_JEFE_ELIMINAR_CALIFICACION: preData.PER_JEFE_ELIMINAR_CALIFICACION
        ? preData.PER_JEFE_ELIMINAR_CALIFICACION
        : null,
      PORCENTAJE_FINAL_CALIF: preData.PORCENTAJE_FINAL_CALIF
        ? preData.PORCENTAJE_FINAL_CALIF
        : null,
      PORCENTAJE_INICIAL_CALIF: preData.PORCENTAJE_INICIAL_CALIF
        ? preData.PORCENTAJE_INICIAL_CALIF
        : null,
      VALIDA_CALIFICACION_PERACA: preData.VALIDA_CALIFICACION_PERACA
        ? preData.VALIDA_CALIFICACION_PERACA
        : null,
    });
  };

  const isValuesEmpty = () => {
    return Object.values(initialValuesPeriodo).every(
      (value) => value === null || value === undefined || value === ""
    );
  };





  const cambiarNombreLlave = (objeto, nombreActual, nombreNuevo) => {
    if (objeto.hasOwnProperty(nombreActual)) {
      objeto[nombreNuevo] = objeto[nombreActual];
      delete objeto[nombreActual];
    }
  };

  const combinarObjetos = (obj1, obj2) => {
    // Copiar el contenido de obj2 en obj1
    for (let prop in obj2) {
      if (obj2.hasOwnProperty(prop)) {
        obj1[prop] = obj2[prop];
      }
    }
    return obj1;
  };


  cambiarNombreLlave(fkGroup, 'FK_TFORMATO_CALIFICACION', 'FK_TFORMATO_CALIFICACION_DEF');
  cambiarNombreLlave(fkGroupTFormatoACT, 'FK_TFORMATO_CALIFICACION', 'FK_TFORMATO_CALIFICACION_ACT');

  let combinedObject = combinarObjetos(fkGroup, fkGroupTFormatoACT);

  const handleSubmitPeriodo = async (
    values: any,
    cerrarTable: any,
    record: any
  ) => {
    for (const llave in values) {
      if (values.hasOwnProperty(llave)) {
        if (values[llave] === null) {
          delete values[llave];
        }
      }
    }

    values["FK_TPERIODO_ACADEMICO"] = record;
    // console.log(values)
    console.log(values);
    const updateForm = new QueryBuilders("periodo_academico_config");
    if (isValuesEmpty()) {
      await updateForm
        .create(values)
        .schema(parserTokenInformation?.dataSchema[0])
        .save()
        .then((response) => {
          console.log(response)
          let isSuccess = false;

          for (const key in response) {
            if (Object.hasOwnProperty.call(response, key)) {
              const value = response[key];
              // console.log(`${key}: ${value}`);

              if (key === "message" && value === "Success") {
                isSuccess = true;
                break;
              }
            }
          }

          if (isSuccess) {
            // console.log('La solicitud fue exitosa.');
            messageApi.open({
              type: "success",
              content:
                "se ha modificado la infraestructura tecnologia a la sede",
            });

            setTimeout(() => {
              cerrarTable();
            }, 2000);
          } else {
            // console.log('La solicitud no fue exitosa.');
            messageApi.open({
              type: "error",
              content:
                "no se pudo hacer editar la infraestructura  tecnologia de la sede",
            });
            setTimeout(() => {
              cerrarTable();
            }, 2000);
          }
        });
      // console.log(results);
      setInitialValuePeriodo(values);
    } else {
      // If values are not empty, perform the update operation
      await updateForm
        .update(values)
        .where('"FK_TPERIODO_ACADEMICO"', "=", record)
        .schema(parserTokenInformation?.dataSchema[0])
        .save()
        .then((response) => {
          console.log(response)
          let isSuccess = false;

          for (const key in response) {
            if (Object.hasOwnProperty.call(response, key)) {
              const value = response[key];
              console.log(value, "value")
              // console.log(`${key}: ${value}`);

              if (key === "message" && value === "Success") {
                isSuccess = true;
                break;
              }
            }
          }

          if (isSuccess) {
            // console.log('La solicitud fue exitosa.');
            messageApi.open({
              type: "success",
              content:
                "se ha modificado informacion general del periodo academico",
            });

            setTimeout(() => {
              cerrarTable();
            }, 2000);
            // } else {
            //   console.log('La solicitud no fue exitosa.');
            
          }else{
            messageApi.open({
              type: "error",
              content:
                "no se pudo hacer modificar informacon general del periodo academico",
            });
            setTimeout(() => {
              cerrarTable();
            }, 2000);
          }
        });

      // console.log(results);

      setInitialValuePeriodo(values);
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
    contextHolderPeriodo,
    columInfoPeriodo,
    colunmFieldPeriodo,
    FKConsultManager,
    fkGroup,
    fkGroupTFormatoACT,
    combinedObject,
    FKConsultManagerFKTFormatoACT,
    // getFK
  };
};
