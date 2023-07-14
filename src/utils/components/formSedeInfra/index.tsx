// import "../../../utils/assets/styles/sedeInfra.css";

import { Col, Form, Input, Layout, Row, Select } from "antd";
import { saveIcon } from "../../assets/icon/iconManager";
import { useState } from "react";


interface infraProps {
    handleFormSubmit?: (values, onClick) => void;
    form?: any;
    initialValues?: any;
    dataselect?: any;
    onClick?: () => void;
}

const SedeInfraEstructuraFisica: React.FC<infraProps> = (props) => {
    // useEffect(()=>{
    //   apiGetFKTLV("ENCARGADO_LICENCIAS", setInitialValue)

    // },[])

    // const [selectedField, setSelectedField] = useState(null);

    // const handleFieldFocus = (fieldName) => {
    //     setSelectedField(fieldName);
    // };

    const [form] = Form.useForm();

    const [selectedValues, setSelectedValues] = useState({});

    const handleSelectChange = (value, field) => {
       
        console.log(field);
        setSelectedValues((prevSelectedValues) => ({
            selectedValues,
            ...prevSelectedValues,
            [field]: value,
        }));
        console.log(`Opción seleccionada en ${field}:`, value);
    };

    const filteredFields = Object.entries(props.initialValues).filter(
        ([fieldName]) => !fieldName.startsWith("FK")
    );

    const onFinish = (values) => {
        props.handleFormSubmit?.(values, props.onClick);
    };

    return (
        <>
            <Form
                className="formulario"
                disabled={false}
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                // form={props.form}
                initialValues={props.initialValues}
                form={form}
            >
                {" "}
                <Layout>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={8} xl={12}>
                            {filteredFields.map(([fieldName]) => (
                                <Form.Item key={fieldName} name={fieldName}>
                                    <Input
                                        maxLength={
                                            fieldName === "DISTANCIA_CABECERA_MUNICIPAL" ? 3 : 1
                                        }
                                    />
                                </Form.Item>
                            ))}
                        </Col>

                        <Col xs={24} lg={8} xl={12}>
                            <Layout>
                                {Object.entries(props.dataselect).map(([field, option]) => {
                                   
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
                        </Col>
                    </Row>

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
