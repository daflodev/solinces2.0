import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Table, Button, Modal, Card, Checkbox } from "antd";
import { saveIcon } from "../../assets/icon/iconManager";
import { useJournySede } from "../../../modules/configuration/components/hooks/useSedeJornada";

const { confirm } = Modal;

interface propsJourny {
  handleSendData?: () => void;
  data?: any;
  setData?: any;
  setSelectAll?: any;
  selectAll?: any;
  setSelectedItems?: any;
}

const MyForm: React.FC<propsJourny> = (props) => {

  const [checkAll, setCheckAll] = useState(false);
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

  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    setCheckAll(checked);
    props.setData((prevData) =>
      prevData.map((item) => {
        return { ...item, checked: checked };
      })
    );
  };

  const handleCheck = (record,) => {
    props.setData(
      props.data.map((item) => {
        if (item.PK_TJORNADA === record.PK_TJORNADA) {
          return { ...item, BOOLEAN_FIELD: !item.BOOLEAN_FIELD  };
        }
        return item;
      })
    );
    console.log(`Se ha marcado o desmarcado el elemento con ID ${record.PK_TJORNADA}`);
    setCheckAll(false)
  };


  const columns = [
    {
      title: (
        <Checkbox checked={checkAll} onChange={handleCheckAll}>

        </Checkbox>
      ),
      dataIndex: 'checked',
      render: (_, record) => (
        <Checkbox
          checked={record.BOOLEAN_FIELD}
          onChange={() => handleCheck(record)}
        />
      ),
    },
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


<Table columns={columns} dataSource={props.data} />
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
