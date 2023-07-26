import { Space, Table } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';



export const RecursosCompartidos = () => {

    const dataSource = [
        {
          id: '1',
          name: 'lorem lorem',
          description: 'lorem lorem',
          date: '10/01/2023',
          type: 'pdf'
        },
        {
          id: '2',
          name: 'lorem lorem',
          description: 'lorem lorem',
          date: '10/01/2023',
          type: 'word'
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
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Fecha de publicacion',
          dataIndex: 'date',
          key: 'date',
        },
      ];
      
    return (
        <>
        <Table dataSource={dataSource} columns={columns} bordered />
        </>
    )
}