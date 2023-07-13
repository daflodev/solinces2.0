import { useEffect, useState } from "react";
import { useJournySede } from "./useSedeJornada";
import { Card, Col, Spin } from "antd";

import MyForm from "../../../../utils/components/tableCheckbox/tableChecBox";
import { equisIcon } from "../../../../utils/assets/icon/iconManager";
import { useNivelSede } from "./useSedeNivel";
import SedeInfraEstructuraFisica from "../../../../utils/components/formSedeInfra";
import { useSedeInfra } from "./useSedeInfra";
import { useSedeTecnology } from "./useSedeInformatica";


export const SideOptionsManagerHook = () => {
  const [isSecondaryTableOpen, setIsSecondaryTableOpen] = useState(false);

  const [tableGridWidth, setTableGridWidth] = useState(12);

  const [secondaryTableComponentRender, setSecondaryTableComponentRender] =
    useState(<Spin tip="" size="large" />);

  const {
    dataSede,
    journySedeGetData,
    handleSendData,
    setDataSede,
    selectedValues,
    contextHolder,
  }: // handleCheckboxChange,
    any = useJournySede();
  const {
    nivelSedeGetData,
    handleSendDataNivel,
    dataSedeNivel,
    setDataSedeNivel,
    selectedValuesNivel,
  }: any = useNivelSede();


  const { dataSedeInfra, infraSedeGetData, initialValues, resultado, infraFKData, handleFormSubmit } = useSedeInfra()

  const {
    form,
    dataSedeTecnology,
    TecnologySedeGetData,
    initialValuesTec,


    TecnologyFKData,
  } = useSedeTecnology()

  // const {onFieldChange, onFinish}=useSedeInfra()

  const handleCloseSecondaryTable = () => {
    setSecondaryTableComponentRender(
      <Col
        span={2}
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <Spin tip="" size="large" />
      </Col>
    );
    setDataSede(null);
    setDataSedeNivel(null)
    setIsSecondaryTableOpen(false);
  };



  const handleOpenSecondaryTable = async (record, nameSideOption) => {
    handleCloseSecondaryTable();
    setIsSecondaryTableOpen(true);

    switch (nameSideOption) {
      case "useSedeJornada":
        setTableGridWidth(16);

        journySedeGetData(record);

        break;
      case "useSedeNivel":
        setTableGridWidth(16);
        nivelSedeGetData(record);

        break;
      case "useSedeInfra":

        setTableGridWidth(16);
        infraSedeGetData(record)

        break;

      case "useSedeTecnology":
        setTableGridWidth(16);
        TecnologySedeGetData(record)
        break;

      default:
        setIsSecondaryTableOpen(false);
        break;
    }
  };
  useEffect(() => {
    if (dataSede) {
      const useSedeJornadaComponent = (
        <>
          {contextHolder}
          <Col md={8}>
            <Card
              style={{ width: "100%" }}
              title="Tsede_jornada"
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >
              <MyForm
                data={dataSede}
                setData={setDataSede}
                handleSendData={handleSendData}
                selectedValues={selectedValues}
                // onChange={handleCheckboxChange}
                onClick={handleCloseSecondaryTable}
                rowKey="PK_TJORNADA"
              />
            </Card>
          </Col>
        </>
      );

      setSecondaryTableComponentRender(useSedeJornadaComponent);
    } else if (dataSedeNivel) {
      const useSedeNivelComponent = (
        <>
          {contextHolder}
          <Col md={8}>
            <Card
              style={{ width: "100%" }}
              title="Tsede_nivel"
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >
              <MyForm
                data={dataSedeNivel}
                setData={setDataSedeNivel}
                selectedValues={selectedValuesNivel}
                // onChange={handleCheckboxChange}
                handleSendData={handleSendDataNivel}
                onClick={handleCloseSecondaryTable}
                rowKey="PK_TNIVEL_ENSENANZA"

              />
            </Card>
          </Col>
        </>
      );
      setSecondaryTableComponentRender(useSedeNivelComponent);
    } else if (dataSedeInfra) {
      infraFKData()

      const useSedeInfraComponente = (
        <>
          {/* {contextHolder} */}

          <Col md={8}>
            <Card style={{ width: "100%" }}
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >
              <SedeInfraEstructuraFisica initialValues={initialValues} dataselect={resultado} handleFormSubmit={handleFormSubmit} />
            </Card>
          </Col>
        </>
      )

      setSecondaryTableComponentRender(useSedeInfraComponente);
    } else if (dataSedeTecnology) {

      const useSedeTecnologyComponente = (
        <>
          {/* {contextHolder} */}

          <Col md={8}>
            <Card style={{ width: "100%" }}
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >
              <SedeInfraEstructuraFisica initialValues={initialValuesTec} />
            </Card>
          </Col>
        </>
      )

      setSecondaryTableComponentRender(useSedeTecnologyComponente);
    }
  }, [dataSede, dataSedeNivel, dataSedeInfra]);




  return {
    isSecondaryTableOpen,
    handleOpenSecondaryTable,
    setIsSecondaryTableOpen,
    secondaryTableComponentRender,
    handleCloseSecondaryTable,
    tableGridWidth,
  };
};

// import { Table, Checkbox } from 'antd';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const MyTable = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://ejemplo.com/api/data');
//       const apiData = response.data;
//       // Añade una propiedad "checked" inicialmente a "false" en cada objeto de la API
//       const formattedData = apiData.map((item) => ({ ...item, checked: false }));
//       setData(formattedData);
//     } catch (error) {
//       console.error('Error al obtener los datos:', error);
//     }
//   };

//   const handleCheckAll = (e) => {
//     const checked = e.target.checked;
//     setData(
//       data.map((item) => {
//         return { ...item, checked };
//       })
//     );
//   };

//   const handleCheck = (record, checked) => {
//     setData(
//       data.map((item) => {
//         if (item.id === record.id) {
//           return { ...item, checked };
//         }
//         return item;
//       })
//     );
//   };

//   const columns = [
//     {
//       title: (
//         <Checkbox onChange={handleCheckAll}>
//           Checked All
//         </Checkbox>
//       ),
//       dataIndex: 'checked',
//       render: (_, record) => (
//         <Checkbox
//           checked={record.checked}
//           onChange={(e) => handleCheck(record, e.target.checked)}
//         />
//       ),
//     },
//     {
//       title: 'Nombre',
//       dataIndex: 'name',
//     },
//   ];

//   return <Table columns={columns} dataSource={data} />;
// };

// export default MyTable;
