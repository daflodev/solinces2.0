import { Col, Form, Input, Layout, Row, Select } from "antd";
import { saveIcon } from "../../assets/icon/iconManager";
import { useState } from "react";


interface infraProps {
    handleFormSubmit?: (values, onClick, key) => void;
    initialValues?: any;
    dataselect?: any;
    onClick?: () => void;
    columnInfo?:any;
    record?: any;
}

const SedeInfraEstructuraFisica: React.FC<infraProps> = (props) => {
    // useEffect(()=>{
    //   apiGetFKTLV("ENCARGADO_LICENCIAS", setInitialValue)

    // },[])

    const [selectedField, setSelectedField] = useState(null);

    const handleFieldFocus = (fieldName) => {
        setSelectedField(fieldName);
    };



    const [selectedValues, setSelectedValues] = useState({});

    const handleSelectChange = (value, field) => {

        // console.log(field);
        setSelectedValues((prevSelectedValues) => ({
            selectedValues,
            ...prevSelectedValues,
            [field]: value,
        }));
        // console.log(`Opción seleccionada en ${field}:`, value);
    };

    // const filteredFields = Object.entries(props.initialValues).filter(
    //     ([fieldName]) => !fieldName.startsWith("FK")
    // );

    const onFinish = (values) => {
        props.handleFormSubmit?.(values, props.onClick, props.record);
    };

console.log(props.dataselect)

    const formItems = props.columnInfo?.map((fieldName) => {
        // console.log(props.dataselect[fieldName])
        const { column_name } = fieldName
        // console.log(column_name)
        if (column_name.startsWith('FK_TLV_')) {
            return (
                <div className="form-container">
                    {/* Primera columna */}
                    <div className="form-column">
                        <div className="form-field">

                            <Form.Item key={column_name} name={column_name}>
                                <Select onChange={(value) => handleSelectChange(value, column_name)} key={column_name}
                                    onFocus={() => handleFieldFocus(column_name)}
                                    onBlur={() => handleFieldFocus(null)}
                                >
                                    {props.dataselect[column_name]?.map((option) => (
                                        
                                        <Select.Option key={option.PK_TLISTA_VALOR} value={option.PK_TLISTA_VALOR}>
                                            {option.NOMBRE}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <div
                                className={`placeholder ${selectedField === column_name ||
                                    (props.initialValues
                                        ? props.initialValues[column_name] != null
                                        : false)
                                    ? "active"
                                    : ""
                                    }`}
                                style={{
                                    ...(props.initialValues[column_name] === null ?
                                        {
                                            width: "45%",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        } : { width: "40%" })

                                }}
                            >
                                {column_name}
                            </div>

                        </div>
                    </div>
                </div>

            );
        } else {
            return (
                <div className="form-container">
                    {/* Primera columna */}
                    <div className="form-column">
                        <div className="form-field">
                            <Form.Item key={column_name} name={column_name}>
                                <Input onFocus={() => handleFieldFocus(column_name)}
                                    onBlur={() => handleFieldFocus(null)} autoComplete="off" />
                            </Form.Item>
                            <div
                                className={`placeholder ${selectedField === column_name ||
                                    (props.initialValues
                                        ? props.initialValues[column_name] != null
                                        : false)
                                    ? "active"
                                    : ""
                                    }`}
                                style={{
                                    ...(props.initialValues[column_name] === null ?
                                        {
                                            width: "45%",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        } : { width: "40%" })

                                }}
                            >
                                {column_name}
                            </div>

                        </div>
                    </div>
                </div>
            );
        }
    });


    return (
        <>
            <Form
                className="formulario"
                disabled={false}
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                // form={props.form}
                initialValues={props.initialValues}

            >
                {" "}
                <Layout>

                    {/* {filteredFields.map(([fieldName]) => (
                                <Form.Item key={fieldName} name={fieldName}>
                                    <Input
                                        // maxLength={
                                        //     fieldName === "DISTANCIA_CABECERA_MUNICIPAL" ? 3 : 1
                                        // }
                                    />
                                </Form.Item>
                            ))} */}


                    <Row gutter={16}>

                        <Col span={12}>{formItems.slice(0, Math.ceil(formItems.length / 2))}</Col>
                        <Col span={12}>{formItems.slice(Math.ceil(formItems.length / 2))}</Col>
                    </Row>




                    {/* <Col xs={24} lg={8} xl={12}>
                            <Layout>
                                {Object?.entries(props.dataselect).map(([field, option]) => {
                                   
                                    return (
                                        <Form.Item key={field} name={`FK_TLV_${field}`}>
                                            <Select
                                                key={field}
                                                onChange={(value) => handleSelectChange(value, field)}
                                                style={{ width: 100 }}
                                                placeholder={field}
                                            >
                                                {option.map((option) => (
                                                    <Select.Option
                                                        value={option.PK_TLISTA_VALOR}
                                                        key={option.PK_TLISTA_VALOR}
                                                    >
                                                        {option.NOMBRE}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    );
                                })}{" "}
                            </Layout>
                        </Col> */}


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
                </Layout>
            </Form>
        </>
    );
};

export default SedeInfraEstructuraFisica;

{
    /* <Form.Item name="DISTANCIA_CABECERA_MUNICIPAL">
                                  <Input style={{ width: 100 }} />
                              
                              </Form.Item>
                              <Form.Item name={"VIA_ACCESO_TRONCAL"}>
                                  <Input
                                      style={{ width: 100 }}
                                      placeholder="via_acceso_troncal"
                                  />
                              </Form.Item>
                              <Form.Item name={"VIA_ACCESO_RIO"}>
                                  <Input style={{ width: 100 }} placeholder="via_acceso_rio" />
                              </Form.Item>
                              <Form.Item name={"VIA_ACCESO_TRANSPORTE_ANIMAL"}>
                                  <Input
                                      style={{ width: 100 }}
                                      placeholder="via_acceso_transporte_animal"
                                  />
                              </Form.Item>
                              <Form.Item name={"DESCRIPCION_OTRO_ACCESO"}>
                                  <Input
                                      style={{ width: 100 }}
                                      placeholder="descripcion_otro_acceso"
                                  />
                              </Form.Item>
  
                              <Form.Item name={"VIA_ACCESO_PRINCIPAL"}>
                                  <Input
                                      style={{ width: 100 }}
                                      placeholder="via_acceso_principal"
                                  />
                              </Form.Item>
                              <Form.Item name={"VIA_ACCESO_CARRETEABLE"}>
                                  <Input
                                      style={{ width: 100 }}
                                      placeholder="via_acceso_carreteable"
                                  />
                              </Form.Item>
                              <Form.Item name={"VIA_ACCESO_OTROS"}>
                                  <Input style={{ width: 100 }} placeholder="via_acceso_otros" />
                              </Form.Item> */
}
