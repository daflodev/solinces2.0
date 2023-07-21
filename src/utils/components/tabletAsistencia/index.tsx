import { Checkbox } from "antd";
import Table, { ColumnsType } from "antd/es/table";

interface DataType {
    key: React.Key;
    name: string;
    age: any;
  }

export const TabletAsistencia = () => {

    
      
      const columns: ColumnsType<DataType> = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: 200,
        },
        {
          title: 'Enero',
          children: [
            {
              title: (
                <div>
                    <p>LUN</p>
                    <p>16</p>
                </div>
              ),
              dataIndex: 'age',
              key: 'age',
              width: 10,
            },
            {
                title: (
                  <div>
                      <p>MAR</p>
                      <p>16</p>
                  </div>
                ),
                dataIndex: 'age',
                key: 'age',
                width: 10,
            },
            {
            title: (
                <div>
                    <p>MIER</p>
                    <p>16</p>
                </div>
            ),
            dataIndex: 'age',
            key: 'age',
            width: 10,
            },
          ],
        },
      ];
      
      const data: DataType[] = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          key: i,
          name: 'John Brown',
          age: (
          <div style={{ padding: '10px'}}>
            <Checkbox></Checkbox>
          </div>),
          
        });
      }

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                bordered
            />
        </>
    )
}