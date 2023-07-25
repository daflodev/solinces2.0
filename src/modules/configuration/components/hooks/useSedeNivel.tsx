import { useState } from "react";
import {
  apiGetThunksAsyncSedeNivel,
  apiPostThunksAsyncSedeNivel,
} from "../../../../utils/services/api/thunks";
import message from "antd/es/message";
interface DataItem {
  PK_TNIVEL_ENSENANZA: any;
  NOMBRE: any;
  CODIGO: any;
  BOOLEAN_FIELD: any;
}

interface Getpk {
  PK_TSEDE: any;
}

export const useNivelSede = () => {
  const [dataSedeNivel, setDataSedeNivel] = useState<DataItem[] >([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const [checkboxData, setCheckboxData] = useState<DataItem[]>([]);
  const [selectedValuesNivel, setSelectedValuesNivel] = useState([]);
  const [pkSede, setPksede] = useState<Getpk[]>([]);

  

  const [messageApi, contextHolder] = message.useMessage();

  const nivelSedeGetData = async (record) => {
    // console.log("record: ", record);
    // const getPK = record["PK_TSEDE"]

    setPksede(record);

    await apiGetThunksAsyncSedeNivel(record.PK_TSEDE)
      .then((response) => {
        if (response) {
          // console.log(response.data, "respuesta");
          const preData = response.data;
          setDataSedeNivel(preData);
          setSelectedValuesNivel(
            preData
              .filter((item) => item.BOOLEAN_FIELD)
              .map((item) => item.PK_TNIVEL_ENSENANZA)
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

  const handleSendDataNivel = async (selectedValues, cerrarTable) => {
    const preData =dataSedeNivel?  [...dataSedeNivel]: [];

    const resultado = preData.map((objeto) => {
      if (selectedValues.includes(objeto.PK_TNIVEL_ENSENANZA)) {
        const newObeject = { ...objeto };
        newObeject.BOOLEAN_FIELD = true;
        // console.log(newObeject);

        return newObeject;
      } else {
        const newObeject = { ...objeto };
        newObeject.BOOLEAN_FIELD = false;
        // console.log(newObeject);

        return newObeject;
      }
    });
    const newArray: any[] = [];
    for (let i = 0; i < dataSedeNivel.length; i++) {
      const objetoA = dataSedeNivel[i];
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
      "PK_TNIVEL_ENSENANZA",
      "FK_TNIVEL_ENSENANZA"
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

    // console.log(modifiedArray);
    await apiPostThunksAsyncSedeNivel(modifiedArray).then((response) => {
      if (response.status == "success") {
        messageApi.open({
          type: "success",
          content: "se ha modificado los niveles a la sede",
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
    dataSedeNivel,
    nivelSedeGetData,
    handleSendDataNivel,
    contextHolder,
    setDataSedeNivel,
    selectAll,
    setSelectAll,
    checkboxData,
    setCheckboxData,
    selectedValuesNivel,
    setSelectedValuesNivel,
  };
};
