import { Col, DatePicker, Form, Input, Row, Select, Spin } from "antd";
import "../../assets/styles/testing.css";
import { useEffect, useState } from "react";
import { useFormEstablecimiento } from "./hooks/useFormEstablecimiento";
import "../../assets/styles/formEstablecimiento.css";
//@ts-ignore
import dayjs from "dayjs";
//@ts-ignore
import customParseFormat from "dayjs/plugin/customParseFormat";
import { saveIcon } from "../../assets/icon/iconManager";

dayjs.extend(customParseFormat);

const FormEstablecimiento = ({
  keyValues,

  FKGroupData,

  itemsInformation,
}: {
  setTitleState: any;
  keyValues: any;
  selectItem: any;
  FKGroupData: any;

  itemsInformation: any;
}) => {
  const {
    apiGet,
    initialValues,
    setInitialValue,
    handleSubmit,
    contextHolder,
  }: any = useFormEstablecimiento();

  useEffect(() => {
    apiGet("establecimiento", setInitialValue);
  }, []);

  const [selectedField, setSelectedField] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleFieldFocus = (fieldName) => {
    setSelectedField(fieldName);
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };
  const handleDateChange = (date) => {
    // console.log("Date changed:", date);
  };

  const optionsManager = (data: any, columnName: any) => {
    let reBuildName = columnName?.replace("FK_T", "PK_T");

    if (reBuildName.includes("_PADRE")) {
      reBuildName = reBuildName.replace("_PADRE", "");
    }

    if (
      reBuildName.includes("PK_TLV_") ||
      reBuildName.includes("PK_TLISTA_VALOR_")
    ) {
      reBuildName = "PK_TLISTA_VALOR";
    }

    const options = data?.map((item: any) => {
      return {
        value: item[reBuildName],
        label: item.NOMBRE,
      };
    });

    return options;
  };

  const inputsGenerator = (inputsOptions: any) => {
    const keys = Object.keys(inputsOptions);

    const processColumn = (columnName: any) => {
      const columnQualitiesInformation = itemsInformation.filter(
        (itemColumn: any) => itemColumn.column_name == columnName
      );
      return (
        <>
          {columnName.startsWith("FK_") ? (
            <Col xs={24} sm={12} md={8} lg={8} xl={6}>
              <div className="form-container">
                {/* Primera columna */}
                <div className="form-column">
                  <div className="form-field">
                    <Form.Item name={columnName}>
                      <Select
                        onChange={handleOptionChange}
                        onFocus={() => handleFieldFocus(columnName)}
                        onBlur={() => handleFieldFocus(null)}
                        value={selectedOption}
                        options={optionsManager(
                          FKGroupData[columnName],
                          columnName
                        )}
                        filterOption={(input: any, option: any) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                    </Form.Item>
                    <div
                      className={`placeholder ${
                        selectedField === columnName ||
                        (initialValues
                          ? initialValues[columnName] != null
                          : false)
                          ? "active"
                          : ""
                      }`}
                      // style={{ ...(initialValues[columnName] === null ?
                      //    { width: "45%",
                      //   overflow: "hidden",
                      //   textOverflow: "ellipsis",
                      //   whiteSpace: "nowrap"} : { width: "40%"})
                     
                      // }}
                    >
                      {columnName}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ) : columnQualitiesInformation[0]?.data_type ===
            "character varying" ? (
            <>
              <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                <div className="form-container">
                  {/* Primera columna */}
                  <div className="form-column">
                    <div className="form-field">
                      <Form.Item name={columnName}>
                        <Input
                          maxLength={columnQualitiesInformation[0]?.longitud}
                          onFocus={() => handleFieldFocus(columnName)}
                          onBlur={() => handleFieldFocus(null)}
                          autoComplete="off"
                          // placeholder={columnName}
                        />
                      </Form.Item>
                      <div
                        className={`placeholder ${
                          selectedField === columnName ||
                          (initialValues
                            ? initialValues[columnName] != null
                            : false)
                            ? "active"
                            : ""
                        }`}
                      //   style={{ 
                      //     ...(initialValues[columnName] === null ?
                      //     { width: "45%",
                      //    overflow: "hidden",
                      //    textOverflow: "ellipsis",
                      //    whiteSpace: "nowrap"} : "")
                      
                      //  }}
                      >
                        {columnName}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </>
          ) : columnQualitiesInformation[0]?.data_type === "date" ? (
            <>
              <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                <div className="form-container">
                  {/* Primera columna */}
                  <div className="form-column">
                    <div className="form-field">
                      <Form.Item name={columnName}>
                        <DatePicker
                          onChange={handleDateChange}
                          format="YYYY/MM/DD"
                          placeholder=""
                        />
                      </Form.Item>
                      <div
                        className={`placeholder ${
                          selectedField === columnName ||
                          (initialValues
                            ? initialValues[columnName] != null
                            : false)
                            ? "active"
                            : ""
                        }`}
                      //   style={{ 
                      //     ...(initialValues[columnName] === null ?
                      //     { width: "65%",
                      //    overflow: "hidden",
                      //    textOverflow: "ellipsis",
                      //    whiteSpace: "nowrap"} :"" )
                      
                      //  }}
                      >
                        {columnName}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </>
          ) : ""}
        </>
      );
    };
    const result: any[] = keys.map((item) => {
      const preColumn = processColumn(item);

      return preColumn;
    });

    return result;
  };

  const inputs = inputsGenerator(keyValues);

  return (
    <>
      {contextHolder}
      {initialValues ? (
        <Form
          className="formulario"
          initialValues={initialValues}
          onFinish={handleSubmit}
        >
          <Row gutter={[16, 16]}>
            <div className="w-100" style={{ padding: 20 }}>
              <button
                type="submit"
                style={{
                  background: "transparent",
                  cursor: "pointer",
                  border: "none",
                  color: "black",
                }}
              >
                {saveIcon}
              </button>
            </div>
          </Row>

          <Row gutter={[16, 16]}>
            {inputs.map((item) => (
              <>{item}</>
            ))}
          </Row>
        </Form>
      ) : (
        <div className="user_settings_loading_spin">
          <Spin tip="" size="large" />
        </div>
      )}
    </>
  );
};

export default FormEstablecimiento;
