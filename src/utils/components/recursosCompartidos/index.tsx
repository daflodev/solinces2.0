import { Space, Table } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';



export const RecursosCompartidos = () => {

    const dataSource = [
        {
          key: '1',
          name: (
            <Space size="middle">
                <FilePdfOutlined />
                lorem lorem
            </Space>
            ),
          age: 'lorem lorem',
          address: '10/01/2023',
        },
        {
          key: '2',
          name: (
            <Space size="middle">
                <FilePdfOutlined />
                lorem lorem
            </Space>
            ),
          age: 'lorem lorem',
          address: '10/01/2023',
        },
      ];
      
      const columns = [
        {
          title: 'Nombre de recurso',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Descripcion',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Fecha de publicacion',
          dataIndex: 'address',
          key: 'address',
        },
      ];
      
    return (
        <>
        <Table dataSource={dataSource} columns={columns} bordered />
        </>
    )
}