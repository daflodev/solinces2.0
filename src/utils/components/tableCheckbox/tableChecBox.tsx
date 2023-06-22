import React, { useState } from "react";
import { Table, Modal, Checkbox, Row, Col } from "antd";
import { saveIcon } from "../../assets/icon/iconManager";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

interface propsJourny {
  handleSendData?: () => void;
  data?: any;
  setData?: any;
  selectedRowKeys?:any, 
  setSelectedRowKeys?:any
}

const MyForm: React.FC<propsJourny> = (props) => {
  // const handleCheckboxChange = (id) => {
  //   props.setData((prevData) =>
  //     prevData.map((item) => {
  //       if (item.PK_TJORNADA === id) {
  //         const updatedItem = { ...item, BOOLEAN_FIELD: !item.BOOLEAN_FIELD };
  //         if (updatedItem.BOOLEAN_FIELD) {
  //           props.setSelectedItems((prevSelectedItems) => [
  //             ...prevSelectedItems,
  //             updatedItem,
  //           ]);
  //         } else {
  //           props.setSelectedItems((prevSelectedItems) =>
  //             prevSelectedItems.filter(
  //               (selectedItem) => selectedItem.PK_TJORNADA !== id
  //             )
  //           );
  //         }
  //         return updatedItem;
  //       }
  //       return item;
  //     })
  //   );
  // };

  // const handleSelectAllChange = () => {
  //   props.setSelectAll(!props.selectAll);
  //   props.setData((prevData) =>
  //     prevData.map((item) => ({ ...item, BOOLEAN_FIELD: !props.selectAll }))
  //   );
  //   if (!props.selectAll) {
  //     props.setSelectedItems([...props.data]);
  //   } else {
  //     props.setSelectedItems([]);
  //   }
  // };

  // const handleCheckAll = (e) => {
  //   const checked = e.target.checked;
  //   props.setData(
  //     props.data.map((item) => {
  //       return { ...item, checked };
  //     })
  //   );
  // };

  // const handleCheck = (record) => {
  //   props.setData(
  //     props.data.map((item) => {
  //       if (item.PK_TJORNADA === record.PK_TJORNADA) {
  //         return { ...item, BOOLEAN_FIELD: !item.BOOLEAN_FIELD };
  //       }
  //       return item;
  //     })
  //   );
  //   console.log(
  //     `Se ha marcado o desmarcado el elemento con ID ${record.PK_TJORNADA}`
  //   );
  // };

  // const columns = [
  //   // {
  //   //   title: (
  //   //     <Checkbox onChange={handleCheckAll}>

  //   //     </Checkbox>
  //   //   ),
  //   //   dataIndex: 'checked',
  //   //   render: (_, record) => (
  //   //     <Checkbox
  //   //       checked={record.BOOLEAN_FIELD}
  //   //       onChange={() => handleCheck(record)}
  //   //     />
  //   //   ),
  //   // },
  //   {
  //     title: "NOMBRE",
  //     dataIndex: "NOMBRE",
  //     key: "NOMBRE",
  //   },
  //   {
  //     title: "CODIGO",
  //     dataIndex: "CODIGO",
  //     key: "CODIGO",
  //   },
  // ];
  // const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  // const onSelectChange = (selectedRowKeys) => {
  //   setSelectedRowKeys(selectedRowKeys);
  // };

  // const handleCheckboxChange = (id) => {
  //   const newSelectedRowKeys = selectedRowKeys.includes(id)
  //     ? selectedRowKeys.filter((key) => key !== id)
  //     : [...selectedRowKeys, id];

  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  const [selectedValues, setSelectedValues] = React.useState<any>([]);

  const [checkboxData, setCheckboxData] = useState([]);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };
  return (
    <>
      <Checkbox.Group onChange={onChange}>
        <table>
          <thead>
            <tr>
              <th>NOMBRE</th> <th>CODIGO</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item) => (
              <tr key={item.PK_TJORNADA}>
                <td>
                  <Checkbox
                    checked={props.data.map(item => item.BOOLEAN_FIELD)}
                    value={item}
                    
                  />
                </td>
                <td>{item.NOMBRE}</td>
                <td>{item.CODIGO}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Checkbox.Group>

      <div onClick={props.handleSendData}>{saveIcon}</div>

      {/* <div>
        <h2>Seleccionar Todo</h2>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={props.selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th>NOMBRE</th>
              <th>CODIGO</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item) => (
              <tr key={item.PK_TJORNADA}>
                <td>
                  <input
                    type="checkbox"
                    checked={item.BOOLEAN_FIELD}
                    onChange={() => handleCheckboxChange(item.PK_TJORNADA)}
                  />
                </td>
                <td>{item.NOMBRE}</td>
                <td>{item.CODIGO}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div onClick={props.handleSendData}>{saveIcon}</div>
      </div> */}
    </>
  );
};

export default MyForm;
