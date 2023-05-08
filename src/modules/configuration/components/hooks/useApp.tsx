import { useEffect, useMemo, useState } from "react";

import "../../testing.css";
import { message } from "antd";
import { apiGetThunksAsync, apiGetThunksMenuItemsOptionsAsync, apiPostThunksAsync } from "../../../../services/api/thunks";
import { useParams } from "react-router-dom";

export const UseSettigns = () => {

  const params: any = useParams<{ type: any }>();

  console.log('param', params)
  const [messageApi, contextHolder] = message.useMessage();

  // Estado para el cambio de idioma
  const [language, setLanguage] = useState(null);

  // TODO: Maneja la data que se renderizara en la lista
  const [settingOptions, setSettingOptions] = useState(null);
  // TODO:  Estado que manjea la lista renderizada
  const [selectedItem, setSelectedItem] = useState({
    key: null,
    nombre: null,
    key_table: null
  });
  // Estado que maneja la visibilidad delformulario de agregar
  const [visibleForm, setVisibleForm] = useState(false);
  // Provee el texto controlado por el ghestor de idiomas

  const [dataTable, setDataTable] = useState<any[]>();

  const [itemsColumnsInformation, setItemsColumnsInformation] = useState([]);

  //Grupo de informacion par ala FK
  const [fkGroup, setFkGroup] = useState({});

  //manejo de estado de la selecion por fila por medio de los checkbox
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  //manejo de estado los input filter por columna
  const [inputFilter, setInputFilter] = useState({});

  //manejos de estado del mensaje al editar, enviar o eliminar un dato
  const [processMessage, setProcessMessage] = useState({
    message: "",
    style: "",
  });

  const [visibleMessage, setVisibleMessage] = useState(<></>)

  const clearAlertMessage = () =>{
    const time = setTimeout(() => {
      setVisibleMessage(<></>)
    }, 5000); 
    return () => {
    clearTimeout(time);
  };
  }

  //funcion que ejecuta el mensaje
  const renderMessage = () => {

    return visibleMessage
  };

  // const initLanguage = async () => {
  //   const getDataSource = await apiGetLanguageManagerAsync("es");
  //   console.log(getDataSource.message);
  //   setLanguage(getDataSource);
  // };

  const ListNameTables = (options: any) => {
    setSettingOptions(options);
  };


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

  // Procesa la informacion de las columnas para crear la base inputFilter
  const ProcessingColumnsInformation = (columnsInformation: any, setFunction: any) => {

    const columnsKeys = columnsInformation.map((item: any)=> item.column_name);

    const filteredKeys = columnsKeys.filter((key: any) => (
      key !== 'AUTHOR_RC' &&
      key !== 'CLIENTS_RC' &&
      !key.startsWith("PK_")))

    let newInputFilter = {}

    filteredKeys.map((key: any) =>{
      newInputFilter = {
        ... newInputFilter,
        [key]: ''
      }
    })

    setFunction(newInputFilter)
  }

  //data table for items listnameTable
  
  const select_type = (params: any) => {
    const type: any = {
        'establecimiento': {
           table:["CODIGO", "NOMBRE", "NIT", "FK_TMUNICIPIO", "FK_TLISTA_VALOR_ZONA", "FK_TPROPIEDAD_JURIDICA", "FK_TLV_CALENDARIO", "FK_TLV_ESTADO_ESTABLECIMIENTO"],
          //  table:["NOMBRE","CODIGO"],
        },
        'defauld': {
            table:"",
        }
    };

    const validate = params == 'establecimiento' ? type[params] : type['defauld'];
    return validate
  };

  const filtrarJsonArray = (jsonArray: any[], columnas: any): any[] => {
    if(columnas !== ""){
      return jsonArray.filter(objeto => {
        return columnas.some((columna: any) => objeto.column_name === columna);
      });
    }else {
      return jsonArray;
    }

  }

  
  const apiGet = async (nameTable: any, setDataTable: any) => {

    const tableDateBase = select_type(nameTable);

    const prevData = {
      base: tableDateBase.table,
      schema: "ACADEMICO_TESTV1",
    };

    
    const getdata = changeKey(prevData, "base", nameTable);
    
    const getDataTable = await apiGetThunksAsync(getdata).then((response: any) => {
      const { getdata, columnsInformation} = response

      const filterColumnsInformation: any = filtrarJsonArray(columnsInformation, tableDateBase.table);
      // console.log(resultado, 'nuevo json');

      // #######################
      // const filtroColumnYes = columnsInformation.filter((item) => item.is_nullable == 'YES')
      // const filtroColumnNO = columnsInformation.filter((item) => item.is_nullable == 'NO')
      // console.log(filtroColumnYes, 'nueva columna YES')
      // console.log(filtroColumnNO, 'nueva columna NO')
      // #######################
      ProcessingColumnsInformation(filterColumnsInformation, setInputFilter)
      setItemsColumnsInformation(filterColumnsInformation)

      const res = getdata
      return res
    });

    setDataTable(getDataTable);
  };

  const handleSelect = (item: any) => {
    setDataTable([])
    setSelectedItem(item);
    apiGet(item.key_table, setDataTable);
    handleOcultarForm();

     // cambio de color de item de la lista
  const items = document.querySelectorAll("#mi-lista li");
  // let elementoSeleccionado = null;

  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
    
      for (let j = 0; j < items.length; j++){
        items[j].classList.remove('changes-color')
      }
      items[i].classList.add('changes-color')
    });
  }
  
  };

  const dynamicFilterConditions = (item:any, filterObject:any) => {
    let providerResult = true;

    const filterObjetKeys = Object.keys(filterObject)

    filterObjetKeys.map((filterItemName)=>{

      const columDataTypeInformation:any = itemsColumnsInformation.filter((columnItem:any) => columnItem?.column_name == filterItemName)

      if(providerResult){
        if(columDataTypeInformation[0].is_nullable == 'NO' || item?.[filterItemName] !== null){
          providerResult = item?.[filterItemName]?.toString().toLowerCase().includes(filterObject?.[filterItemName]?.toString().toLowerCase())
        };

        if(columDataTypeInformation[0].is_nullable == 'YES' && item?.[filterItemName] == null){
          const replaceNullValue = '';

          providerResult = replaceNullValue.includes(filterObject?.[filterItemName]?.toString().toLowerCase())
        };
      };

    })

    return providerResult;
  };

  //funcion que memoriza los datos para hacer el filtro por columnan
  const data = useMemo(() => {
    return dataTable?.filter((item) => {
      try {
        if (selectedItem && item) {
          return dynamicFilterConditions(item, inputFilter);
        }
      } catch (error) {
        return [];
      }
    });
  }, [inputFilter, dataTable]);

  //funcion que limpiar el input filter al volver a su estado original
  const onClear = (name: string) => {
    setInputFilter({
      ...inputFilter,
      [name]: "",
    });
  };

  // Funcion que activa la presentacion del formulario de edicion
  const handleMostrarForm = () => {
    setVisibleForm(!visibleForm);
    //selectedItem.nombre;
  };

  // // Funcion que desactiva la presentacion del formulario de edicion
  const handleOcultarForm = () => {
    setVisibleForm(false);
  };

  // Funcion que se encarga de gestionar el "agregar" del formulario
  const handleSubmit = async (
    values:any,
    setDataTable:any,
    selectedItem:any,
   
  ) => {
    const sendData = {
      data: values,
    };

    const getdata = changeKey(
      sendData,
      "data",
      `insert_${selectedItem?.key_table}`
    );
    getdata["schema"] = "ACADEMICO_TESTV1";

    await apiPostThunksAsync(getdata)
      .then((response) => {
        if (response.success == "OK") {
          
          setProcessMessage({
            message: "Se agrego correctamente",
            style: "render-message-insert",
          });
        }

        if(response.status == 400){

          const messageResponse = response?.data?.message;   

          if(messageResponse.includes("already exists")){
            setProcessMessage({
              message: "El valor que trata de ingresar ya se encuentra registrado.",
              style: "render-message-delete",
            });
          }else{
            setProcessMessage({
              message: "Ocurrio un error inesperado, intentelo mas tarde.",
              style: "render-message-delete",
            });
          }
        }

      })
      .catch((error)=>{
        console.log("catch response: ", error)
      })
      .finally(() => {
        apiGet(selectedItem?.key_table, setDataTable);
      });
  };

  //funcion para eliminar datos de la tabla y envio de mensjae de exitoso
  const handleDelete = async (key: React.Key) => {
    
    const newData = data.filter((item) => item.key !== key);
    let keyPosicion = parseInt(key.toString());

    let whereUpdate = {
      where: data[keyPosicion][`PK_T${selectedItem?.key_table.toUpperCase()}`],
    };
    const newWhere = changeKey(
      whereUpdate,
      "where",
      `PK_T${selectedItem?.key_table.toUpperCase()}`
    );

    const sendData = {
      data: newWhere,
    };
    const getdata = changeKey(
      sendData,
      "data",
      `delete_${selectedItem?.key_table}`
    );
    getdata["schema"] = "ACADEMICO_TESTV1";

    await apiPostThunksAsync(getdata).then((response) => {
      if (response.success == "OK") {
        
        setProcessMessage({
          message: "El registro se elimino correctamente",
          style: "render-message-delete",
        });
      }

      if(response.status == 400){
        setProcessMessage({
          message: "Ocurrio un error inesperado, intentelo mas tarde.",
          style: "render-message-delete",
        });
      }

    })
    .catch((error)=>{
      console.log("catch response: ", error)
    });

    setDataTable(newData);
  };

   // funcion de selccion de filas por medio de checkbox
   const onSelectChange = (newSelectedRowKeys:any) => {
    setSelectedRowKeys(newSelectedRowKeys)
  };

  const handleDeleteGroup = async (key: React.Key) => {
    const newData = data.filter((item:any) => !selectedRowKeys.includes(item.key));
    

    let whereUpdate = {
      where: selectedRowKeys,
    };
    const newWhere = changeKey(
      whereUpdate,
      "where",
      `PK_T${selectedItem.key_table.toUpperCase()}`
    );

    const sendData = {
      data: newWhere,
    };
    const getdata = changeKey(
      sendData,
      "data",
      `delete_${selectedItem?.key_table}`
    );
    getdata["schema"] = "ACADEMICO_TESTV1";

    await apiPostThunksAsync(getdata).then((response) => {
      if (response.success == "OK") {
        setProcessMessage({
          message: "Los registro se eliminaron correctamente",
          style: "render-message-delete",
        });
      }

      if(response.status == 400){
        setProcessMessage({
          message: "Ocurrio un error inesperado, intentelo mas tarde.",
          style: "render-message-delete",
        });
      }

    }).catch((error)=>{
      console.log("catch response: ", error)
    });

    setDataTable(newData);
    await apiGet(selectedItem?.key_table, setDataTable);
  };

    //data table for items list FK
    const apiGetFK = async (nameTable:any) => {
      const prevData = {
        base: "",
        schema: "ACADEMICO_TESTV1",
      };

      const getdata = changeKey(prevData, "base", nameTable);

      const getDataTable = await apiGetThunksAsync(getdata).then((response) => {
        const { getdata } = response

        const res = getdata
        return res
      });
      return getDataTable
      };

  //funcion que va capturando los caracteres uno a uno en el input filter
  const handleFilterChange = ({ target }) => {
    const { name, value } = target;

    setInputFilter({
      ...inputFilter,
      [name]: value,
    });
  };

  //funcion para guardar la data editada
  const handleSave = (row:any) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataTable(newData);
    setProcessMessage({
      message: "El registro se edito correctamente",
      style: "render-message-insert",
    });
  };

    // envio de datos de la edicion (necesita integracion a DB)
    const save = async (form:any, record:any, toggleEdit:any, oldValue:any) => {
      try {
        const primaryKey = `PK_T${selectedItem.key_table.toUpperCase()}`;

        let whereUpdate = {
          where: record[primaryKey],
        };
        const newWhere = changeKey(
          whereUpdate,
          "where",
          `PK_T${selectedItem.key_table.toUpperCase()}`
        );

        let values = {}

        let newValue = oldValue[1];

        if(form?.editingDate){
          values = form.value;
          newValue = Object.values(values);        

        }else{
          values = await form?.validateFields();
          newValue = Object.values(values);
        }

        if(newValue[0] != oldValue[1]){
          const sendData = {
            data: values,
          };
          const getdata = changeKey(
            sendData,
            "data",
            `update_${selectedItem?.key_table}`
          );
          (getdata["where"] = newWhere), (getdata["schema"] = "ACADEMICO_TESTV1");

          console.log("enviando: ", getdata)
    
          await apiPostThunksAsync(getdata).then((response) => {
            if (response.success == "OK") {
              handleSave({ ...record, ...values });
            }
      
            if(response.status == 400){
              setProcessMessage({
                message: "Ocurrio un error inesperado, intentelo mas tarde.",
                style: "render-message-delete",
              });
            }
      
          }).catch((error)=>{
            console.log("catch response: ", error)
          });

        }

        toggleEdit();

      } catch (errInfo) {
        message("Save failed:", errInfo);
      }
    };

    const FKConsultManager = (FKNameList:any) =>{
      let answer = {}

      // console.log("FK guardadas: ", fkGroup)

      FKNameList.map((name:any) => {

        let tableName = name.replace("FK_T", "");

        if(tableName.includes('_PADRE')){
          tableName = tableName.replace('_PADRE', '')
        }

          const prueba = apiGetFK(tableName.toLowerCase()).then((response) => {
            const res = response
  
            answer = {
              ... answer,
              [name]: res
            }
  
            }).then(()=>{
  
              setFkGroup({
                ... fkGroup,
                ...answer
            })
          }).catch((e) => {
            // const pre = {
            //   [name]: []
            // }

            // console.log("el pre: ", pre)

            // setFkGroup({
            //   ... fkGroup,
            //   ...pre
            // })

            console.log(` error en ${name}: `, e)

          })
    })
  }

    const formatingAvalibleOptions = (options:any) => {

      let i = 0;

      const result = options.map((option:any) => {

        if(option?.VISIBLE === "S" && option?.ESTADO === "A"){

          const name = (option?.NOMBRE).toUpperCase()

          const formatedName = option?.NOMBRE.substring(1);

          i = i+1

          const processesOption = {
            key: i,
            nombre: name,
            key_table: formatedName
          }

          return processesOption
        }
      })

      return result

    }

    const consultAvalibeOptions = async (fatherOption:any) => {

      const testOptionSelected = {
        url: fatherOption
      }

      const getDataTable = await apiGetThunksMenuItemsOptionsAsync(testOptionSelected).then((response) => {

        const theResponseOptions = response?.getdata

        if(theResponseOptions && theResponseOptions.length > 0){

          const formatedOptions = formatingAvalibleOptions(theResponseOptions)

          if(formatedOptions && formatedOptions.length > 0){

            ListNameTables(formatedOptions);

            handleSelect(formatedOptions[0]);

          }else {
            //TODO: realizar accion en caso que ninguna opcion sea visible

            console.log("por algun motivo ninguna opcion es visible")
          }

        }else{
          //Todo: redireccionar en caso de no permisos
          console.log("las opciones estan vacias")
        }

      }).catch((error)=>{

        //Todo: redireccionar en caso de error

        console.log("catch response: ", error)
      });

    }

    useEffect(() => {
      // TODO: agregar consulta que trae las opciones y funsion que formatea

      setSettingOptions(null)

      setSelectedItem({
        key: null,
        nombre: null,
        key_table: null
      })

      consultAvalibeOptions(params?.option)

      // initLanguage();
    }, [params]);

    useEffect(() => {
      if (processMessage) {
        setVisibleMessage(<div className={processMessage.style}>{processMessage.message}</div>)
        clearAlertMessage()
      }
    }, [processMessage]);

    useEffect(() => {
      
      if(Object.entries(inputFilter).length !== 0){
        const FKNames = Object.keys(inputFilter).filter((key) => key.startsWith("FK_"))

        FKConsultManager(FKNames)
      }

    }, [inputFilter])

  return {
    contextHolder,

    language,
    visibleForm,
    setVisibleForm,
    handleMostrarForm,
    handleOcultarForm,
    handleSubmit,
    settingOptions,
    handleSelect,
    setSelectedItem,
    selectedItem,
    apiGet,
    processMessage,
    setProcessMessage,
    apiPostThunksAsync,
    changeKey,
    dataTable,
    setDataTable,
    setInputFilter,
    handleDelete,
    handleFilterChange,
    onClear,
    inputFilter,
    data,
    renderMessage,
    selectedRowKeys, 
    onSelectChange, 
    handleDeleteGroup,
    apiGetFK,
    save,
    fkGroup,
    itemsColumnsInformation,
    params
  };
};
