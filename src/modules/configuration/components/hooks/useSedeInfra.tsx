import { useEffect, useState } from "react";
import {
  apiFKThunksAsyncSedeInfra,
  apiGetThunksAsync,
  apiGetThunksAsyncSedeInfra,
} from "../../../../utils/services/api/thunks";
import { QueryBuilders } from "../../../../utils/orm/queryBuilders";
import { Form } from "antd";

import _ from 'lodash';
// import { apiPostThunksAsyncSedeJornada } from "../../../../utils/services/api/thunks";

export const useSedeInfra = () => {
  const tokenInformation = localStorage.getItem("user_token_information");
  const parserTokenInformation: any | null = tokenInformation
    ? JSON.parse(tokenInformation)
    : null;

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
  const [dataSeelect, setDataSelect] = useState<any>()


  const [form] = Form.useForm();

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
     
      setDataSelect(predata)
     
      return predata;
    } catch (error) {
      console.log("catch response: ", error);
      return null;
    }
  };
// Agrupar por la propiedad 'categoria'
const agrupados = _.groupBy(dataSeelect, 'CATEGORIA');

// Imprimir los resultados
// Crear un objeto final con el nombre de la categoría como llave
const resultado: { [key: string]: any } = {};
Object.entries(agrupados).forEach(([categoria, productos]) => {
  resultado[categoria] = productos;
  console.log(resultado, "resultado")
});

useEffect(()=> {
  infraFKData()
}, [])

  const infraSedeGetData = async (record) => {
    // const getPK = record["PK_TSEDE"]
    await apiGetThunksAsyncSedeInfra(record.PK_TSEDE)
      .then((response) => {
        if (response) {
          // console.log(response.data[0], "data")
          const preData = response.data[0];
          setDataSedeInfra(preData);
          const mergedData = { ...preData };
          console.log(mergedData, "mergeData")

          setInitialValues({
            DISTANCIA_CABECERA_MUNICIPAL:
              mergedData.DISTANCIA_CABECERA_MUNICIPAL
                ? mergedData.DISTANCIA_CABECERA_MUNICIPAL
                : null,
            VIA_ACCESO_TRONCAL: mergedData.VIA_ACCESO_TRONCAL
              ? mergedData.VIA_ACCESO_TRONCAL
              : null,
            VIA_ACCESO_PRINCIPAL: mergedData.VIA_ACCESO_PRINCIPAL
              ? mergedData.VIA_ACCESO_PRINCIPAL
              : null,
            VIA_ACCESO_RIO: mergedData.VIA_ACCESO_RIO
              ? mergedData.VIA_ACCESO_RIO
              : null,
            VIA_ACCESO_CARRETEABLE: mergedData.VIA_ACCESO_CARRETEABLE
              ? mergedData.VIA_ACCESO_CARRETEABLE
              : null,
            VIA_ACCESO_TRANSPORTE_ANIMAL:
              mergedData.VIA_ACCESO_TRANSPORTE_ANIMAL
                ? mergedData.VIA_ACCESO_TRANSPORTE_ANIMAL
                : null,
            VIA_ACCESO_OTROS: mergedData.PC_LICENCIADOS
              ? mergedData.PC_LICENCIADOS
              : null,
            DESCRIPCION_OTRO_ACCESO: mergedData.VIA_ACCESO_OTROS
              ? mergedData.VIA_ACCESO_OTROS
              : null,
            PC_LICENCIADOS: mergedData.PC_LICENCIADOS
              ? mergedData.PC_LICENCIADOS
              : null,
            ESTADO_INFRAESTRUCTURA: mergedData.ESTADO_INFRAESTRUCTURA
              ? mergedData.ESTADO_INFRAESTRUCTURA
              : null,
            TERRENO_ZONA: mergedData.TERRENO_ZONA
              ? mergedData.TERRENO_ZONA
              : null,
            TIPO_AULA: mergedData.TIPO_AULA
              ? mergedData.TIPO_AULA
              : null,
            SISTEMA_OPERATIVO: mergedData.SISTEMA_OPERATIVO
              ? mergedData.SISTEMA_OPERATIVO
              : null,
            ENCARGADO_LICENCIAS: mergedData.ENCARGADO_LICENCIAS
              ? mergedData.ENCARGADO_LICENCIAS
              : null,
          });
        }
      })

      .catch((error) => {
        console.log("catch response: ", error);
      });
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
    resultado
 
  };
};
