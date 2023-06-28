import { useState } from "react";
// import { apiPostThunksAsyncSedeJornada } from "../../../../utils/services/api/thunks";


export const useSedeInfra  = () =>{
    const [isSedeInfraSecondaryTableOpen, setIsSedeInfraSecondaryTableOpen] = useState(false);


    const [dataSedeInfra, setDataSedeInfra] = useState([])


const handleOpenSedeInfraSecondaryTable = async (record) => {
    setIsSedeInfraSecondaryTableOpen(true);
  };
  const handleCloseSedeInfraSecondaryTable = () => {
    setIsSedeInfraSecondaryTableOpen(false);

  };

  return {
    handleOpenSedeInfraSecondaryTable,
    handleCloseSedeInfraSecondaryTable,
    isSedeInfraSecondaryTableOpen,
  }
}

