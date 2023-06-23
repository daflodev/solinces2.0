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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);


  const [checkboxData, setCheckboxData] = useState<DataItem[] >([]);
  const [selectedValues, setSelectedValues] = useState([]);

  const journySedeGetData = async (record) => {
    console.log("record: ", record);

    await apiGetThunksAsyncSedeJornada(record.PK_TSEDE)
      .then((response) => {
        if (response) {
          console.log(response.data, "respuesta");
          const preData = response.data
          setDataSede(preData);
        setCheckboxData(preData);
        setSelectedValues(preData.filter(item => item.BOOLEAN_FIELD).map(item => item.PK_TJORNADA));
        }
        
      })

      .catch((error) => {
        console.log("catch response: ", error);
      });
  };
  const handleCheckboxChange = (index) => {
    const updatedData = checkboxData.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          BOOLEAN_FIELD: !item.BOOLEAN_FIELD,
        };
      }
      return item;
    });
    setCheckboxData(updatedData);
  };
  
  const  handleSendData = () => {
    const selectedValues = checkboxData.filter(item => item.BOOLEAN_FIELD ).map(item => item.PK_TJORNADA);
    console.log('Valores seleccionados:', selectedValues);
  };
  

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
    checkboxData, setCheckboxData,
  selectedValues, setSelectedValues,
  handleCheckboxChange,
  };
};
