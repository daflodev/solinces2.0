import React, { useRef, useState } from "react";

import "../../utils/assets/styles/testing.css";

import { useEffect } from "react";

import { Card, Col, Popconfirm, Row, Space, Spin, Table, Tooltip } from "antd";
import { SettingOutlined, CloseOutlined } from "@ant-design/icons";

import { UseSettigns } from "./components/hooks/useApp";
import {
  MinusOutlined,
  PlusOutlined,
  deleteIcon,
  downloadIcon,
  sedeJornada,
  funcionarioPermisoIcon
} from "../../utils/assets/icon/iconManager";
import FormAdd from "../../utils/components/formadd";
import SelectableSearch from "../../utils/components/selectablesearch";
import { InputSearch } from "../../utils/components/inputsearch";
import { EditableRow } from "../../utils/components/inputcells";
import { EditableCell } from "../../utils/components/editablecells";
import { withPrincipal } from "../../utils/components/content";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { sessionInformationStore } from "../../store/userInformationStore";
import shallow from "zustand/shallow";

import { renderCloseIcon } from "antd/es/modal/PurePanel";
import FormEstablecimiento from "../../utils/components/formUsuarioEstablecimiento/formEstablecimientoUsario";
import YourTableComponent from "../../utils/components/tableCheckbox/tableChecBox";
import MyForm from "../../utils/components/tableCheckbox/tableChecBox";
import { apiPostThunksAsync, apiPostThunksAsyncSedeJornada } from "../../utils/services/api/thunks";
import { useJournySede } from "./components/hooks/useSedeJornada";

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps[], undefined>;

