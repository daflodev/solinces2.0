//@ts-ignore
import React from "react";

import "@/assets/styles/testing.css";

import { useEffect } from "react";

import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Layout,
  // Menu,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
} from "antd";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { shallow } from "zustand/shallow";
import { sessionInformationStore } from "../../store/userInformationStore";
import {
  MinusOutlined,
  PlusOutlined,
  deleteIcon,
  downloadIcon,
  funcionarioPermisoIcon,
  sedeInfraEstructuraFisicaIcon,
  sedeJornada,
  sedeNivel,
  sedeTecnologicaIcon,
  perifericosMediosIcon,
  TperiodoConfig,
  subjectRegistration,
} from "@/assets/icon/iconManager";
import { withPrincipal } from "@/components/content";
import { EditableCell } from "@/components/editablecells";
import FormAdd from "@/components/formadd";
import { EditableRow } from "@/components/inputcells";
import { InputSearch } from "@/components/inputsearch";
import SelectableSearch from "@/components/selectablesearch";
import { UseSettigns } from "./components/hooks/useApp";

import FormEstablecimiento from "@/components/formUsuarioEstablecimiento/formEstablecimientoUsario";

import MembreteComponent from "@/components/membrete";
import { SideOptionsManagerHook } from "./components/hooks/sideOptionsManagerHook";
import { useEvaluationViewHook } from './components/hooks/useEvaluationViewHook';
import { QualificationOptionComponent } from "./components/qualificationOption";



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

  const {
    isSecondaryTableOpen,
    handleOpenSecondaryTable,
    secondaryTableComponentRender,
    handleCloseSecondaryTable,
    tableGridWidth,
  }: any = SideOptionsManagerHook();

  const {
    isOnEvaluationView,
    setCurrentOptionName
  }: any = useEvaluationViewHook()


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

    if(isOnEvaluationView){
      return(<QualificationOptionComponent optionToRender={selectedItem?.nombre}/>)
    }

    if (currentRol != "SUPER_ADMINISTRADOR" && selectedItem?.nombre == "TESTABLECIMIENTO") {
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

    if (selectedItem?.nombre == "TCONFIGURACION_MEMBRETE") {
      return <MembreteComponent />;
    }

    return vanillaTable;
  };


  const iconOptionsManager = (rol, selectedTable, selectedTableInformation) => {
    const rolesToShowuseFuncionarioPermission = [
      "SUPER_ADMINISTRADOR",
      "DIRECTOR_ENTE_TERRITORIAL",
      "JEFE_SISTEMA_ENTE_TERRITORIAL",
      "JEFE_AREA_PLANEACION",
      "JEFE_AREA_COBERTURA",
      "RECTOR",
    ];

    const keyTable = selectedItem ? selectedItem.key_table : "";
    const keyDelete = `PK_T${keyTable?.toUpperCase()}`;

    let result = (
      <>
        {" "}
        <Popconfirm
          title="seguro desea eliminar?"
          onConfirm={() => handleDelete(selectedTableInformation[keyDelete])}
        >
          <div className="iconDelete">{deleteIcon}</div>
        </Popconfirm>
      </>
    );

    switch (selectedTable) {
      case "TSEDE":
        if (rol == "RECTOR") {
          result = (
            <>
              <div
                onClick={() => {
                  if (visibleForm) {
                    handleMostrarForm();
                  }
                  handleOpenSecondaryTable(
                    selectedTableInformation,
                    "useSedeJornada"
                  );
                }}
                style={{ cursor: "pointer" }}
              >
                {sedeJornada}
              </div>
              <div
                onClick={() =>
                  handleOpenSecondaryTable(
                    selectedTableInformation,
                    "useSedeNivel"
                  )
                }
                style={{ cursor: "pointer" }}
              >
                {sedeNivel}
              </div>
              <div
                onClick={() =>
                  handleOpenSecondaryTable(
                    selectedTableInformation,
                    "useSedeInfra"
                  )
                }
                style={{ cursor: "pointer" }}
              >
                {sedeInfraEstructuraFisicaIcon}
              </div>

              <div
                onClick={() =>
                  handleOpenSecondaryTable(
                    selectedTableInformation,
                    "useSedeTecnology"
                  )
                }
                style={{ cursor: "pointer" }}
              >
                {sedeTecnologicaIcon}
              </div>

              <div
                onClick={() =>
                  handleOpenSecondaryTable(
                    selectedTableInformation,
                    "useSedePerifericos"
                  )
                }
                style={{ cursor: "pointer" }}
              >
                {perifericosMediosIcon}
              </div>

              <Popconfirm
                title="seguro desea eliminar?"
                onConfirm={() =>
                  handleDelete(selectedTableInformation[keyDelete])
                }
              >
                <div className="iconDelete">{deleteIcon}</div>
              </Popconfirm>
            </>
          );
        }

        break;

      case "TPERIODO_ACADEMICO":
        if (rol == "RECTOR") {
          result = (
            <>
              <div
                onClick={() => {
                  if (visibleForm) {
                    handleMostrarForm();
                  }
                  handleOpenSecondaryTable(
                    selectedTableInformation,
                    "useTperiodo"
                  );
                }}
                style={{ cursor: "pointer" }}
              >
                {TperiodoConfig}
              </div>

              <Popconfirm
                title="seguro desea eliminar?"
                onConfirm={() =>
                  handleDelete(selectedTableInformation[keyDelete])
                }
              >
                <div className="iconDelete">{deleteIcon}</div>
              </Popconfirm>
            </>
          )

        }
        break;

      case "TMATRICULA":
        if (rolesToShowuseFuncionarioPermission.includes(rol)) {
          result = (
            <>
              <div
                onClick={() => {
                  if (visibleForm) {
                    handleMostrarForm();
                  }
                  handleOpenSecondaryTable(
                    selectedTableInformation,
                    "useTransferMatricula"
                  );
                }}
                style={{ cursor: "pointer" }}
              >
                {subjectRegistration}
              </div>

              <Popconfirm
                title="seguro desea eliminar?"
                onConfirm={() =>
                  handleDelete(selectedTableInformation[keyDelete])
                }
              >
                <div className="iconDelete">{deleteIcon}</div>
              </Popconfirm>
            </>
          )

        }
        break;
      case "TFUNCIONARIO":
        if (rolesToShowuseFuncionarioPermission.includes(rol)) {
          result = (
            <>
              <div
                onClick={() => {
                  if (visibleForm) {
                    handleMostrarForm();
                  }
                  handleOpenSecondaryTable(
                    selectedTableInformation,
                    "useFuncionarioPermission"
                  );
                }}
                style={{ cursor: "pointer" }}
              >
                {funcionarioPermisoIcon}
              </div>

              <Popconfirm
                title="seguro desea eliminar?"
                onConfirm={() =>
                  handleDelete(selectedTableInformation[keyDelete])
                }
              >
                <div className="iconDelete">{deleteIcon}</div>
              </Popconfirm>
            </>
          );
        }

        break;

      case "TPADRE":
        if (rolesToShowuseFuncionarioPermission.includes(rol)) {
          result = (
            <>
              <div
                onClick={() => {
                  if (visibleForm) {
                    handleMostrarForm();
                  }
                  handleOpenSecondaryTable(
                    selectedTableInformation,
                    "useFuncionarioPermission"
                  );
                }}
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
            </>
          );
        }

        break;

      case "TESTUDIANTE":
        if (rolesToShowuseFuncionarioPermission.includes(rol)) {
          result = (
            <>
              <div
                onClick={() => {
                  if (visibleForm) {
                    handleMostrarForm();
                  }
                  handleOpenSecondaryTable(
                    selectedTableInformation,
                    "useFuncionarioPermission"
                  );
                }}
                style={{ cursor: "pointer" }}
              >
                {funcionarioPermisoIcon}
              </div>

              <Popconfirm
                title="seguro desea eliminar?"
                onConfirm={() =>
                  handleDelete(selectedTableInformation[keyDelete])
                }
              >
                <div className="iconDelete">{deleteIcon}</div>
              </Popconfirm>
            </>
          );
        }

        break;

      case "TUSUARIO":
        if (rolesToShowuseFuncionarioPermission.includes(rol)) {
          result = (
            <>
              <div
                onClick={() => {
                  if (visibleForm) {
                    handleMostrarForm();
                  }
                  handleOpenSecondaryTable(
                    selectedTableInformation,
                    "useFuncionarioPermission"
                  );
                }}
                style={{ cursor: "pointer" }}
              >
                {funcionarioPermisoIcon}
              </div>

              <Popconfirm
                title="seguro desea eliminar?"
                onConfirm={() =>
                  handleDelete(selectedTableInformation[keyDelete])
                }
              >
                <div className="iconDelete">{deleteIcon}</div>
              </Popconfirm>
            </>
          );
        }

        break;

      default:
        result = (
          <>
            {" "}
            <Popconfirm
              title="seguro desea eliminar?"
              onConfirm={() =>
                handleDelete(selectedTableInformation[keyDelete])
              }
            >
              <div className="iconDelete">{deleteIcon}</div>
            </Popconfirm>
          </>
        );
        break;
    }

    return result;
  };

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

    {
      selectedItem &&
        !selectedItem?.nombre?.startsWith("THISTORY_") &&
        !(selectedItem?.nombre == "TSESION")
        ? result.push({
          title: "operacion",
          dataIndex: "operation",
          align: "center",
          width: 250,

          render: (_, record: { key: React.Key }) => (
            <>
              {settingOptions?.length >= 1 ? (
                <>
                  <Space size="middle" className="boton">
                    {iconOptionsManager(
                      currentRol,
                      selectedItem?.nombre,
                      record
                    )}
                  </Space>
                </>
              ) : null}
            </>
          ),
        })
        : null;
    }

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
        editable:
          !selectedItem?.nombre?.startsWith("THISTORY_") &&
            !(selectedItem?.nombre == "TSESION")
            ? col.editable
            : false,
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

  useEffect(() => {
    handleCloseSecondaryTable();
    localStorage.setItem("campus", selectedItem?.key_table);
  }, [selectedItem]);

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

              spinning:
                !dataTable || settingOptions?.length === 0 ? true : false,
            }}
            // @ts-ignore
            columns={columnS as ColumnTypes}
            title={() => {
              return (
                <>
                  <Row className="ttitulo-central">{selectedItem.nombre}</Row>
                  <Row className="tbotones-central">
                    {selectedItem && (!selectedItem?.nombre?.startsWith('THISTORY_') && !(selectedItem?.nombre == 'TSESION')) ? (
                      <div
                        className="mostrarOcultarForm"
                        onClick={() => {
                          handleCloseSecondaryTable();
                          handleMostrarForm();
                        }}
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
                  <Row className="titulo-mein">
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
                              onClick={() => {
                                handleSelect(item, isOnEvaluationView)
                                setCurrentOptionName(item?.nombre)
                              }}
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
                <Col
                  xs={24}
                  md={
                    visibleForm
                      ? 16
                      : isSecondaryTableOpen
                        ? tableGridWidth
                        : 20
                  }
                >
                  <Card className="card-body">
                    {selectedItem && renderContentManager()}
                  </Card>
                </Col>
                {visibleForm ? (
                  <Col md={4} className="card-agregar">
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

                {isSecondaryTableOpen ? secondaryTableComponentRender : null}
              </Row>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default withPrincipal(Settings);