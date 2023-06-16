import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Table, Button, Modal, Card } from "antd";
import { saveIcon } from "../../assets/icon/iconManager";
import { useJournySede } from "../../../modules/configuration/components/hooks/useSedeJornada";

const { confirm } = Modal;

interface propsJourny{
  onClick: () => void;
  title: any;
  data?: any;
  rowSelection?: any
  handleSendData: ()=> void;
  rowKey: any
}



const MyForm: React.FC<propsJourny> = (props) => {
  
  const columns = [
    {
      title: "NOMBRE",
      dataIndex: "NOMBRE",
      key: "NOMBRE",
    },
    {
      title: "CODIGO",
      dataIndex: "CODIGO",
      key: "CODIGO",
    },
  ];  
  return (
    <>
      <Card
        title={props.title}
        extra={<div onClick={props.onClick}>cerrar</div>}
      >
        <Table
          rowSelection={props.rowSelection}
          columns={columns}
          dataSource={props.data}
          rowKey={props.rowKey}
        />
        <div onClick={props.handleSendData} style={{ cursor: "pointer" }}>
          {saveIcon}
        </div>
      </Card>
    </>
  );
};

export default MyForm;
