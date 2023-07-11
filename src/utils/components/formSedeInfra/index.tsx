// import "../../../utils/assets/styles/sedeInfra.css";

import { Col, Form, Input, Layout, Row, Select } from "antd";
import { saveIcon } from "../../assets/icon/iconManager";
import { useSedeInfra } from "../../../modules/configuration/components/hooks/useSedeInfra";
import { FormEvent, useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";

interface infraProps {
    handleFormSubmit?:(event: FormEvent) => void;
    form?: any;
    initialValues?: any;
    dataselect?: any;
}

const SedeInfraEstructuraFisica: React.FC<infraProps> = (props) => {
    // useEffect(()=>{
    //   apiGetFKTLV("ENCARGADO_LICENCIAS", setInitialValue)

    // },[])

    const [selectedField, setSelectedField] = useState(null);

    const handleFieldFocus = (fieldName) => {
        setSelectedField(fieldName);
    };

    const [form] = Form.useForm();

    // const handleFormSubmit = (values) => {
    //     console.log("Valores del formulario:", values);
    //     // Realizar acciones adicionales con los valores del formulario si es necesario
    // };

    const [selectedValues, setSelectedValues] = useState({});

    const handleSelectChange = (value, field) => {
        setSelectedValues((prevSelectedValues) => ({
            ...prevSelectedValues,
            [field]: value,
        }));
        console.log(`Opción seleccionada en ${field}:`, value);
    };

    return (
        <>
        

                <Form
                    // labelCol={{ span: 4 }}
                    // wrapperCol={{ span: 14 }}
                    // layout="horizontal"
                    className="formulario"

                    disabled={false}
                    onFinish={props.handleFormSubmit}
                    style={{ maxWidth: 600 }}
                    // form={props.form}
                    initialValues={props.initialValues}
                    form={form}
                >   <Layout>
                   
                    <Row gutter={[16, 16]}>
                    <Col xs={24} lg={8} xl={12}>
                            {/* <div className="form-container">
                            <div className="form-column">
                                <div className="form-field"> */}
                            <Form.Item name="PC_LICENCIADOS">
                                <Input
                                    style={{ width: 100 }}
                                    onFocus={() =>
                                        handleFieldFocus(props.initialValues.PC_LICENCIADOS)
                                    }
                                    onBlur={() => handleFieldFocus(null)}
                                />
                                {/* <div
                                            className={`placeholder ${selectedField === "PC_LICENCIADOS" ||
                                                    (props.initialValues
                                                        ? props.initialValues.PC_LICENCIADOS != null
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
                                            PC_LICENCIADOS
                                        </div> */}
                            </Form.Item>



                            <Form.Item name="DISTANCIA_CABECERA_MUNICIPAL">
                                <Input style={{ width: 100 }} />
                                {/* <div
                                            className={`placeholder ${selectedField === "DISTANCIA_CABECERA_MUNICIPAL" ||
                                                    (props.initialValues
                                                        ? props.initialValues["DISTANCIA_CABECERA_MUNICIPAL"] != null
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
                                            DISTANCIA_CABECERA_MUNICIPAL
                                        </div> */}
                            </Form.Item>
                            <Form.Item name={"VIA_ACCESO_TRONCAL"}>
                                <Input style={{ width: 100 }} placeholder="via_acceso_troncal" />
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
                            </Form.Item>
                            {/*   </div>
                            </div>
                        </div> */}
                        </Col>
                     
                       
                        <Col xs={24} lg={8} xl={12}>   
                        <Layout>
                        {Object.entries(props.dataselect).map(([field, option]) => (
                            <Form.Item key={field} name={field}>
                                <Select
                                    value={selectedValues[field]}
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
                        ))} </Layout>
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
