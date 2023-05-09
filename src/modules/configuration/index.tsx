import React from "react";

import "../../utils/assets/styles/testing.css";

import { useEffect } from "react";

import { Card, Col, Popconfirm, Row, Spin, Table } from "antd";
import { SettingOutlined, CloseOutlined } from '@ant-design/icons';

import { UseSettigns } from "./components/hooks/useApp";
import { MinusOutlined, PlusOutlined, deleteIcon, downloadIcon } from "../../utils/assets/icon/iconManager";
import FormAdd from "../../utils/components/formadd";
import SelectableSearch from "../../utils/components/selectablesearch";
import { InputSearch } from "../../utils/components/inputsearch";
import { EditableRow } from "../../utils/components/inputcells";
import { EditableCell } from "../../utils/components/editablecells";
import { withPrincipal } from "../../utils/components/content";



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
    params
  } = UseSettigns();

  //Funcion para generar la data de los filtros select
  const filterSelectOnColumnGenerator = ( fkName: any, fkValues: any, data: any)=>{
    let reBuildName = fkName?.replace("FK_T", "PK_T");

    if(reBuildName.includes('_PADRE')){
      reBuildName = reBuildName.replace('_PADRE', '');
    }

    const options: any = []

    for (let i = 0; i < data?.length; i++) {

      const item = data[i];
      
      const itsFkValue = fkValues?.filter((fkItem: any) => fkItem[reBuildName] == item[fkName]);

      if(itsFkValue?.length > 0){

        const coincidentalValue = itsFkValue[0]

        const isFkValueAlreadyExist = options.some((option: any) => option.value == coincidentalValue[reBuildName])

        if(!isFkValueAlreadyExist){
          options.push({
            value: coincidentalValue[reBuildName], label: coincidentalValue.NOMBRE
          })
        }
        
      }
    }

    return options
  }

  //funcion de selecion lista para renderizar tabla
  const columnsGenerator = (filterObjet: any) => {
    const keys = Object.keys(filterObjet);

    const result: any[] = keys.map((item) => {

      const ifSelected = (item.startsWith("FK_"));

      if(ifSelected){

        const options = filterSelectOnColumnGenerator(item, fkGroup[item], dataTable)

        const preColumn = {
          title: (
            <SelectableSearch 
            options={options} 
            onChange={handleFilterChange}
            filterOption={(input: any, option: any) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            name={item}
            onClear={onClear}
            />
          ),
          dataIndex: item,
          editable: true,
        };
  
        return preColumn;

      }else{
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
        };
  
        return preColumn;
      }

    });

    result.push({
      title: "",
      dataIndex: "operation",
      // fixed: 'right',
      render: (_, record: { key: React.Key }) => (
        <>
          {settingOptions?.length >= 1 ? (
            <Popconfirm
              title="seguro desea eliminar?"
              onConfirm={() => handleDelete(record.key)}
            >
              <div className="iconDelete" style={{ visibility: "hidden" }}>
                {deleteIcon}
              </div>
            </Popconfirm>
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
    width?: number;
    fixed?: string;
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
        onCell: (record:any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        render: col.render,
        save,
        fkGroup,
        itemsColumnsInformation
      }),
    };
  });

  

  useEffect(() => {
    setDataTable([])

    //apiGet(selectedItem?.key_table, setDataTable);
    // initLanguage();
  }, [settingOptions]);

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
                      <div className="configuration">{params?.option ? (params?.option).toUpperCase() : null}</div>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      {settingOptions ? 
                      <ul id="mi-lista">
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
                      : <Spin tip="" size="large"/>}
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={!visibleForm ? 20 : 16}>
                  <Card className="card-body">
                    {selectedItem && (
                      <>
                        <Table
                          components={components}
                          rowSelection={{
                            selectedRowKeys,
                            onChange: onSelectChange,
                          }}
                          rowKey={`PK_T${selectedItem.key_table?.toUpperCase()}`}
                          rowClassName={() => "editable-row"}
                          dataSource={data}
                          loading={
                            {
                              indicator: <Spin tip="" size="large"/>,
                              spinning: (!dataTable || settingOptions?.length === 0) ? true : false
                            }
                          }
                          scroll={{ x: 500 }}
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
                                        onConfirm={handleDeleteGroup}
                                        style={{ visibility: "hidden" }}
                                      >
                                        <div className="iconDelete">
                                          {deleteIcon}
                                        </div>
                                      </Popconfirm>
                                    </>
                                  )}
                                  </Row>
                               
                                
                                <Row>{renderMessage()}</Row>
                              </>
                            );
                          }}
                        />
                      </>
                    )}
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
                ) : (
                  null
                )}
              </Row>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default withPrincipal(Settings);