import { useState } from "react";
import {
  apiFKThunksAsyncSedeInfra,
  apiGetThunksAsyncSedeInfra,
  apiPostThunksAsyncSedeInfra,
  // apiPostThunksAsyncSedeInfra,
  apiPutSedeInfra,
} from "@/services/api/thunks";
import { Form, message } from "antd";

import _ from "lodash";
import { QueryBuilders } from "@/services/orm/queryBuilders";

export const useSedeInfra = () => {
  // const tokenInformation = localStorage.getItem("user_token_information");
  // const parserTokenInformation: any | null = tokenInformation
  //   ? JSON.parse(tokenInformation)
  //   : null;

  const [dataSedeInfra, setDataSedeInfra] = useState<any>([]);
  const [colunmField, setColumnField] = useState<any>([]);
  const [initialValues, setInitialValues] = useState<any>({});
  const [dataSeelect, setDataSelect] = useState<any>();

  const [form] = Form.useForm();
  const [messageApi, contextHolderInfra] = message.useMessage();

  const fkTlvCategoria = [
    "'ESTADO_INFRAESTRUCTURA'",
    "'TERRENO_ZONA'",
    "'TIPO_AULA'",
    "'SISTEMA_OPERATIVO'",
    "'ENCARGADO_LICENCIAS'",
  ];

  const infraFKData = async () => {
    try {
      const response = await apiFKThunksAsyncSedeInfra(fkTlvCategoria);
      const predata = response;

      setDataSelect(predata);
      return predata;
    } catch (error) {
      console.log("catch response: ", error);
      return null;
    }
  };
  // Agrupar por la propiedad 'categoria'
  const agrupados = _.groupBy(dataSeelect, "CATEGORIA");

  // Imprimir los resultados
  // Crear un objeto final con el nombre de la categoría como llave
  const resultado = {};
  Object.entries(agrupados).forEach(([categoria, productos]) => {
    // if(categoria ===  )
    resultado[`FK_TLV_${categoria}`] = productos;
    // console.log(resultado, "resultado");
  });

  const tokenInformation = localStorage.getItem("user_token_information");
  const parserTokenInformation: any | null = tokenInformation
    ? JSON.parse(tokenInformation)
    : null;





  const columnInfoINFRA = async (key_table) => {
    const query = new QueryBuilders('sede_infraestructura');

    // const getdata = changeKey(dataSede, "base", "sede_infraestructura");

    const getDataTable = await query.select(['*'])
      .where('sede_infraestructura."FK_TSEDE"', '=', key_table?.PK_TSEDE)
      .schema(parserTokenInformation?.dataSchema[0])
      .columninfo();

      const preData =  Object.values(getDataTable)
      const filteredData = preData.filter((obj) => obj.column_name !== "FK_TSEDE" && obj.column_name !== "AUTHOR_RC" && obj.column_name !== "CLIENTS_RC");

    console.log(filteredData, "COLUMN_INFO")
    setColumnField(filteredData)
  }



  const newApiget = async (key_table) => {
    // console.log(key_table)
    const query = new QueryBuilders('sede_infraestructura')


    const getDataTable = await query.select(['*'])
      .where('sede_infraestructura."FK_TSEDE"', '=', key_table?.PK_TSEDE)
      .schema(parserTokenInformation?.dataSchema[0])
      .get();
    const preData = getDataTable[0]
    console.log(preData)
    setDataSedeInfra(preData)
    // console.log(preData)
    setInitialValues({
      DISTANCIA_CABECERA_MUNICIPAL: preData.DISTANCIA_CABECERA_MUNICIPAL
        ? preData.DISTANCIA_CABECERA_MUNICIPAL
        : null,
      VIA_ACCESO_TRONCAL: preData.VIA_ACCESO_TRONCAL
        ? preData.VIA_ACCESO_TRONCAL
        : null,
      VIA_ACCESO_PRINCIPAL: preData.VIA_ACCESO_PRINCIPAL
        ? preData.VIA_ACCESO_PRINCIPAL
        : null,
      VIA_ACCESO_RIO: preData.VIA_ACCESO_RIO
        ? preData.VIA_ACCESO_RIO
        : null,
      VIA_ACCESO_CARRETEABLE: preData.VIA_ACCESO_CARRETEABLE
        ? preData.VIA_ACCESO_CARRETEABLE
        : null,
      VIA_ACCESO_TRANSPORTE_ANIMAL: preData.VIA_ACCESO_TRANSPORTE_ANIMAL
        ? preData.VIA_ACCESO_TRANSPORTE_ANIMAL
        : null,
      VIA_ACCESO_OTROS: preData.PC_LICENCIADOS
        ? preData.PC_LICENCIADOS
        : null,
      DESCRIPCION_OTRO_ACCESO: preData.VIA_ACCESO_OTROS
        ? preData.VIA_ACCESO_OTROS
        : null,
      PC_LICENCIADOS: preData.PC_LICENCIADOS
        ? preData.PC_LICENCIADOS
        : null,
      FK_TLV_ESTADO_INFRAESTRUCTURA: preData.FK_TLV_ESTADO_INFRAESTRUCTURA
        ? preData.FK_TLV_ESTADO_INFRAESTRUCTURA
        : null,
      FK_TLV_TERRENO_ZONA: preData.FK_TLV_TERRENO_ZONA
        ? preData.FK_TLV_TERRENO_ZONA
        : null,
      FK_TLV_TIPO_AULA: preData.FK_TLV_TIPO_AULA
        ? preData.FK_TLV_TIPO_AULA
        : null,
      FK_TLV_SISTEMA_OPERATIVO: preData.FK_TLV_SISTEMA_OPERATIVO
        ? preData.FK_TLV_SISTEMA_OPERATIVO
        : null,
      FK_TLV_ENCARGADO_LICENCIAS: preData.FK_TLV_ENCARGADO_LICENCIAS
        ? preData.FK_TLV_ENCARGADO_LICENCIAS
        : null,
    });
  }
  const isValuesEmpty = (values: any) => {
    return Object.values(values).every(value => value === null || value === undefined);
  };


  // const infraSedeGetData = async (record) => {
  //   // const getPK = record["PK_TSEDE"]





  //   await apiGetThunksAsyncSedeInfra(record.PK_TSEDE)
  //     .then((response) => {
  //       console.log(response)
  //       if (response) {
  //         // console.log(response.data[0], "data")
  //         const preData = response;

  //         // console.log(preData, "mergeData");
  //         setDataSedeInfra(preData);
  //         setInitialValues({
  //           DISTANCIA_CABECERA_MUNICIPAL: preData.DISTANCIA_CABECERA_MUNICIPAL
  //             ? preData.DISTANCIA_CABECERA_MUNICIPAL
  //             : null,
  //           VIA_ACCESO_TRONCAL: preData.VIA_ACCESO_TRONCAL
  //             ? preData.VIA_ACCESO_TRONCAL
  //             : null,
  //           VIA_ACCESO_PRINCIPAL: preData.VIA_ACCESO_PRINCIPAL
  //             ? preData.VIA_ACCESO_PRINCIPAL
  //             : null,
  //           VIA_ACCESO_RIO: preData.VIA_ACCESO_RIO
  //             ? preData.VIA_ACCESO_RIO
  //             : null,
  //           VIA_ACCESO_CARRETEABLE: preData.VIA_ACCESO_CARRETEABLE
  //             ? preData.VIA_ACCESO_CARRETEABLE
  //             : null,
  //           VIA_ACCESO_TRANSPORTE_ANIMAL: preData.VIA_ACCESO_TRANSPORTE_ANIMAL
  //             ? preData.VIA_ACCESO_TRANSPORTE_ANIMAL
  //             : null,
  //           VIA_ACCESO_OTROS: preData.PC_LICENCIADOS
  //             ? preData.PC_LICENCIADOS
  //             : null,
  //           DESCRIPCION_OTRO_ACCESO: preData.VIA_ACCESO_OTROS
  //             ? preData.VIA_ACCESO_OTROS
  //             : null,
  //           PC_LICENCIADOS: preData.PC_LICENCIADOS
  //             ? preData.PC_LICENCIADOS
  //             : null,
  //           FK_TLV_ESTADO_INFRAESTRUCTURA: preData.FK_TLV_ESTADO_INFRAESTRUCTURA
  //             ? preData.FK_TLV_ESTADO_INFRAESTRUCTURA
  //             : null,
  //           // FK_TLV_TERRENA_ZONA: preData.FK_TLV_TERRENO_ZONA
  //           //   ? preData.FK_TLV_TERRENO_ZONA
  //           //   : null,
  //           FK_TLV_TIPO_AULA: preData.FK_TLV_TIPO_AULA
  //             ? preData.FK_TLV_TIPO_AULA
  //             : null,
  //           FK_TLV_SISTEMA_OPERATIVO: preData.FK_TLV_SISTEMA_OPERATIVO
  //             ? preData.FK_TLV_SISTEMA_OPERATIVO
  //             : null,
  //           FK_TLV_ENCARGADO_LICENCIAS: preData.FK_TLV_ENCARGADO_LICENCIAS
  //             ? preData.FK_TLV_ENCARGADO_LICENCIAS
  //             : null,
  //         });
  //       }
  //     })

  //     .catch((error) => {
  //       console.log("catch response: ", error);
  //     });
  // };
  const handleFormSubmit = async (values: any, cerrarTable: any, record: any) => {
    const updateForm = new QueryBuilders('sede_infraestructura');
    if (isValuesEmpty(values)) {

      await updateForm.create(values).schema(parserTokenInformation?.dataSchema[0]).save();
      // console.log(results);
      setTimeout(() => {
        cerrarTable();
    }, 2000);
      
    } else {
      // If values are not empty, perform the update operation
        await updateForm.update(values)
        .where('"FK_TSEDE"', '=', record)
        .schema(parserTokenInformation?.dataSchema[0])
        .save()
        .then((response) => {
          // console.log(response)
          let isSuccess = false;

          for (const key in response) {
            if (Object.hasOwnProperty.call(response, key)) {
              const value = response[key];
              // console.log(`${key}: ${value}`);

              if (key === 'message' && value === 'Success') {
                isSuccess = true;
                break;
              }
            }
          }

          if (isSuccess) {
            // console.log('La solicitud fue exitosa.');
            messageApi.open({
              type: "success",
              content: "se ha modificado la infraestructura fisica a la sede",
            });

            setTimeout(() => {
              cerrarTable();
            }, 2000);
          } else {
            // console.log('La solicitud no fue exitosa.');
            messageApi.open({
              type: "error",
              content:
                "no se pudo hacer editar la infraestructura  fisica de la sede",
            });
            setTimeout(() => {
              cerrarTable();
            }, 2000);
          }


        })
    }

      setInitialValues(values);

    // const dataForm = values;

    // const convertedData = {
    //   data: { ...dataForm, FK_TSEDE: initialValues.FK_TSEDE },
    // };

    // let statusValue = false;

    // // initialValuesTec.map((item) => {
    // //     if (item != null) {
    // //         statusValue = true
    // //     }
    // // })

    // for (let propiedad in initialValues) {
    //   if (initialValues.hasOwnProperty(propiedad)) {
    //     // console.log(`La propiedad ${propiedad} tiene el valor ${initialValues[propiedad]}`);
    //     if (initialValues[propiedad] != null) {
    //       statusValue = true;
    //       break;
    //     }
    //   }
    // }

    // if (statusValue) {
    //   await apiPutSedeInfra(dataSedeInfra.FK_TSEDE, convertedData.data)
    //     .then((response) => {
    //       if (response.data.status === "success") {
    //         apiGetThunksAsyncSedeInfra(dataSedeInfra.FK_TSEDE);
    //         messageApi.open({
    //           type: "success",
    //           content: "se ha modificado las infraestructura fisica a la sede",
    //         });

    //         setTimeout(() => {
    //           cerrarTable();
    //         }, 2000);
    //       } else {
    //         messageApi.open({
    //           type: "error",
    //           content:
    //             "no se pudo editar la infraestructura fisica de la sede",
    //         });
    //       }

    //       return response;
    //     })
    //     .catch((error) => {
    //       console.log("Error al obtener los datos actualizados:", error);
    //     });
    // } else {
    //   await apiPostThunksAsyncSedeInfra(convertedData.data).then((response) => {
    //     if (response.data.status === "success") {
    //       apiGetThunksAsyncSedeInfra(dataSedeInfra.FK_TSEDE);
    //     }
    //   });
    // }

    //     // Realizar acciones adicionales con los valores del formulario si es necesario
  };

  return {
    // apiGetFKTLV,
    form,
    dataSedeInfra,
    // infraSedeGetData,
    initialValues,
    dataSeelect,
    resultado,
    infraFKData,
    handleFormSubmit,
    setDataSedeInfra,
    contextHolderInfra,
    newApiget,
    columnInfoINFRA,
    colunmField
  };
};
