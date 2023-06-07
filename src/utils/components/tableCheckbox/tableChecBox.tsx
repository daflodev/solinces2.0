import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { Formik, Field, Form } from "formik";

// Datos de ejemplo para la tabla
const data = [
  {
    id: 1,
    name: "John Doe",
    age: 25,
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 30,
  },
];

interface FormValues {
  selectedData: any[]; // Reemplaza "any" con el tipo correcto de tus datos
}

const ExampleComponent: React.FC = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <Formik
      initialValues={{ selectedData: [] }}
      onSubmit={(values: any) => {
        
      }}
    >
      {() => (
        <Form>
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: onSelectChange,
            }}
            columns={columns}
            dataSource={data}
            rowKey="id"
            size="small"
            pagination={false}
          />
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ExampleComponent;
