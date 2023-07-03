import { useState } from "react";
import {
  apiGetThunksAsyncSedeJornada,
  apiPostThunksAsyncSedeJornada,
} from "../../../../utils/services/api/thunks";
import message from "antd/es/message";
interface DataItem {
  PK_TJORNADA: any;
  NOMBRE: any;
  CODIGO: any;
  BOOLEAN_FIELD: any;
}

interface Getpk {
  PK_TSEDE: any;
}

export const useJournySede = () => {
  const [dataSede, setDataSede] = useState<DataItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
 

  const [checkboxData, setCheckboxData] = useState<DataItem[]>([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [pkSede, setPksede] = useState<Getpk[]>([]);
  //manejos de estado del mensaje al editar, enviar o eliminar un dato
  

  const [messageApi, contextHolder] = message.useMessage();

  const journySedeGetData = async (record) => {
    console.log("record: ", record);
    // const getPK = record["PK_TSEDE"]

    setPksede(record);

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

  const reemplazarNombresCampos = (
    arrayObjetos,
    nombreCampo,
    nuevoNombreCampo
  ) => {
    return arrayObjetos.map((objeto) => {
      const nuevoObjeto = {};
      for (const campo in objeto) {
        const nuevoCampo = campo === nombreCampo ? nuevoNombreCampo : campo;
        nuevoObjeto[nuevoCampo] = objeto[campo];
      }
      return nuevoObjeto;
    });
  };

  const handleSendData = async (selectedValues, cerrarTable) => {
    const preData = dataSede ? [...dataSede]: []

    const resultado = preData.map((objeto) => {
      if (selectedValues.includes(objeto.PK_TJORNADA)) {
        const newObeject = { ...objeto };
        newObeject.BOOLEAN_FIELD = true;
        console.log(newObeject);

        return newObeject;
      } else {
        const newObeject = { ...objeto };
        newObeject.BOOLEAN_FIELD = false;
        console.log(newObeject);

        return newObeject;
      }
    });
    const newArray: any[] = [];
    for (let i = 0; i < dataSede.length; i++) {
      const objetoA = dataSede[i];
      const objetoB = resultado[i];
      if (objetoA.BOOLEAN_FIELD !== objetoB.BOOLEAN_FIELD) {
        newArray.push(objetoB);
      }
    }

    const deleteField = ["NOMBRE", "CODIGO"];

    const newObject = newArray.map((obeject) => {
      const duplicateObject = { ...obeject };
      deleteField.forEach((campo) => delete duplicateObject[campo]);
      return duplicateObject;
    });

    const changeName = reemplazarNombresCampos(
      newObject,
      "PK_TJORNADA",
      "FK_TJORNADA"
    );

    const nameField = "PK_TSEDE";
    const modifiedArray = changeName.map((item) => {
      const dataField = pkSede[nameField];
      const newObj = {
        ...item,
        FK_TSEDE: dataField,
      };
      return newObj;
    });

    console.log(modifiedArray);
    await apiPostThunksAsyncSedeJornada(modifiedArray).then((response) => {
      if (response.status == "success") {
        messageApi.open({
          type: "success",
          content: "se ha modificado las jornada a la sede",
        });

        setTimeout(() => {
          cerrarTable();
        }, 2000);
        
    
      } else {
        messageApi.open({
          type: "error",
          content: "no se pudo hacer el cambio a las jornadas",
        });
      }
    });
  };

  return {
    dataSede,
    journySedeGetData,

    handleSendData,
    contextHolder,
    setDataSede,
    selectAll,
    setSelectAll,
    // selectedItems,
    // setSelectedItems,
  
    checkboxData,
    setCheckboxData,
    selectedValues,
    setSelectedValues,
    // handleCheckboxChange,
  };
};
