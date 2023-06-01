import React from 'react';
import { Table, Form, Button, Checkbox } from 'antd';
import { useFormik } from 'formik';

const YourTableComponent = () => {
  const data = [
    { id: 1, name: 'Elemento 1' },
    { id: 2, name: 'Elemento 2' },
    { id: 3, name: 'Elemento 3' },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const handleSubmit = (values) => {
    // Lógica para enviar los datos
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      selectedRows: [],
    },
    onSubmit: handleSubmit,
  });

  const rowSelection = {
    ...formik.getFieldProps('selectedRows'),
    onChange: (selectedRowKeys, selectedRows) => {
      formik.setFieldValue('selectedRows', selectedRows);
    },
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Table
        dataSource={data}
        columns={columns}
        rowSelection={rowSelection}
      />

      <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
        Enviar
      </Button>
    </Form>
  );
};

export default YourTableComponent;