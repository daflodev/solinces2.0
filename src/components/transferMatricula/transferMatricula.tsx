import { Button, Transfer } from 'antd';
import type { TransferListProps, TransferDirection } from 'antd/es/transfer';

interface TransferComponentProps {
  // Propiedades que quieras recibir desde el componente padre
  dataSource?:any, 
  targetKeys?:any, 
  handleChange: (newTargetKeys: string[], direcction: TransferDirection) => void;
}

const transferMatricula: React.FC<TransferComponentProps> = (props) => {

  

  return (
    <Transfer
      dataSource={props.dataSource}
      showSearch
      listStyle={{
        width: 250,
        height: 300,
      }}
      operations={['to right', 'to left']}
      targetKeys={props.targetKeys}
      onChange={props.handleChange}
      render={(item) => `${item.title}-${item.description}`}
      
    />
  );
};

export default transferMatricula;