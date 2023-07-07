import { useState } from "react";
import { apiPostThunksAsyncSedeJornada } from "@/utils/services/api/thunks";


export const useJournySede  = () =>{

    const [dataSede, setDataSede] = useState<[] | null>(null)

const journySedeGetData = async (record) => {

    console.log('record: ', record)

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

  return {
    dataSede,
    journySedeGetData,
    setDataSede
  }
}






