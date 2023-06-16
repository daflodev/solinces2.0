import { useEffect, useState } from "react";
import { apiGetThunksAsyncSedeJornada, apiPostThunksAsyncSedeJornada } from "../../../../utils/services/api/thunks";
interface DataItem {
    PK_TJORNADA: any;
    NOMBRE: any;
    CODIGO: any;
    BOOLEAN_FIELD: any;
}
export const useJournySede = () => {
    const [isSecondaryTableOpen, setIsSecondaryTableOpen] = useState(false);

    const [dataSede, setDataSede] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);




    const handleOpenSecondaryTable = async (record) => {
        setIsSecondaryTableOpen(true);

        await apiGetThunksAsyncSedeJornada(record.PK_TSEDE)
            .then((response) => {
                if (response) {
                    console.log(response.data, "respuesta");
                    setDataSede(response.data);
                   
                }
            })

            .catch((error) => {
                console.log("catch response: ", error);
            });
    };



    const handleCloseSecondaryTable = () => {
        setIsSecondaryTableOpen(false);
    };

    console.log(selectedRowKeys);
    
      const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys: string[] | number[]) => {
          setSelectedRowKeys(selectedRowKeys as string[]);
        },
        getCheckboxProps: (record: DataItem) => ({
          selectedrowkeys: record.BOOLEAN_FIELD,
        }),
      };

    const generateRowKey = (record: DataItem) => {
      // Generar una clave única basada en el índice y el ID de la API
      return `${record.PK_TJORNADA}`;
    };

    const handleSendData = () => {
      console.log("Datos a enviar:", selectedRowKeys);
    };


  const handleSubmitJornada = async ()=>{
      await apiPostThunksAsyncSedeJornada(selectedRowKeys)
      
  }
  

    useEffect(()=>{
        const defaultSelectedKeys = dataSede
        .filter((item: DataItem) => item.BOOLEAN_FIELD)
        .map((item :DataItem)=> item.PK_TJORNADA)
        
        
        setSelectedRowKeys(defaultSelectedKeys);
    }, [dataSede])

    return {
        dataSede,
        isSecondaryTableOpen,
        handleOpenSecondaryTable,
        handleCloseSecondaryTable,
        setIsSecondaryTableOpen,
        selectedRowKeys,
        rowSelection,
        generateRowKey,
        handleSendData,
    };
};
