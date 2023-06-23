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
  const [dataSede, setDataSede] = useState<DataItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [checkboxData, setCheckboxData] = useState<DataItem[]>([]);
  const [selectedValues, setSelectedValues] = useState([]);

  const journySedeGetData = async (record) => {
    console.log("record: ", record);

    await apiGetThunksAsyncSedeJornada(record.PK_TSEDE)
      .then((response) => {
        if (response) {
          console.log(response.data, "respuesta");
          const preData = response.data;
          setDataSede(preData);
          setSelectedValues(
            preData
              .filter((item) => item.BOOLEAN_FIELD)
              .map((item) => item.PK_TJORNADA)
          );
        }
      })

      .catch((error) => {
        console.log("catch response: ", error);
      });
  };

// const changeData = (selectedValues) =>{
//  const preData = [...dataSede]
//  const resultado = preData.filter((objeto) =>{
//   if(selectedValues.includes(objeto.PK_TJORNADA)){
//     const newObeject = {...objeto}
//     newObeject.BOOLEAN_FIELD = true
//     return  newObeject
//   }else{
//     const newObeject = {...objeto}
//     newObeject.BOOLEAN_FIELD = false
//     return  newObeject
//   }
//  })
// console.log(resultado)

// }


  const handleCheckboxChange = (index) => {
    console.log(index, "index");

    setSelectedValues(index);
  };

  const handleSendData = (selectedValues): void => {
    const preData = [...dataSede]
   
 const resultado = preData.map((objeto) =>{
  if(selectedValues.includes(objeto.PK_TJORNADA)){

    const newObeject = {...objeto}
    newObeject.BOOLEAN_FIELD = true
    console.log(newObeject)
    
    return  newObeject
  }else{
    const newObeject = {...objeto}
    newObeject.BOOLEAN_FIELD = false
    console.log(newObeject)
    
    return  newObeject
  }
 })
 const newArray:any[] = []
for(let i = 0; i < dataSede.length; i++){
  const objetoA = dataSede[i]
  const objetoB = resultado[i]
  if(objetoA.BOOLEAN_FIELD !== objetoB.BOOLEAN_FIELD){
     newArray.push(objetoB)
  }
    
  }
  console.log(newArray, " resultado")
  }

  return {
    dataSede,
    journySedeGetData,

    handleSendData,
    setDataSede,
    selectAll,
    setSelectAll,
    // selectedItems,
    // setSelectedItems,
    selectedRowKeys,
    checkboxData,
    setCheckboxData,
    selectedValues,
    setSelectedValues,
    handleCheckboxChange,
  };
};
