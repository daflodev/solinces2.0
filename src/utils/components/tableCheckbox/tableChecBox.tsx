import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Table, Button, Modal } from 'antd';

const { confirm } = Modal;

interface propsTableCheck{
  
}


const MyForm = () => {

  const data = [
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      address: '123 ABC Street',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 25,
      address: '456 XYZ Street',
    },
    // ... más datos
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  
  //  `

  const [selectedData, setSelectedData] = useState([]);

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedData(selectedRows);
  };

  const rowSelection = {
    onChange: onSelectChange,
  };

  const handleSendData = () => {
    console.log('Datos a enviar:', selectedData);
  };
  
  return (
    <>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        rowKey="id"
      />

      <Button type="primary" onClick={handleSendData}>
        Enviar Datos
      </Button>
    </>
  );
};

export default MyForm;