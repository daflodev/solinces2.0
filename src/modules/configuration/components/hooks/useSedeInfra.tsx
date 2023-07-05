import { useEffect, useState } from "react";
import {
  apiGetThunksAsync,
  apiGetThunksAsyncSedeInfra,
} from "../../../../utils/services/api/thunks";
import { QueryBuilders } from "../../../../utils/orm/queryBuilders";
import { Form } from "antd";
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

  const [form] = Form.useForm();

  const infraSedeGetData = async (record) => {
    // const getPK = record["PK_TSEDE"]
    await apiGetThunksAsyncSedeInfra(record.PK_TSEDE)
      .then((response) => {
        if (response) {
          const preData = response.data;
          setDataSedeInfra(preData);
          form.setFieldsValue(preData);
        }
      })

      .catch((error) => {
        console.log("catch response: ", error);
      });


    };



    const initialValues={
      PC_LINCENCIADOS : dataSedeInfra?.PC_LINCENCIADOS ? dataSedeInfra.PC_LINCENCIADOS : null
    }

  console.log(dataSedeInfra);

  // const apiGetFKTLV = async (nameTable: any, setDataTable: any) => {
  //   const prevData = {
  //     base: "",
  //     schema: parserTokenInformation?.dataSchema[0],
  //     where: {
  //       "lista_valor.CATEGORIA": categoryApiGetFKTLVManager(
  //         nameTable
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
    initialValues
  };
};
