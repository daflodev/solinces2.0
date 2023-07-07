// import "../../../utils/assets/styles/sedeInfra.css";

import { Col, Form, Input, Row, Select } from "antd";
import { saveIcon } from "../../assets/icon/iconManager";
import { useSedeInfra } from "../../../modules/configuration/components/hooks/useSedeInfra";
import { useEffect, useState } from "react";

interface infraProps {
    onClick?: () => void;
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

    const handleFormSubmit = (values) => {
        console.log('Valores del formulario:', values);
        // Realizar acciones adicionales con los valores del formulario si es necesario
      };

    return (
        <>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                disabled={false}
                onFinish={handleFormSubmit}
                style={{ maxWidth: 600 }}
                // form={props.form}
                initialValues={props.initialValues}
                form={form}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        {/* <div className="form-container">
                            <div className="form-column">
                                <div className="form-field"> */}
                        <Form.Item name="PC_LICENCIADOS">
                            <Input
                               
                                style={{ width: 200 }}
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

                        <Form.Item name={"TERRENO_ZONA"}>
                            <Select
                                style={{ width: 200 }}
                                placeholder="Selecciona una opción"
                            >
                                {props.dataselect?.TERRENO_ZONA.map((item) => (
                                    <>
                                        <Select.Option value={item.CATEGORIA}>
                                            {item.NOMBRE}
                                        </Select.Option>
                                    </>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name={"SISTEMA_OPERATIVO"}>
                            <Select
                                style={{ width: 200 }}
                                placeholder="Selecciona una opción"
                            >
                                {props.dataselect?.SISTEMA_OPERATIVO.map((item) => (
                                    <>
                                        <Select.Option value={item.CATEGORIA}>
                                            {item.NOMBRE}
                                        </Select.Option>
                                    </>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="DISTANCIA_CABECERA_MUNICIPAL">
                            <Input style={{ width: 200 }} />
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
                            <Input    style={{ width: 200 }} placeholder="via_acceso_troncal" />
                        </Form.Item>
                        <Form.Item name={"VIA_ACCESO_RIO"}>
                            <Input  style={{ width: 200 }} placeholder="via_acceso_rio" />
                        </Form.Item>
                        <Form.Item name={"VIA_ACCESO_TRANSPORTE_ANIMAL"}>
                            <Input style={{ width: 200 }} placeholder="via_acceso_transporte_animal" />
                        </Form.Item>
                        <Form.Item name={"DESCRIPCION_OTRO_ACCESO"}>
                            <Input style={{ width: 200 }} placeholder="descripcion_otro_acceso" />
                        </Form.Item>

                        <Form.Item name={"ESTADO_INFRAESTRUCTURA"}>
                            <Select
                                style={{ width: 200 }}
                                placeholder="Selecciona una opción"
                            >
                                {props.dataselect?.ESTADO_INFRAESTRUCTURA.map((item) => (
                                    <>
                                        <Select.Option value={item.CATEGORIA}>
                                            {item.NOMBRE}
                                        </Select.Option>
                                    </>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name={"TIPO_AULA"}>
                            <Select
                                style={{ width: 200 }}
                                placeholder="Selecciona una opción"
                            >
                                {props.dataselect?.TIPO_AULA.map((item) => (
                                    <>
                                        <Select.Option value={item.CATEGORIA}>
                                            {item.NOMBRE}
                                        </Select.Option>
                                    </>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name={"ENCARGADO_LICENCIAS"}>
                            <Select
                                style={{ width: 200 }}
                                placeholder="Selecciona una opción"
                            >
                                {props.dataselect?.ENCARGADO_LICENCIAS.map((item) => (
                                    <>
                                        <Select.Option value={item.CATEGORIA}>
                                            {item.NOMBRE}
                                        </Select.Option>
                                    </>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name={"VIA_ACCESO_PRINCIPAL"}>
                            <Input style={{ width: 200 }} placeholder="via_acceso_principal" />
                        </Form.Item>
                        <Form.Item name={"VIA_ACCESO_CARRETEABLE"}>
                            <Input style={{ width: 200 }} placeholder="via_acceso_carreteable" />
                        </Form.Item>
                        <Form.Item name={"VIA_ACCESO_OTROS"}>
                            <Input style={{ width: 200 }} placeholder="via_acceso_otros" />
                        </Form.Item>
                        {/*   </div>
                            </div>
                        </div> */}
                    </Col>
                </Row>

                <Row justify="end">
                    <Form.Item>{saveIcon}</Form.Item>
                </Row>
            </Form>
        </>
    );
};

export default SedeInfraEstructuraFisica;