const Settings: React.FC = () => {
  //funciones y estado del custom hooks personalizado
  const {
    contextHolder,
    settingOptions,
    selectedItem,
    handleMostrarForm,
    handleDelete,
    handleFilterChange,
    inputFilter,
    visibleForm,
    dataTable,
    setDataTable,
    onClear,
    data,
    renderMessage,
    selectedRowKeys,
    onSelectChange,
    handleDeleteGroup,
    handleSelect,
    fkGroup,
    handleSubmit,
    save,
    itemsColumnsInformation,
    params,
  }: any = UseSettigns();



  const {isSecondaryTableOpen, handleOpenSecondaryTable, handleCloseSecondaryTable, dataSede} : any =  useJournySede()

  const { currentRol } = sessionInformationStore(
    (state) => ({
      currentRol: state.currentRol,
    }),
    shallow
  );
  

  //Funcion para generar la data de los filtros select
  const filterSelectOnColumnGenerator = (
    fkName: any,
    fkValues: any,
    data: any
  ) => {
    let reBuildName = fkName?.replace("FK_T", "PK_T");

    if (reBuildName.includes("_PADRE")) {
      reBuildName = reBuildName.replace("_PADRE", "");
    }

    const options: any = [];

    for (let i = 0; i < data?.length; i++) {
      const item = data[i];

      const itsFkValue = fkValues?.filter(
        (fkItem: any) => fkItem[reBuildName] == item[fkName]
      );

      if (itsFkValue?.length > 0) {
        const coincidentalValue = itsFkValue[0];

        const isFkValueAlreadyExist = options.some(
          (option: any) => option.value == coincidentalValue[reBuildName]
        );

        if (!isFkValueAlreadyExist) {
          options.push({
            value: coincidentalValue[reBuildName],
            label: coincidentalValue.NOMBRE,
          });
        }
      }
    }

    return options;
  };

  const renderContentManager = () => {
    if (currentRol == "RECTOR" && selectedItem?.nombre == "TESTABLECIMIENTO") {
      return (
        <FormEstablecimiento
          setTitleState={setDataTable}
          keyValues={inputFilter}
          selectItem={selectedItem}
          FKGroupData={fkGroup}
          itemsInformation={itemsColumnsInformation}
        />
      );
    }
    
    return vanillaTable;
  };

  const [selectedId, setSelectedId] = useState(null);

  

  const iconOptionsManager = (rol, selectedTable, selectedTableInformation, setTableInformationStatus) => {

    let result = (<>
      {" "}
      <Popconfirm
        title="seguro desea eliminar?"
        onConfirm={() => handleDelete(selectedTableInformation.key)}
      >
        <div className="iconDelete">{deleteIcon}</div>
      </Popconfirm>
    </>);

    switch (selectedTable) {
      case 'TSEDE':

        if(rol == "RECTOR"){
          result = (<>
            <div
              onClick={() => handleOpenSecondaryTable(selectedTableInformation)}
              style={{ cursor: "pointer" }}
            >
              {sedeJornada}
            </div>
  
            <Popconfirm
              title="seguro desea eliminar?"
              onConfirm={() => handleDelete(selectedTableInformation.key)}
            >
              <div className="iconDelete">{deleteIcon}</div>
            </Popconfirm>
          </>)
        }
        
        break;

      case 'TCONFIGURACION_REPORTE':

        if(rol == "RECTOR"){
          result = (<>
            <div
              onClick={() => handleOpenSecondaryTable(selectedTableInformation)}
              style={{ cursor: "pointer" }}
            >
              {funcionarioPermisoIcon}
            </div>
  
            <Popconfirm
              title="seguro desea eliminar?"
              onConfirm={() => handleDelete(selectedTableInformation.key)}
            >
              <div className="iconDelete">{deleteIcon}</div>
            </Popconfirm>
          </>)
        }
        
        break;

      default:

        result = (<>
            {" "}
            <Popconfirm
              title="seguro desea eliminar?"
              onConfirm={() => handleDelete(selectedTableInformation.key)}
            >
              <div className="iconDelete">{deleteIcon}</div>
            </Popconfirm>
          </>)
        break;
    }

    return result;
  }

  //funcion de selecion lista para renderizar tabla
  const columnsGenerator = (filterObjet: any) => {
    const keys = Object.keys(filterObjet);

    const result: any[] = keys.map((item) => {
      const ifSelected = item.startsWith("FK_");

      if (ifSelected) {
        const options = filterSelectOnColumnGenerator(
          item,
          fkGroup[item],
          dataTable
        );

        const preColumn = {
          title: (
            <SelectableSearch
              options={options}
              onChange={handleFilterChange}
              filterOption={(input: any, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              name={item}
              onClear={onClear}
            />
          ),
          dataIndex: item,
          editable: true,
          width: 250,
          ellipsis: true,
        };

        return preColumn;
      } else {
        const preColumn = {
          title: (
            <InputSearch
              SearchFilter={item}
              placeholder={item.toLowerCase()}
              name={item}
              value={filterObjet?.[item]}
              onChange={handleFilterChange}
              onClear={onClear}
            />
          ),
          dataIndex: item,
          editable: true,
          width: 250,
          ellipsis: true,
        };

        return preColumn;
      }
    });

    result.push({
      title: "operacion",
      dataIndex: "operation",
      align: "center" as "center",
      width: 150,
      render: (_, record: { key: React.Key }) => (
        <>
          {settingOptions?.length >= 1 ? (
            <>
              <Space size="middle" className="boton">

                {iconOptionsManager(currentRol, selectedItem?.nombre, record, setIsSecondaryTableOpen)}
              </Space>
            </>
          ) : null}
        </>
      ),
    });

    return result;
  };

  //columnas de la tabla
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const columns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
    title: any;
    render?: any;
    fixed?: any;
  })[] = columnsGenerator(inputFilter);

  //propiedades que se le pasan a la tabla para establecer el comportamiento de filas y celda
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  //renderiza las propiedades de cada columna
  const columnS = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        render: col.render,
        save,
        fkGroup,
        itemsColumnsInformation,
      }),
    };
  });

  useEffect(() => {
    setDataTable([]);

    //apiGet(selectedItem?.key_table, setDataTable);
    // initLanguage();
  }, [settingOptions]);

  // console.log(selectedItem)
  const vanillaTable = (
    <>
      <div className="cointainer-table">
        <PerfectScrollbar>
          <Table
            components={components}
            rowSelection={{
              selectedRowKeys,
              onChange: onSelectChange,
            }}
            size="small"
            // @ts-ignore
            rowKey={`PK_T${selectedItem.key_table?.toUpperCase()}`}
            dataSource={data}
            rowClassName="rowf"
            // onRow={(record, rowIndex) => {
            //   return {
            //     onMouseEnter: () => {
            //       handleMouseEnter();
            //     },
            //     onMouseLeave: () => {
            //       handleMouseLeave();
            //     },
            //   };
            // }}
            loading={{
              indicator: <Spin tip="" size="large" />,
              // @ts-ignore
              spinning:
                !dataTable || settingOptions?.length === 0 ? true : false,
            }}
            // @ts-ignore
            columns={columnS as ColumnTypes}
            title={() => {
              return (
                <>
                  <Row>{selectedItem.nombre}</Row>

                  <Row gutter={[16, 16]}>
                    {selectedItem ? (
                      <div
                        className="mostrarOcultarForm"
                        onClick={handleMostrarForm}
                      >
                        {visibleForm ? MinusOutlined : PlusOutlined}
                      </div>
                    ) : (
                      ""
                    )}
                    {downloadIcon}
                    {selectedRowKeys.length > 0 && (
                      <>
                        <Popconfirm
                          title="seguro desea eliminar?"
                          // @ts-ignore
                          onConfirm={handleDeleteGroup}
                          style={{ visibility: "hidden" }}
                        >
                          <div className="iconDelete">{deleteIcon}</div>
                        </Popconfirm>
                      </>
                    )}
                  </Row>

                  <Row>{renderMessage()}</Row>
                </>
              );
            }}
          />
        </PerfectScrollbar>
      </div>
    </>
  );

  return (
    <>
      {contextHolder}
      <div>
        <Card className="card-container">
          <div className="row justify-content-center">
            <div className="col-12">
              <Row gutter={[16, 16]}>
                <Col span="4">
                  <Row gutter={[16, 16]}>
                    <Col span="2">
                      <div className="iconConfiguration">
                        {<SettingOutlined />}
                      </div>
                    </Col>
                    <Col xs={24} md={22}>
                      <div className="configuration">
                        {params?.option ? (params?.option).toUpperCase() : null}
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      {settingOptions ? (
                        <ul id="mi-lista">
                          {/* @ts-ignore */}
                          {settingOptions?.map((item: any) => (
                            // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                            <li
                              key={`${item.nombre}_${item.key}`}
                              onClick={() => handleSelect(item)}
                            >
                              {item.nombre}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Spin tip="" size="large" />
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={visibleForm || isSecondaryTableOpen ? 14 : 20}>
                  <Card className="card-body">
                    {selectedItem && renderContentManager()}
                  </Card>
                </Col>
                {visibleForm ? (
                  <Col md={4}>
                    <Card
                      className="justify-content-center align-items-center "
                      title={
                        <>
                          <Row gutter={[16, 16]}>
                            <Col xs={12} md={10}>
                              <div className="titleForm">Agregar</div>
                            </Col>
                            <Col xs={12} md={12}>
                              <div className="closeCardForm">
                                <CloseOutlined
                                  onClick={() => {
                                    handleMostrarForm();
                                  }}
                                />
                              </div>
                            </Col>
                          </Row>
                        </>
                      }
                    >
                      <FormAdd
                        setTitleState={setDataTable}
                        keyValues={inputFilter}
                        selectItem={selectedItem}
                        FKGroupData={fkGroup}
                        handleSubmit={handleSubmit}
                        itemsInformation={itemsColumnsInformation}
                      />
                    </Card>
                  </Col>
                ) : null}

                {isSecondaryTableOpen ? (
                  <Col md={6}>
                    <Card className="justify-content-center align-items-center ">
                      <MyForm onClick={handleCloseSecondaryTable} title={"tsede_jornada"} data={dataSede}/>
                    </Card>
                  </Col>
                ):null}
                  
                
              </Row>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default withPrincipal(Settings);
