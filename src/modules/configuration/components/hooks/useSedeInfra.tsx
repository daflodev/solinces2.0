import { useEffect, useState } from "react";
import {
  apiFKThunksAsyncSedeInfra,
  apiGetThunksAsync,
  apiGetThunksAsyncSedeInfra,
  apiPostThunksAsyncSedeInfra,
  apiPutSedeInfra,
} from "../../../../utils/services/api/thunks";
import { QueryBuilders } from "../../../../utils/orm/queryBuilders";
import { Form } from "antd";

import _ from "lodash";
// import { apiPostThunksAsyncSedeJornada } from "../../../../utils/services/api/thunks";

export const useSedeInfra = () => {
  // const tokenInformation = localStorage.getItem("user_token_information");
  // const parserTokenInformation: any | null = tokenInformation
  //   ? JSON.parse(tokenInformation)
  //   : null;

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

  //data table for items list FK
  // const apiGetFK = async (nameTable: any) => {
  //   // const prevData = {
  //   //   base: "",
  //   //   schema: parserTokenInformation?.dataSchema[0],
  //   // };

  //   // const getdata = changeKey(prevData, "base", nameTable);

  //   // const getDataTable = await apiGetThunksAsync(getdata).then((response) => {
  //   //   //@ts-ignore
  //   //   const { getdata } = response;

  //   //   const res = getdata;
  //   //   return res;
  //   // });
  //   const query = new QueryBuilders(nameTable);
  //       const getDataTable = await query
  //       .select('*')
  //       .schema(parserTokenInformation?.dataSchema[0])
  //       .limit(10)
  //       .get()
  //   return getDataTable;
  // };

  // const categoryApiGetFKTLVManager = (fkNameTable) => {

  //     const formatedName = fkNameTable.toUpperCase();

  //     return `'${formatedName}'`;
  //   }

  //data table for items list FK_TLV
  const [dataSedeInfra, setDataSedeInfra] = useState<any>({});
  const [initialValues, setInitialValues] = useState<any>({});
  const [dataSeelect, setDataSelect] = useState<any>();

  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);

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
      const predata = response.data;

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
    resultado[categoria] = productos;
    // console.log(resultado, "resultado");
  });

  const infraSedeGetData = async (record) => {
    // const getPK = record["PK_TSEDE"]
    await apiGetThunksAsyncSedeInfra(record.PK_TSEDE)
      .then((response) => {
        if (response) {
          // console.log(response.data[0], "data")
          const preData = response.data[0];

          console.log(preData, "mergeData");
          setDataSedeInfra(preData);
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
            FK_TLV_TERRENA_ZONA: preData.FK_TLV_TERRENA_ZONA
              ? preData.FK_TLV_TERRENA_ZONA
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
      })

      .catch((error) => {
        console.log("catch response: ", error);
      });
  };
  const handleFormSubmit = async (values) => {
    // console.log("Valores del formulario:", values);
    const dataForm = values;

    // console.log(dataForm);
    // console.log(dataSedeInfra.FK_TSEDE);

    apiPutSedeInfra(dataSedeInfra.FK_TSEDE, dataForm)
      .then((response) => {
        console.log(response);

        const updateData = response.data;

        console.log(updateData);
        return updateData;
      })
      .catch((error) => {
        console.log("Error al obtener los datos actualizados:", error);
      });

    // await  apiGetThunksAsyncSedeInfra(dataForm)

    //     // Realizar acciones adicionales con los valores del formulario si es necesario
  };
  // console.log(initialValues);

  // const apiGetFKTLV = async (nameTable: any, setDataTable: any) => {
  //   const prevData = {
  //     base: "",
  //     schema: parserTokenInformation?.dataSchema[0],
  //     where: {
  //       "lista_valor.CATEGORIA": categoryApiGetFKTLVManager(
  //         nameTable in ['nombre1','nombre2']
  //       ),
  //     },
  //   };
  //   const getdata = changeKey(prevData, "base", "lista_valor");

  //   const getDataTable = await apiGetThunksAsync(getdata).then((response) => {
  //     //@ts-ignore
  //     const { getdata } = response;

  //     const res = getdata;
  //     console.log(res, "res")
  //     return res;
  //   }

  //   );

  //   setDataTable(getDataTable)
  // };

  return {
    // apiGetFKTLV,
    form,
    dataSedeInfra,
    infraSedeGetData,
    initialValues,
    dataSeelect,
    resultado,
    infraFKData,
    handleFormSubmit,
  };
};
