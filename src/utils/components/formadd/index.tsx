import { SaveOutlined } from "@ant-design/icons";

import { Col, Row } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Yup } from "../../utils";
import DatePickerAddForm from "../datepickeraddform";
import InputAddNumber from "../inputaddnumber";
import MultiSelect from "../selectedform";
import "./formaddStyle.css";

const FormAdd = ({
  setTitleState,
  keyValues,
  selectItem,
  FKGroupData,
  handleSubmit,
  itemsInformation,
}: {
  setTitleState: any;
  keyValues: any;
  selectItem: any;
  FKGroupData: any;
  handleSubmit: any;
  itemsInformation: any;
}) => {
  //
  const initialValuesGeneraitor = (keys, columInfo) => {
    const cloneKeys = { ...keys };

    for (const columnItem of columInfo) {
      if (
        columnItem.is_nullable === "YES" &&
        cloneKeys.hasOwnProperty(columnItem.column_name)
      ) {
        cloneKeys[columnItem.column_name] = null;
      }
    }

    return {
      ...cloneKeys,
      AUTHOR_RC: "1",
      CLIENTS_RC: "1",
    };
  };

  const initialValuesPrimary = initialValuesGeneraitor(
    keyValues,
    itemsInformation
  );

  //
  const processVarCharTypeRules = (columnQualityInformation: any) => {
    if (columnQualityInformation?.is_nullable == "NO") {
      return Yup.string()
        .matches(/^\S(.*\S)?$/, "Formato no valido")
        .required("Este campo es requerido");
    }

    if (columnQualityInformation?.is_nullable == "YES") {
      return Yup.string().matches(/^\S(.*\S)?$/, "Formato no valido");
    }
  };

  const processGenericRules = (columnQualityInformation: any) => {
    if (columnQualityInformation?.is_nullable == "NO") {
      return Yup.string().required("Este campo es requerido");
    }

    if (columnQualityInformation?.is_nullable == "YES") {
      return null;
    }
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

  const generateValidationSchema = (inputsOptions: any) => {
    const keys = Object.keys(inputsOptions);
    const validationObject: any = {};

    keys.forEach((item) => {
      const columnQualitiesInformation = itemsInformation.filter(
        (itemColumn: any) => itemColumn.column_name == item
      );

      if (columnQualitiesInformation[0]?.data_type == "character varying") {
        validationObject[item] = processVarCharTypeRules(
          columnQualitiesInformation[0]
        );
      } else {
        validationObject[item] = processGenericRules(
          columnQualitiesInformation[0]
        );
      }
    });
    return Yup.object().shape(validationObject);
  };

  const inputsGenerator = (inputsOptions: any) => {
    const keys = Object.keys(inputsOptions);

    const processColumn = (columnName: any) => {
      const columnQualitiesInformation = itemsInformation.filter(
        (itemColumn: any) => itemColumn.column_name == columnName
      );

      if (columnName.startsWith("FK_")) {
        const data = optionsManager(FKGroupData[columnName], columnName);
        const columnInformationColor = itemsInformation.filter(
          (item) => item.column_name == columnName
        );
        const validateInputColorRed =
          (data == undefined || data?.lenght == 0) &&
          columnInformationColor[0].is_nullable == "NO";
        const validateInputColorYellow =
          (data == undefined || data?.lenght == 0) &&
          columnInformationColor[0].is_nullable == "YES";
        return (
          <>
            <Row gutter={[16, 16]}>
              <Col>
                <Field
                  className={
                    validateInputColorRed
                      ? "changeColorInputRed"
                      : validateInputColorYellow
                      ? "changeColorInputYellow"
                      : null
                  }
                  component={MultiSelect}
                  placeholder={columnName}
                  id={columnName}
                  name={columnName}
                  autoComplete="off"
                  options={optionsManager(FKGroupData[columnName], columnName)}
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
                {validateInputColorRed && (
                  <div style={{}}>Peligro | Sin datos</div>
                )}
                {validateInputColorYellow && (
                  <div style={{}}>Advertencia | Sin datos</div>
                )}
              </Col>
            </Row>
            <br />
          </>
        );
      } else if (
        columnQualitiesInformation[0]?.data_type === "character varying"
      ) {
        return (
          <>
            <Row gutter={[16, 16]}>
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
                maxLength={columnQualitiesInformation[0]?.longitud}
              />

              <ErrorMessage
                name={columnName}
                component={"div"}
                className="text-danger"
              />
            </Row>
            <br />
          </>
        );
      } else if (
        columnQualitiesInformation[0]?.data_type === "integer" ||
        columnQualitiesInformation[0]?.data_type === "numeric"
      ) {
        return (
          <>
            <Row gutter={[16, 16]}>
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
            </Row>
            <br />
          </>
        );
      } else if (columnQualitiesInformation[0]?.data_type === "date") {
        return (
          <>
            <Row gutter={[16, 16]}>
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
            </Row>
            <br />
          </>
        );
      } else {
        return (
          <>
            <Row gutter={[16, 16]}>
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
            </Row>
            <br />
          </>
        );
      }
    };

    const result: any[] = keys.map((item) => {
      const preColumn = processColumn(item);

      return preColumn;
    });

    return result;
  };

  const inputs = inputsGenerator(keyValues);

  const validationForm = generateValidationSchema(keyValues);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValuesPrimary}
        validationSchema={validationForm}
        onSubmit={(values: any, { resetForm }) => {
          handleSubmit(values, setTitleState, selectItem);
          resetForm();
        }}
      >
        {/* @ts-ignore */}
        {({ setFieldValue, errors, touched, values }) => (
          <Form className="formulario">
            <div className="col-12">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={24}>
                  {inputs.map((item) => (
                    <>{item}</>
                  ))}
                  <Row>
                    <div className="w-100">
                      <button type="submit">
                        <SaveOutlined />
                      </button>
                    </div>
                  </Row>
                </Col>
              </Row>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormAdd;
