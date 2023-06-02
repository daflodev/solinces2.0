import { Col, Row, Spin } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "../../assets/styles/testing.css";
import React, { useEffect, useState } from "react";
import DatePickerAddForm from "../datepickeraddform";
import MultiSelect from "../selectedform";
import InputAddNumber from "../inputaddnumber";
import { useFormEstablecimiento } from "./hooks/useFormEstablecimiento";
import "../../assets/styles/formEstablecimiento.css";

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

  const handleFieldFocus = (fieldName) => {
    setSelectedField(fieldName);
  };

  const handleFieldBlur = () => {
    setSelectedField(null);
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
      console.log(columnQualitiesInformation);

      return (
        <>
          {columnName.startsWith("FK_") ? (
            <Col xs={24} md={6} lg={6} xl={6}>
              <div className="form-container">
                {/* Primera columna */}
                <div className="form-column">
                  <div className="form-field">
                    <Field
                      component={MultiSelect}
                      style={{
                        borderRadius: "5px",
                        border: "2px solid #e2e2e2",
                        padding: "5px",
                      }}
                      placeholder={columnName}
                      id={columnName}
                      name={columnName}
                      autoComplete="off"
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

                    <ErrorMessage
                      name={columnName}
                      component={"div"}
                      className="text-danger"
                    />
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
                      <Field
                        // placeholder={columnName}
                        id={columnName}
                        name={columnName}
                        autoComplete="off"
                        maxLength={columnQualitiesInformation[0]?.longitud}
                        placeholder={columnName}
                        onFocus={() => handleFieldFocus(columnName)}
                        onBlur={handleFieldBlur}
                      />
                      <ErrorMessage
                        name={columnName}
                        component={"div"}
                        className="text-danger"
                      />
                      {/* <md
                        className={`placeholder ${
                          selectedField === columnName ? "active" : ""
                        }`}
                      >
                        {columnName}
                      </md> */}
                    </div>
                  </div>
                </div>
              </Col>
            </>
          ) : columnQualitiesInformation[0]?.data_type === "integer" ||
            columnQualitiesInformation[0]?.data_type === "numeric" ? (
            <Col xs={24} md={6} lg={6} xl={6}>
              <Field
                InputConditions={columnQualitiesInformation[0]}
                placeholder={columnName}
                component={InputAddNumber}
                style={{
                  borderRadius: "5px",
                  border: "2px solid #e2e2e2",
                  padding: "5px",
                }}
                id={columnName}
                name={columnName}
                autoComplete="off"
              />

              <ErrorMessage
                name={columnName}
                component={"div"}
                className="text-danger"
              />
            </Col>
          ) : columnQualitiesInformation[0]?.data_type === "date" ? (
            <Col xs={24} md={6} lg={6} xl={6}>
              <Field
                placeholder={columnName}
                component={DatePickerAddForm}
                style={{
                  borderRadius: "5px",
                  border: "2px solid #e2e2e2",
                  padding: "5px",
                }}
                id={columnName}
                name={columnName}
                autoComplete="off"
              />

              <ErrorMessage
                name={columnName}
                component={"div"}
                className="text-danger"
              />
            </Col>
          ) : (
            <Col xs={24} md={6} lg={6} xl={6}>
              <Field
                style={{
                  borderRadius: "5px",
                  border: "2px solid #e2e2e2",
                  padding: "5px",
                }}
                placeholder={columnName}
                id={columnName}
                name={columnName}
                autoComplete="off"
              />

              <ErrorMessage
                name={columnName}
                component={"div"}
                className="text-danger"
              />
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
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="formulario">
            <div className="col-12">
              <Row gutter={[24, 30]}>
                {inputs.map((item) => (
                  <>{item}</>
                ))}
                <Row>
                  <div className="w-100">
                    <button type="submit">save</button>
                  </div>
                </Row>
              </Row>
            </div>
          </Form>
        </Formik>
      ) : (
        <div className="user_settings_loading_spin">
          <Spin tip="" size="large" />
        </div>
      )}
    </>
  );
};

export default FormEstablecimiento;
