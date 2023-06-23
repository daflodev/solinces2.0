import React, { useEffect, useState } from "react";
import { Table, Modal, Checkbox, Row, Col } from "antd";
import { saveIcon } from "../../assets/icon/iconManager";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import "../../assets/styles/tableChecked.css";
import { useJournySede } from "../../../modules/configuration/components/hooks/useSedeJornada";

interface propsJourny {
  handleSendData: (selectedValues) => void;
  data?: any;
  setData?: any;
  selectedRowKeys?: any;
  setSelectedRowKeys?: any;
  selectedValues?: any;
  setSelectedValues: any;
  onChange?: () => void;
}

const MyForm: React.FC<propsJourny> = (props) => {
  const [selectedValues, setSelectedValues] = useState(props.selectedValues);
  const handleCheckboxChange = (index) => {
    console.log(index, "index");
    setSelectedValues(index);
  };

  useEffect(() => {
    console.log(selectedValues, "cambio");
  }, [selectedValues]);

  return (
    <>
      <Checkbox.Group value={selectedValues} onChange={handleCheckboxChange}>
        <table  className="custom-table">
          <thead>
            <tr>
              <td>
                <th>
                  <Checkbox></Checkbox>
                </th>
              </td>
              <td>
                
                <th>NOMBRE</th>
              </td>
              <td>
                <th>CODIGO</th>
              </td>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item) => (
              <tr key={item.PK_TJORNADA + "_key"}>
                <td style={{paddingRight: 20}}>
                  <Checkbox value={item.PK_TJORNADA} />
                </td>
                <td  style={{paddingRight: 20, alignItems: "center"}}>{item.NOMBRE}</td>
                <td style={{ alignContent: "center"}}>{item.CODIGO}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Checkbox.Group>

      <div
        onClick={() => {
          props?.handleSendData(selectedValues);
        }}
      >
        {saveIcon}
      </div>
    </>
  );
};

export default MyForm;
