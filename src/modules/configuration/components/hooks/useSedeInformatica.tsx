import { useState } from "react";
import {
  apiFKThunksAsyncSedeInfra,
  apiGetThunksAsyncSedeTecnology,
  apiPostThunksAsyncSedeTecnology,
  apiPutSedeTecnology,
} from "../../../../utils/services/api/thunks";
import { Form, message } from "antd";

import _ from "lodash";

export const useSedeTecnology = () => {
  //data table for items list FK_TLV
  const [dataSedeTecnology, setDataSedeTecnology] = useState<any>({});
  const [initialValuesTec, setInitialValuesTec] = useState<any>({});
  const [dataSeelectTec, setDataSelectTec] = useState<any>();
  const [messageApi, contextHolderTecnology] = message.useMessage();

  const [form] = Form.useForm();

  const fkTlvCategoria = [
    "'ACTIVIDADES_USO_PC'",
    "'ANCHO_BANDA'",
    "'ENCARGADO_PAGO_INTERNET'",
    "'PERIODO_MANTENIMIENTO'",
    "'TIPO_ACCESO_INTERNET'",
    "'TIPO_ENERGIA_ELECTRICA'",
    "'TIPO_MANTENIMIENTO'",
    "'ENCARGADO_MANTENIMIENTO'",
  ];

  const TecnologyFKData = async () => {
    try {
      const response = await apiFKThunksAsyncSedeInfra(fkTlvCategoria);
      const predata = response;

      setDataSelectTec(predata);

      return predata;
    } catch (error) {
      console.log("catch response: ", error);
      return null;
    }
  };
  // Agrupar por la propiedad 'categoria'
  const agrupados = _.groupBy(dataSeelectTec, "CATEGORIA");

  // Imprimir los resultados
  // Crear un objeto final con el nombre de la categoría como llave
  const resultadoInformatifca = {};
  Object.entries(agrupados).forEach(([categoria, productos]) => {
    resultadoInformatifca[`FK_TLV_${categoria}`] = productos;
    // console.log(resultado, "resultado");
  });

  const TecnologySedeGetData = async (record) => {
    // const getPK = record["PK_TSEDE"]
    await apiGetThunksAsyncSedeTecnology(record.PK_TSEDE)
      .then((response) => {
        if (response) {
          const preData =response;

          setDataSedeTecnology(preData);
          setInitialValuesTec({
            COMPUTADORES_DOTADO_MENI: preData.COMPUTADORES_DOTADO_MENI
              ? preData.COMPUTADORES_DOTADO_MENI
              : null,
            COMPUTADORES_DOTADO_MENII: preData.COMPUTADORES_DOTADO_MENII
              ? preData.COMPUTADORES_DOTADO_MENII
              : null,
            COMP_DOTADO_COMP_EDUCAR: preData.COMP_DOTADO_COMP_EDUCAR
              ? preData.COMP_DOTADO_COMP_EDUCAR
              : null,
            COMP_DOTADO_OTRA_ENTIDAD: preData.COMP_DOTADO_OTRA_ENTIDAD
              ? preData.COMP_DOTADO_OTRA_ENTIDAD
              : null,
            COMP_DOTADO_SECRE_EDUCACION: preData.COMP_DOTADO_SECRE_EDUCACION
              ? preData.COMP_DOTADO_SECRE_EDUCACION
              : null,
            CONTRATO_MANT_EQUIPOS_COMPUTO: preData.CONTRATO_MANT_EQUIPOS_COMPUTO
              ? preData.CONTRATO_MANT_EQUIPOS_COMPUTO
              : null,
            COSTO_MENSUAL_INTERNET: preData.COSTO_MENSUAL_INTERNET
              ? preData.COSTO_MENSUAL_INTERNET
              : null,

            FK_TLV_ACTIVIDADES_USO_PC: preData.FK_TLV_ACTIVIDADES_USO_PC
              ? preData.FK_TLV_ACTIVIDADES_USO_PC
              : null,
            FK_TLV_ANCHO_BANDA: preData.FK_TLV_ANCHO_BANDA
              ? preData.FK_TLV_ANCHO_BANDA
              : null,
            FK_TLV_ENCARGADO_MANTENIMIENTO:
              preData.FK_TLV_ENCARGADO_MANTENIMIENTO
                ? preData.FK_TLV_ENCARGADO_MANTENIMIENTO
                : null,
            FK_TLV_ENCARGADO_PAGO_INTERNET:
              preData.FK_TLV_ENCARGADO_PAGO_INTERNET
                ? preData.FK_TLV_ENCARGADO_PAGO_INTERNET
                : null,
            FK_TLV_PERIODO_MANTENIMIENTO: preData.FK_TLV_PERIODO_MANTENIMIENTO
              ? preData.FK_TLV_PERIODO_MANTENIMIENTO
              : null,
            FK_TLV_TIPO_ACCESO_INTERNET: preData.FK_TLV_TIPO_ACCESO_INTERNET
              ? preData.FK_TLV_TIPO_ACCESO_INTERNET
              : null,
            FK_TLV_TIPO_ENERGIA_ELECTRICA: preData.FK_TLV_TIPO_ENERGIA_ELECTRICA
              ? preData.FK_TLV_TIPO_ENERGIA_ELECTRICA
              : null,
            FK_TLV_TIPO_MANTENIMIENTO: preData.FK_TLV_TIPO_MANTENIMIENTO
              ? preData.FK_TLV_TIPO_MANTENIMIENTO
              : null,

            N_AULA_INFORMATICA: preData.N_AULA_INFORMATICA
              ? preData.N_AULA_INFORMATICA
              : null,
            N_EQUIPO_ADMIN: preData.N_EQUIPO_ADMIN
              ? preData.N_EQUIPO_ADMIN
              : null,
            N_EQUIPO_EDU: preData.N_EQUIPO_EDU ? preData.N_EQUIPO_EDU : null,
            N_EQUIPO_PROCESADOR_CON_486: preData.N_EQUIPO_PROCESADOR_CON_486
              ? preData.N_EQUIPO_PROCESADOR_CON_486
              : null,
            N_EQUIPO_PROCESADOR_INF_486: preData.N_EQUIPO_PROCESADOR_INF_486
              ? preData.N_EQUIPO_PROCESADOR_INF_486
              : null,
            N_EQUIPO_PROCESADOR_SUP_486: preData.N_EQUIPO_PROCESADOR_SUP_486
              ? preData.N_EQUIPO_PROCESADOR_SUP_486
              : null,
            N_EQUIPO_RED: preData.N_EQUIPO_RED ? preData.N_EQUIPO_RED : null,
            N_PUNTOS_RED_DATO_HABILITADO: preData.N_PUNTOS_RED_DATO_HABILITADO
              ? preData.N_PUNTOS_RED_DATO_HABILITADO
              : null,
            N_RED_DATOS: preData.N_RED_DATOS ? preData.N_RED_DATOS : null,
            OFRECE_ACCESO_COMUNIDAD: preData.OFRECE_ACCESO_COMUNIDAD
              ? preData.OFRECE_ACCESO_COMUNIDAD
              : null,
            SUMINISTRO_ENERGIA: preData.SUMINISTRO_ENERGIA
              ? preData.SUMINISTRO_ENERGIA
              : null,

            TIENE_ACCESO_INTERNET: preData.TIENE_ACCESO_INTERNET
              ? preData.TIENE_ACCESO_INTERNET
              : null,
            USO_PC_CONSULTA_CONTENIDO_DIGI:
              preData.USO_PC_CONSULTA_CONTENIDO_DIGI
                ? preData.USO_PC_CONSULTA_CONTENIDO_DIGI
                : null,
            USO_PC_DOCENTE_EDUCATIVO: preData.USO_PC_DOCENTE_EDUCATIVO
              ? preData.USO_PC_DOCENTE_EDUCATIVO
              : null,
            USO_PC_ENS_SOFT_PEDA_ESP: preData.USO_PC_ENS_SOFT_PEDA_ESP
              ? preData.USO_PC_ENS_SOFT_PEDA_ESP
              : null,

            USO_PC_HORARIO_CLASE: preData.USO_PC_HORARIO_CLASE
              ? preData.USO_PC_HORARIO_CLASE
              : null,
          });
        }
      })


      .catch((error) => {
        console.log("catch response: ", error);
      });
  };

  const handleFormSubmitTec = async (values, cerrarTable) => {
    // console.log("Valores del formulario:", values);
    const dataForm = values;

    const convertedData = {
      data: { ...dataForm, FK_TSEDE: dataSedeTecnology.FK_TSEDE },
    };

    let statusValue = false;

    // initialValuesTec.map((item) => {
    //     if (item != null) {
    //         statusValue = true
    //     }
    // })

    for (let propiedad in initialValuesTec) {
      if (initialValuesTec.hasOwnProperty(propiedad)) {
        if (initialValuesTec[propiedad] != null) {
          statusValue = true;
          break;
        }
      }
    }

    if (statusValue) {
      // actualizar
      await apiPutSedeTecnology(dataSedeTecnology.FK_TSEDE, convertedData.data)
        .then((response) => {
          if (response.data.status === "success") {
            apiGetThunksAsyncSedeTecnology(dataSedeTecnology.FK_TSEDE);
            messageApi.open({
              type: "success",
              content: "se ha modificado la infraestructura tecnologia a la sede",
            });

            setTimeout(() => {
              cerrarTable();
            }, 2000);
          } else {
            messageApi.open({
              type: "error",
              content:
                "no se pudo hacer editar la infraestructura  tecnologia de la sede",
            });
          }

          return response;
        })
        .catch((error) => {
          console.log("Error al obtener los datos actualizados:", error);
        });
    } else {
      // crear
      await apiPostThunksAsyncSedeTecnology(convertedData.data).then(
        (response) => {
          if (response.data.status === "success") {
            apiGetThunksAsyncSedeTecnology(dataSedeTecnology.FK_TSEDE);
          }
        }
      );
    }
  };

  return {
    form,
    dataSedeTecnology,
    TecnologySedeGetData,
    initialValuesTec,
    dataSeelectTec,
    resultadoInformatifca,
    TecnologyFKData,
    handleFormSubmitTec,
    setDataSedeTecnology,
    contextHolderTecnology,
  };
};
