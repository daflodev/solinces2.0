import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Table, Button, Modal, Card } from "antd";
import { saveIcon } from "../../assets/icon/iconManager";
import { useJournySede } from "../../../modules/configuration/components/hooks/useSedeJornada";

const { confirm } = Modal;

interface propsJourny {
  onClick: () => void;
  title: any;
  data?: any;
  rowSelection?: any;
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

  

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys)
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleSendData = () => {
    console.log("Datos a enviar:", selectedRowKeys);
  };

  return (
    <>
      <Card  title={props.title} extra={<div onClick={props.onClick}>cerrar</div>}>
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange:handleSelectChange,
          }}
          columns={columns}
          dataSource={props.data}
          pagination={false}
        />
        <div onClick={handleSendData} style={{cursor: "pointer"}} >
            {saveIcon}
        </div>
      </Card>
    </>
  );
};

export default MyForm;
