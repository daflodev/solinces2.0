import { useEffect, useState } from "react";
import { apiGetThunksAsync } from "../../../../utils/services/api/thunks";
import { QueryBuilders } from "../../../../utils/orm/queryBuilders";
// import { apiPostThunksAsyncSedeJornada } from "../../../../utils/services/api/thunks";


export const useSedeInfra  = () =>{
    const [isSedeInfraSecondaryTableOpen, setIsSedeInfraSecondaryTableOpen] = useState(false);


    // const [dataSedeInfra, setDataSedeInfra] = useState([])
    const [initialValues, setInitialValue] = useState<any | null>(null);
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

  const categoryApiGetFKTLVManager = (fkNameTable) => {
    
      const formatedName = fkNameTable.toUpperCase();

      return `'${formatedName}'`;
    }
  

  //data table for items list FK_TLV




  
  const apiGetFKTLV = async (nameTable: any, setDataTable: any) => {
    const prevData = {
      base: "",
      schema: parserTokenInformation?.dataSchema[0],
      where: {
        "lista_valor.CATEGORIA": categoryApiGetFKTLVManager(
          nameTable
        ),
      },
    };
    const getdata = changeKey(prevData, "base", "lista_valor");

    const getDataTable = await apiGetThunksAsync(getdata).then((response) => {
      //@ts-ignore
      const { getdata } = response;

      const res = getdata;
      console.log(res, "res")
      return res;
    }
    
    );
    const initialValues = {
      FK_TLV_ENCARGADO_LICENCIAS: getDataTable
      ? getDataTable 
      : null,
    };

    setDataTable(getDataTable)
  };


  return {
    initialValues, 
    setInitialValue,
    apiGetFKTLV,
  }
}

