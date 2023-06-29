import { useState } from 'react';
import "./sedeInfra.css";
import {
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
    Typography
} from 'antd';
import { equisIcon, saveIcon } from '../../assets/icon/iconManager';


interface infraProps{
    onClick?: ()=> void;
}

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

const SedeInfraEstructuraFisica: React.FC<infraProps> = (props) => {

    const [ selectedData, setSelectedData ] = useState([]);
    const onSelectChange = (selectedRowKeys, selectedRows) => {
        setSelectedData(selectedRows);
    }

        const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

        return (
            <>
            <Row>
                <Col span={12}>
                    <Typography.Title level={3}>tsede_infraestructura</Typography.Title>
                </Col>
                <Col span={12}>
                    <Row justify="end">
                        <div onClick={props.onClick} style={{cursor: "pointer"}}>{equisIcon}</div>
                            
                        
                    </Row>
                </Col>
            </Row>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                disabled={componentDisabled}
                style={{ maxWidth: 600 }}
            >

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item>
                            <Input placeholder="pc_licenciados" style={{ width: '100%' }}/>
                        </Form.Item>
                        <Form.Item>
                            <Select placeholder="fk_tlv_terrena_zona">
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Select placeholder="fk_tlv_sistema_operativo">
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="distancia_cabecera_municipal" />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="via_acceso_troncal" />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="via_acceso_rio" />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="via_acceso_transporte_animal" />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="descripcion_otro_acceso" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item>
                            <Select placeholder="fk_tlv_estado_infraestructura">
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Select placeholder="fk_tlv_tipo_aula">
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Select placeholder="fk_tlv_encargado_licencias">
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="fk_tsede" />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="via_acceso_principal" />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="via_acceso_carreteable" />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="via_acceso_otros" />
                        </Form.Item>
                    </Col>
                </Row>

            <Row justify="end">
                <Form.Item>
                    {saveIcon}
                </Form.Item>
            </Row>
            </Form>
        </>
    )

};

export default SedeInfraEstructuraFisica;
