import React, { useState } from "react";
import { Table, Modal, Card } from "antd";
import { saveIcon } from "../../assets/icon/iconManager";

// @ts-ignore
const { confirm } = Modal;

interface propsJourny {
  onClick: () => void;
  title: any;
  data?: any;
}

const MyForm: React.FC<propsJourny> = (props) => {

  const columns = [
    {
      title: "NOMBRE",
      dataIndex: "NOMBRE",
      key: "NOMBRE"
    },
    {
      title: "CODIGO",
      dataIndex: "CODIGO",
      key: "CODIGO"
    },
  ];

  //  `

  const [selectedData, setSelectedData] = useState([]);
  // @ts-ignore
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedData(selectedRows);
  };

  const rowSelection = {
    onChange: onSelectChange,
  };

  const handleSendData = () => {
    console.log("Datos a enviar:", selectedData);
  };

  return (
    <>
      <Card  title={props.title} extra={<div onClick={props.onClick}>cerrar</div>}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={props.data}
        />
        <div onClick={handleSendData} style={{cursor: "pointer"}} >
            {saveIcon}
        </div>
      </Card>
    </>
  );
};

export default MyForm;
