import { Col, DatePicker, Form, Input, Row, Select, Spin } from "antd";
import { ErrorMessage, Field, Formik } from "formik";
import "../../assets/styles/testing.css";
import React, { useEffect, useState } from "react";
import DatePickerAddForm from "../datepickeraddform";
import MultiSelect from "../selectedform";
import InputAddNumber from "../inputaddnumber";
import { useFormEstablecimiento } from "./hooks/useFormEstablecimiento";
import "../../assets/styles/formEstablecimiento.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { saveIcon } from "../../assets/icon/iconManager";

dayjs.extend(customParseFormat);

const FormEstablecimiento = ({
  setTitleState,
  keyValues,
  selectItem,
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
    console.log("Date changed:", date);
  };

  const handleBlur = () => {
    console.log("Input blurred");
  };

  const handleFocus = () => {
    console.log("Input focused");
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
            <Col xs={24} md={6} lg={6} xl={6}>
              <div className="form-container">
                {/* Primera columna */}
                <div className="form-column">
                  <div className="form-field">
                    <Form.Item name={columnName}>
                      <Select
                        onChange={handleOptionChange}
                        placeholder={columnName}
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
                  </div>
                </div>
              </div>
            </Col>
          ) : columnQualitiesInformation[0]?.data_type ===
            "character varying" ? (
            <>
              <Col xs={24} md={6} lg={6} xl={6}>
                <div className="form-container">
                  {/* Primera columna */}
                  <div className="form-column">
                    <div className="form-field">
                      <Form.Item name={columnName}>
                        <Input
                          maxLength={columnQualitiesInformation[0]?.longitud}
                          type="text"
                          onFocus={() => handleFieldFocus(columnName)}
                          onBlur={() => handleFieldFocus(null)}
                          // placeholder={columnName}
                        />
                      </Form.Item>
                      <span
                        className={`placeholder ${
                          selectedField === columnName ||
                         (initialValues ? initialValues[columnName] != null : false)
                            ? "active"
                            : ""
                        }`}
                      >
                        {columnName}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            </>
          ) : columnQualitiesInformation[0]?.data_type === "date" ? (
            <>
              <Col xs={24} md={6} lg={6} xl={6}>
                <Form.Item name={columnName}>
                  <DatePicker
                    placeholder={columnName}
                    onChange={handleDateChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    format="YYYY/MM/DD"
                  />
                </Form.Item>
              </Col>
            </>
          ) : (
            <Col xs={24} md={6} lg={6} xl={6}>
              <Form.Item
                // placeholder={columnName}

                name={columnName}

                // maxLength={columnQualitiesInformation[0]?.longitud}

                // onFocus={() => handleFieldFocus(columnName)}
                // onBlur={handleFieldBlur}
              >
                <Input
                  placeholder={columnName}
                  maxLength={columnQualitiesInformation[0]?.longitud}
                />
              </Form.Item>
            </Col>
          )}
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
        <Row style={{paddingBottom:"20px"}}>
                <div className="w-100">
                  <button type="submit" style={{background:"transparent", cursor:"pointer", border:"none", color:"black"}}>{saveIcon}</button>
                </div>
              </Row>
          <div className="col-12">
            <Row gutter={[24, 30]}>
              {inputs.map((item) => (
                <>{item}</>
              ))}
             
            </Row>
          </div>
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
