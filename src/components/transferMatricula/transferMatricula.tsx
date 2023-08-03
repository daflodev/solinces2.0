import {  Transfer } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';

interface TransferComponentProps {
  // Propiedades que quieras recibir desde el componente padre
  dataSource?:any, 
  targetKeys?:any, 
  handleChange: (newTargetKeys: string[], direcction: TransferDirection) => void;
}

const transferMatricula: React.FC<TransferComponentProps> = (props) => {

const customTitle = ['Asignatura Matriculada', 'Asignatura Disponible']

  return (
    <Transfer
      dataSource={props.dataSource}
      showSearch
      listStyle={{
        width: 250,
        height: 300,
      }}
     
      targetKeys={props.targetKeys}
      titles={customTitle}
      onChange={props.handleChange}
      render={(item) => `${item.title}-${item.description}`}
      
    />
  );
};

export default transferMatricula;