import { useEffect, useState } from "react";
import {
  apiGetThunksAsyncSedeJornada,
  apiPostThunksAsyncSedeJornada,
} from "../../../../utils/services/api/thunks";
interface DataItem {
  PK_TJORNADA: any;
  NOMBRE: any;
  CODIGO: any;
  BOOLEAN_FIELD: any;
}
export const useJournySede = () => {
  const [dataSede, setDataSede] = useState<DataItem[] >([]);
  const [selectAll, setSelectAll] = useState(false);
  

  const journySedeGetData = async (record) => {
    console.log("record: ", record);

    await apiGetThunksAsyncSedeJornada(record.PK_TSEDE)
      .then((response) => {
        if (response) {
          console.log(response.data, "respuesta");
          const preData = response.data
          // const formatedData = preData.map((item)=>({...item, BOOLEAN_FIELD: item.BOOLEAN_FIELD}))
          setDataSede(preData);
        }
      })

      .catch((error) => {
        console.log("catch response: ", error);
      });
  };

  
  const handleSendData = () => {
    const selectedData = dataSede.filter((item) =>{
return item
    } );
    // Aquí puedes enviar los datos seleccionados a través de una solicitud HTTP o realizar cualquier otra acción deseada
    console.log('Datos seleccionados:', selectedData);
  };
  

  return {
    dataSede,
    journySedeGetData,
   
    handleSendData,
    setDataSede,
    selectAll,
    setSelectAll,
    // selectedItems,
    // setSelectedItems
  };
};
