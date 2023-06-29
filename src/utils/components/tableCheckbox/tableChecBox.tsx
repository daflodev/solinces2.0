import React, { useEffect, useState } from "react";
import { Table, Modal, Checkbox, Row, Col } from "antd";
import { saveIcon, equisIcon } from "../../assets/icon/iconManager";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import "../../assets/styles/tableChecked.css";
import { useJournySede } from "../../../modules/configuration/components/hooks/useSedeJornada";

interface propsJourny {
  handleSendData: (selectedValues, onClick) => void;
  data?: any;
  setData?: any;
  selectedRowKeys?: any;
  setSelectedRowKeys?: any;
  selectedValues?: any;
  onChange?: () => void;
  onClick?: () => void;
}

const MyForm: React.FC<propsJourny> = (props) => {
  const [selectedValues, setSelectedValues] = useState(props.selectedValues);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const handleCheckboxChange = (index) => {
    console.log(index, "index");
    setSelectedValues(index);
    setIndeterminate(!!index.length && index.length < props.data.length);
    setCheckAll(index.length === props.data.length);
  };

  const onCheckAllChange = (e) => {
    console.log(props.data.map((item) => item.PK_TJORNADA));
    setSelectedValues(
      e.target.checked ? props.data.map((item) => item.PK_TJORNADA) : []
    );
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  useEffect(() => {
    console.log(selectedValues, "cambio");
  }, [selectedValues]);

  const columns = [
    {
      title: (
        <Checkbox
          onChange={onCheckAllChange}
          indeterminate={indeterminate}
          checked={checkAll}
        />
      ),
      dataIndex: "PK_TJORNADA",
      key: "PK_TJORNADA",
      render: (value) => (
        <Checkbox
          checked={selectedValues.includes(value)}
          onChange={(e) =>
            handleCheckboxChange(
              e.target.checked
                ? [...selectedValues, value]
                : selectedValues.filter((val) => val !== value)
            )
          }
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
      <table className="custom-table">
        <thead>
          <tr>
            <th>
              <Checkbox
                onChange={onCheckAllChange}
                indeterminate={indeterminate}
                checked={checkAll}
              />
            </th>

            <th>NOMBRE</th>

            <th>CODIGO</th>
          </tr>
        </thead>

        <tbody>
       
          <Checkbox.Group
            value={selectedValues}
            onChange={handleCheckboxChange}
          >
            {props.data.map((item) => (
              <tr key={item.PK_TJORNADA + "_key"}>
                <td style={{ paddingRight: 20 }}>
                  <Checkbox value={item.PK_TJORNADA} />
                </td>
                <td>{item.NOMBRE}</td>
                <td>{item.CODIGO}</td>
              </tr>
            ))}
          </Checkbox.Group>
        </tbody>
      </table>

      {/* <Table dataSource={props.data} columns={columns} rowKey="PK_TJORNADA" /> */}

      <div
        onClick={() => {
          props?.handleSendData(selectedValues, props.onClick);
        }}
      >
        {saveIcon}
      </div>
    </>
  );
};

export default MyForm;
