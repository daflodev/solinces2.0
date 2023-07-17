import { useEffect, useState } from "react";
import { Table, Checkbox} from "antd";
import { saveIcon,} from "../../assets/icon/iconManager";
import "../../assets/styles/tableChecked.css";


interface propsJourny {
  handleSendData: (selectedValues, onClick) => void;
  data?: any;
  setData?: any;
  selectedValues?: any;
  onChange?: () => void;
  onClick?: () => void;
  rowKey?: string;
}

const MyForm: React.FC<propsJourny> = (props) => {
  const [selectedValues, setSelectedValues] = useState(props.selectedValues);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const handleCheckboxChange = (index) => {
    // console.log(index, "index");
    setSelectedValues(index);
    setIndeterminate(!!index.length && index.length < props.data.length);
    setCheckAll(index.length === props.data.length);
  };

  const onCheckAllChange = (e) => {
    let updatedSelectedValues = [];
    if (props.rowKey === "PK_TJORNADA") {
      updatedSelectedValues = e.target.checked
      ? props.data.map((item) => item.PK_TJORNADA)
      : [];
      
    } else if (props.rowKey === "PK_TNIVEL_ENSENANZA") {
      updatedSelectedValues = e.target.checked
      ? props.data.map((item) => item.PK_TNIVEL_ENSENANZA)
      : [];
     
    } 
    setSelectedValues(updatedSelectedValues)
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  useEffect(() => {
    // console.log(selectedValues, "cambio");
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
      dataIndex: props.rowKey,
      key: props.rowKey,
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
      {/* <table className="custom-table">
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
      </table> */}

      <Table dataSource={props.data} columns={columns} rowKey={props.rowKey}/>

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
