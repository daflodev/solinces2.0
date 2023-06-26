import { useEffect, useState } from "react";
import { useJournySede } from "./useSedeJornada";
import { Card, Col, Spin } from "antd";

import MyForm from "../../../../utils/components/tableCheckbox/tableChecBox";
import { equisIcon } from "../../../../utils/assets/icon/iconManager";

export const SideOptionsManagerHook = () => {
  const [isSecondaryTableOpen, setIsSecondaryTableOpen] = useState(false);

  const [tableGridWidth, setTableGridWidth] = useState(14);

  const [secondaryTableComponentRender, setSecondaryTableComponentRender] =
    useState(<></>);

  const {
    dataSede,
    journySedeGetData,
    handleSendData,
    setDataSede,
    selectedValues,
    contextHolder
    // handleCheckboxChange,
  }: any = useJournySede();

  const handleCloseSecondaryTable = () => {
    setSecondaryTableComponentRender(<Col span={2} style={{justifyContent:"center", alignItems:"center", display:"flex", width:"100%", height:"100%"}}><Spin tip="" size="large" /></Col>);
    setDataSede(null);
    setIsSecondaryTableOpen(false);
  };

  const handleOpenSecondaryTable = async (record, nameSideOption) => {
    handleCloseSecondaryTable()
    setIsSecondaryTableOpen(true);

    switch (nameSideOption) {
      case "useSedeJornada":
        setTableGridWidth(14);

        journySedeGetData(record);

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
        <Col md={6}>
          <Card title="Tsede_jornada" extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}>
            <MyForm
              data={dataSede}
              setData={setDataSede}
              handleSendData={handleSendData}
              selectedValues={selectedValues}
              // onChange={handleCheckboxChange}
              onClick={handleCloseSecondaryTable}
            />
          </Card>
        </Col>
        </>
        
        
      );

      setSecondaryTableComponentRender(useSedeJornadaComponent);
    }
  }, [dataSede]);
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
