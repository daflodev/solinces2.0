import { useEffect, useMemo, useState } from "react";

import "../../../../utils/assets/styles/testing.css";
import { message } from "antd";
import {
  apiGetThunksAsync,
  apiGetThunksMenuItemsOptionsAsync,
  apiPostThunksAsync,
  // @ts-ignore
  apiPostThunksAsyncSedeJornada,
} from "../../../../utils/services/api/thunks";
import { useParams, useNavigate } from "react-router-dom";
import { getUserToken } from "../../../../utils/utils";
import { sessionInformationStore } from "../../../../store/userInformationStore";
import { shallow } from "zustand/shallow";
import { QueryBuilders } from "../../../../utils/orm/queryBuilders";

export const UseSettigns = () => {
  const params: any = useParams<{ type: any }>();

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  // Estado para el cambio de idioma
  //const [language, setLanguage] = useState(null);

  // TODO: Maneja la data que se renderizara en la lista
  const [settingOptions, setSettingOptions] = useState(null);
  // TODO:  Estado que manjea la lista renderizada
  const [selectedItem, setSelectedItem] = useState({
    key: null,
    nombre: null,
    key_table: null,
  });
  // Estado que maneja la visibilidad delformulario de agregar
  const [visibleForm, setVisibleForm] = useState(false);

  const [dataTable, setDataTable] = useState<any>();

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

  

  const [visibleMessage, setVisibleMessage] = useState(<></>);

  const tokenInformation = localStorage.getItem("user_token_information");
  const parserTokenInformation: any | null = tokenInformation
    ? JSON.parse(tokenInformation)
    : null;

  const clearAlertMessage = () => {
    const time = setTimeout(() => {
      setVisibleMessage(<></>);
    }, 5000);
    return () => {
      clearTimeout(time);
    };
  };

  //funcion que ejecuta el mensaje
  const renderMessage = () => {
    return visibleMessage;
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
  const ProcessingColumnsInformation = (
    columnsInformation: any,
    setFunction: any
  ) => {
    const columnsKeys = columnsInformation.map((item: any) => item.column_name);

    const filteredKeys = columnsKeys.filter(
      (key: any) =>
        key !== "AUTHOR_RC" && key !== "CLIENTS_RC" && !key.startsWith("PK_")
    );

    let newInputFilter = {};

    filteredKeys.map((key: any) => {
      newInputFilter = {
        ...newInputFilter,
        [key]: "",
      };
    });

    setFunction(newInputFilter);
  };

  //data table for items listnameTable

  const select_type = (params: any) => {
    const type: any = {
      establecimiento: {
        table: [
          "PK_TESTABLECIMIENTO",
          "CODIGO",
          "NOMBRE",
          "NIT",
          "FK_TMUNICIPIO",
          "FK_TLISTA_VALOR_ZONA",
          "FK_TPROPIEDAD_JURIDICA",
          "FK_TLV_CALENDARIO",
          "FK_TLV_ESTADO_ESTABLECIMIENTO",
        ],
      },
      defauld: {
        table: "",
      },
    };

    const user = getUserToken();
    let validate: any = type["defauld"];
    if (user.rol[0] == "SUPER_ADMINISTRADOR") {
      validate = type[params] ?? type["defauld"];
    }
    // validate = params == 'establecimiento' ? type[params] : type['defauld'];
    return validate;
  };

  const filtrarJsonArray = (jsonArray: any[], columnas: any): any[] => {
    if (columnas !== "") {
      return jsonArray.filter((objeto) => {
        return columnas.some((columna: any) => objeto.column_name === columna);
      });
    } else {
      return jsonArray;
    }
  };
  // @ts-ignore
  const { currentRol, currentInstitution, currentCampus } =
    sessionInformationStore(
      (state) => ({
        currentRol: state.currentRol,
        currentInstitution: state.currentInstitution,
        currentCampus: state.currentCampus,
      }),
      shallow
    );

  const apiGet = async (nameTable: any, setDataTable: any) => {
    const tableDateBase = select_type(nameTable);

    if (currentRol == "RECTOR" && nameTable == "sede") {
      // // select con where
      const query = new QueryBuilders(nameTable);
      const results = await query
        .select("*")
        .where('"FK_TESTABLECIMIENTO"', '=', currentInstitution?.value)
        .schema(parserTokenInformation?.dataSchema[0])
        .get()


      console.log(results);
      const dataSede = {
        base: tableDateBase.table,
        schema: parserTokenInformation?.dataSchema[0],
        where: { "sede.FK_TESTABLECIMIENTO": currentInstitution?.value },
      };
      const getdata = changeKey(dataSede, "base", nameTable);

      const getDataTable = await apiGetThunksAsync(getdata).then(
        (response: any) => {
          const { getdata, columnsInformation } = response;
          console.log(response)

          const filterColumnsInformation: any = filtrarJsonArray(
            columnsInformation,
            tableDateBase.table
          );
          // console.log(resultado, 'nuevo json');

          // #######################
          // const filtroColumnYes = columnsInformation.filter((item) => item.is_nullable == 'YES')
          // const filtroColumnNO = columnsInformation.filter((item) => item.is_nullable == 'NO')
          // console.log(filtroColumnYes, 'nueva columna YES')
          // console.log(filtroColumnNO, 'nueva columna NO')
          // #######################
          ProcessingColumnsInformation(
            filterColumnsInformation,
            setInputFilter
          );
          setItemsColumnsInformation(filterColumnsInformation);

          const res = getdata;
          return res;
        }
      );

      setDataTable(getDataTable);
    } else {
      const prevData = {
        base: tableDateBase.table,
        schema: parserTokenInformation?.dataSchema[0],
      };
      const getdata = changeKey(prevData, "base", nameTable);

      const getDataTable = await apiGetThunksAsync(getdata).then(
        (response: any) => {
          const { getdata, columnsInformation } = response;

          const filterColumnsInformation: any = filtrarJsonArray(
            columnsInformation,
            tableDateBase.table
          );
          // console.log(resultado, 'nuevo json');

          // #######################
          // const filtroColumnYes = columnsInformation.filter((item) => item.is_nullable == 'YES')
          // const filtroColumnNO = columnsInformation.filter((item) => item.is_nullable == 'NO')
          // console.log(filtroColumnYes, 'nueva columna YES')
          // console.log(filtroColumnNO, 'nueva columna NO')
          // #######################
          ProcessingColumnsInformation(
            filterColumnsInformation,
            setInputFilter
          );
          setItemsColumnsInformation(filterColumnsInformation);

          const res = getdata;
          return res;
        }
      );

      setDataTable(getDataTable);
    }
  };



  
  const handleSelect = (item: any) => {
    setDataTable(null);
    setSelectedItem(item);
    apiGet(item.key_table, setDataTable);
    handleOcultarForm();

    // cambio de color de item de la lista
    const items = document.querySelectorAll("#mi-lista li");
    // let elementoSeleccionado = null;

    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", function () {
        for (let j = 0; j < items.length; j++) {
          items[j].classList.remove("changes-color");
        }
        items[i].classList.add("changes-color");
      });
    }
  };

  const dynamicFilterConditions = (item: any, filterObject: any) => {
    let providerResult = true;

    const filterObjetKeys = Object.keys(filterObject);

    filterObjetKeys.map((filterItemName) => {
      const columDataTypeInformation: any = itemsColumnsInformation.filter(
        (columnItem: any) => columnItem?.column_name == filterItemName
      );

      if (providerResult) {
        if (
          columDataTypeInformation[0].is_nullable == "NO" ||
          item?.[filterItemName] !== null
        ) {
          providerResult = item?.[filterItemName]
            ?.toString()
            .toLowerCase()
            .includes(filterObject?.[filterItemName]?.toString().toLowerCase());
        }

        if (
          columDataTypeInformation[0].is_nullable == "YES" &&
          item?.[filterItemName] == null
        ) {
          const replaceNullValue = "";

          providerResult = replaceNullValue.includes(
            filterObject?.[filterItemName]?.toString().toLowerCase()
          );
        }
      }
    });

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
    values: any,
    setDataTable: any,
    selectedItem: any
  ) => {
    const sendData = {
      data: values,
    };

    const getdata = changeKey(
      sendData,
      "data",
      `insert_${selectedItem?.key_table}`
    );
    getdata["schema"] = parserTokenInformation?.dataSchema[0];

    await apiPostThunksAsync(getdata)
      .then((response) => {
        if (response.success == "OK") {
          setProcessMessage({
            message: "Se agrego correctamente",
            style: "render-message-insert",
          });
        }

        if (response.status == 400) {
          const messageResponse = response?.data?.message;

          if (messageResponse.includes("already exists")) {
            setProcessMessage({
              message:
                "El valor que trata de ingresar ya se encuentra registrado.",
              style: "render-message-delete",
            });
          } else {
            setProcessMessage({
              message: "Ocurrio un error inesperado, intentelo mas tarde.",
              style: "render-message-delete",
            });
          }
        }
      })
      .catch((error) => {
        console.log("catch response: ", error);
      })
      .finally(() => {
        apiGet(selectedItem?.key_table, setDataTable);
      });
  };
  const getNameTableResponseError = (MessageErrorString) => {
    const firstCut = MessageErrorString.split('"');

    const secondCut = firstCut[1].split('" ');

    const answer = secondCut[0];

    return answer;
  };

  //funcion para eliminar datos de la tabla y envio de mensjae de exitoso
  const handleDelete = async (key: React.Key) => {
    const filteredData = data.filter((item) => item?.key == key);

    const whereUpdate = {
      //@ts-ignore
      where: filteredData[0][`PK_T${selectedItem.key_table.toUpperCase()}`],
    };

    const newWhere = changeKey(
      whereUpdate,
      "where",
      //@ts-ignore
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
    getdata["schema"] = parserTokenInformation?.dataSchema[0];

    await apiPostThunksAsync(getdata)
      .then((response) => {
        if (response.success == "OK") {
          setProcessMessage({
            message: "El registro se elimino correctamente",
            style: "render-message-insert",
          });
          apiGet(selectedItem?.key_table, setDataTable);
        }

        if (response.status == 400) {
          console.log("error response: ", response);

          const responseMessage = response?.data?.message;

          if (responseMessage?.includes("is still referenced from table")) {
            setProcessMessage({
              message:
                "No se puede eliminar: El campo aun se encuentra referenciado en al tabla " +
                `${getNameTableResponseError(responseMessage)}.`,
              style: "render-message-delete",
            });
          } else {
            setProcessMessage({
              message: "Ocurrio un error inesperado, intentelo mas tarde.",
              style: "render-message-delete",
            });
          }
        }
      })
      .catch((error) => {
        console.log("catch response: ", error);
      });
  };

  // funcion de selccion de filas por medio de checkbox
  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDeleteGroup = async () => {
    let whereUpdate = {
      where: selectedRowKeys,
    };
    const newWhere = changeKey(
      whereUpdate,
      "where",
      //@ts-ignore
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
    getdata["schema"] = parserTokenInformation?.dataSchema[0];

    await apiPostThunksAsync(getdata)
      .then((response) => {
        if (response.success == "OK") {
          setProcessMessage({
            message: "Los registro se eliminaron correctamente",
            style: "render-message-insert",
          });
          apiGet(selectedItem?.key_table, setDataTable);
        }

        if (response.status == 400) {
          const responseMessage = response?.data?.message;
          if (responseMessage?.includes("is still referenced from table")) {
            setProcessMessage({
              message:
                "No se puede eliminar: El campo aun se encuentra referenciado en al tabla " +
                `${getNameTableResponseError(responseMessage)}.`,
              style: "render-message-delete",
            });
          } else {
            setProcessMessage({
              message: "Ocurrio un error inesperado, intentelo mas tarde.",
              style: "render-message-delete",
            });
          }
        }
      })
      .catch((error) => {
        console.log("catch response: ", error);
      });
  };

  //data table for items list FK
  const apiGetFK = async (nameTable: any) => {
    const prevData = {
      base: "",
      schema: parserTokenInformation?.dataSchema[0],
    };

    const getdata = changeKey(prevData, "base", nameTable);

    const getDataTable = await apiGetThunksAsync(getdata).then((response) => {
      //@ts-ignore
      const { getdata } = response;

      const res = getdata;
      return res;
    });
    return getDataTable;
  };

  const categoryApiGetFKTLVManager = (currentTable, fkNameTable) => {
    if (fkNameTable == "estado" && currentTable == "periodo_evaluacion") {
      const category = "ESTADOPERIODOEVALUACION";

      return `'${category}'`;
    } else if (fkNameTable == "estado" && currentTable == "periodo_academico") {
      const category = "ESTADOPERIODO";

      return `'${category}'`;
    } else {
      const formatedName = fkNameTable.toUpperCase();

      return `'${formatedName}'`;
    }
  };

  //data table for items list FK_TLV
  const apiGetFKTLV = async (nameTable: any) => {
    const prevData = {
      base: "",
      schema: parserTokenInformation?.dataSchema[0],
      where: {
        "lista_valor.CATEGORIA": categoryApiGetFKTLVManager(
          selectedItem?.key_table,
          nameTable
        ),
      },
    };
    const getdata = changeKey(prevData, "base", "lista_valor");

    const getDataTable = await apiGetThunksAsync(getdata).then((response) => {
      //@ts-ignore
      const { getdata } = response;

      const res = getdata;
      return res;
    });
    return getDataTable;
  };

  const apiGetFKTFunsionario = async (nameTable: any) => {
    const formatedName = nameTable.toUpperCase();

    const tokenInformation = localStorage.getItem("user_token_information");
    const parserTokenInformation: any | null = tokenInformation
      ? JSON.parse(tokenInformation)
      : null;

    const prevData = {
      funcionario: "",
      schema: parserTokenInformation?.dataSchema[0],
      where: { "lista_valor.VALOR": `'${formatedName}'` },
      concat: [
        [
          "usuario.'PRIMER_NOMBRE'",
          "usuario.'SEGUNDO_NOMBRE'",
          "usuario.'PRIMER_APELLIDO'",
          "usuario.'SEGUNDO_APELLIDO'",
        ],
        ["AS 'NOMBRE'"],
      ],
      join: [
        {
          table: "lista_valor",
          columns: "",
          on: ["PK_TLISTA_VALOR", "funcionario.FK_TLV_CLASE_FUNCIONARIO"],
        },
        {
          table: "usuario",
          columns: ["PK_TUSUARIO"],
          on: ["PK_TUSUARIO", "funcionario.FK_TUSUARIO"],
        },
      ],
    };

    const getdata = changeKey(prevData, "base", "lista_valor");

    const getDataTable = await apiGetThunksAsync(getdata).then((response) => {
      //@ts-ignore
      const { getdata } = response;

      const res = getdata;
      return res;
    });
    return getDataTable;
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
  const handleSave = (row: any) => {
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

  // envio de datos de la edicion
  const save = async (
    form: any,
    record: any,
    toggleEdit: any,
    oldValue: any
  ) => {
    try {
      //@ts-ignore
      const primaryKey = `PK_T${selectedItem.key_table.toUpperCase()}`;

      let whereUpdate = {
        where: record[primaryKey],
      };
      const newWhere = changeKey(
        whereUpdate,
        "where",
        //@ts-ignore
        `PK_T${selectedItem.key_table.toUpperCase()}`
      );

      let values = {};

      let newValue = oldValue[1];

      if (form?.editingDate) {
        values = form.value;
        newValue = Object.values(values);
      } else {
        values = await form?.validateFields();
        newValue = Object.values(values);
      }

      if (newValue[0] != oldValue[1]) {
        const sendData = {
          data: values,
        };
        const getdata = changeKey(
          sendData,
          "data",
          `update_${selectedItem?.key_table}`
        );
        (getdata["where"] = newWhere),
          (getdata["schema"] = parserTokenInformation?.dataSchema[0]);

        await apiPostThunksAsync(getdata)
          .then((response) => {
            if (response.success == "OK") {
              handleSave({ ...record, ...values });
            }

            if (response.status == 400) {
              setProcessMessage({
                message: "Ocurrio un error inesperado, intentelo mas tarde.",
                style: "render-message-delete",
              });
            }
          })
          .catch((error) => {
            console.log("catch response: ", error);
          });
      }

      toggleEdit();
    } catch (errInfo) {
      console.log("save error: ", errInfo);
      messageApi.info("Save failed");
    }
  };

  const FKConsultManager = (FKNameList: any) => {
    let answer = {};

    FKNameList.map((name) => {
      let tableName = name.replace("FK_T", "");

      if (tableName.startsWith("LV_") || tableName.startsWith("LISTA_VALOR_")) {
        const parserTablename = tableName.startsWith("LV_")
          ? tableName.replace("LV_", "")
          : tableName.replace("LISTA_VALOR_", "");

        apiGetFKTLV(parserTablename.toLowerCase())
          .then((response) => {
            const res = response;

            answer = {
              ...answer,
              [name]: res,
            };
          })
          .then(() => {
            setFkGroup({
              ...fkGroup,
              ...answer,
            });
          })
          .catch((e) => {
            // const pre = {
            //   [name]: []
            // }

            // setFkGroup({
            //   ... fkGroup,
            //   ...pre
            // })

            console.log(` error en ${name}: `, e);
          });
      } else if (tableName.startsWith("FUNCIONARIO_")) {
        const parserTablename = tableName.replace("FUNCIONARIO_", "");

        apiGetFKTFunsionario(parserTablename.toLowerCase())
          .then((response) => {
            const res = response;

            answer = {
              ...answer,
              [name]: res,
            };
          })
          .then(() => {
            setFkGroup({
              ...fkGroup,
              ...answer,
            });
          })
          .catch((e) => {
            // const pre = {
            //   [name]: []
            // }

            // setFkGroup({
            //   ... fkGroup,
            //   ...pre
            // })

            console.log(` error en ${name}: `, e);
          });
      } else {
        if (tableName.includes("_PADRE")) {
          tableName = tableName.replace("_PADRE", "");
        }

        apiGetFK(tableName.toLowerCase())
          .then((response) => {
            const res = response;

            answer = {
              ...answer,
              [name]: res,
            };
          })
          .then(() => {
            setFkGroup({
              ...fkGroup,
              ...answer,
            });
          })
          .catch((e) => {
            // const pre = {
            //   [name]: []
            // }

            // setFkGroup({
            //   ... fkGroup,
            //   ...pre
            // })

            console.log(` error en ${name}: `, e);
          });
      }
    });
  };

  const formatingAvalibleOptions = (options: any) => {
    let i = 0;

    const result = options.map((option: any) => {
      if (option?.VISIBLE === "S" && option?.ESTADO === "A") {
        const name = (option?.NOMBRE).toUpperCase();

        const formatedName = option?.NOMBRE.substring(1);

        i = i + 1;

        const processesOption = {
          key: i,
          nombre: name,
          key_table: formatedName,
        };

        return processesOption;
      }
    });

    return result;
  };

  const consultAvalibeOptions = async (fatherOption: any) => {
    const testOptionSelected = {
      url: fatherOption,
    };

    await apiGetThunksMenuItemsOptionsAsync(testOptionSelected)
      .then((response: any) => {
        const theResponseOptions = response?.getdata;

        if (theResponseOptions && theResponseOptions.length > 0) {
          const formatedOptions = formatingAvalibleOptions(theResponseOptions);

          if (formatedOptions && formatedOptions.length > 0) {
            ListNameTables(formatedOptions);

            handleSelect(formatedOptions[0]);
          } else {
            console.log("por algun motivo ninguna opcion es visible");
            navigate("/no_permission");
          }
        } else {
          console.log("las opciones estan vacias");
          navigate("/no_permission");
        }
      })
      .catch((error) => {
        //TODO: redireccionar en caso de error

        console.log("catch response: ", error);
        navigate("/no_permission");
      });
  };

  useEffect(() => {
    setSettingOptions(null);

    setSelectedItem({
      key: null,
      nombre: null,
      key_table: null,
    });

    consultAvalibeOptions(params?.option);

    // initLanguage();
  }, [params]);

  useEffect(() => {
    if (processMessage) {
      setVisibleMessage(
        <div className={processMessage.style}>{processMessage.message}</div>
      );
      clearAlertMessage();
    }
  }, [processMessage]);

  useEffect(() => {
    if (Object.entries(inputFilter).length !== 0) {
      const FKNames = Object.keys(inputFilter).filter((key) =>
        key.startsWith("FK_")
      );

      FKConsultManager(FKNames);
    }
  }, [inputFilter]);

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return {
    hovered,
    handleMouseEnter,
    handleMouseLeave,
    contextHolder,
    messageApi,
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
    params,
    parserTokenInformation,
   
  };
};
