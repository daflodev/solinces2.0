import { useState } from "react";
import { apiPostThunksAsyncSedeJornada } from "../../../../utils/services/api/thunks";


export const useJournySede  = () =>{
    const [isSecondaryTableOpen, setIsSecondaryTableOpen] = useState(false);


    const [dataSede, setDataSede] = useState([])


const handleOpenSecondaryTable = async (record) => {
    setIsSecondaryTableOpen(true);


    await apiPostThunksAsyncSedeJornada(record.PK_TSEDE)
      .then((response) => {
        if (response) {
          console.log(response.data, "respuesta");
          setDataSede(response.data)
        }
      })
      .catch((error) => {
        console.log("catch response: ", error);
      });

  };
  const handleCloseSecondaryTable = () => {
    setIsSecondaryTableOpen(false);

  };
console.log(dataSede)

  return {
    dataSede,
    isSecondaryTableOpen,
    handleOpenSecondaryTable,
    handleCloseSecondaryTable,
  }
}






