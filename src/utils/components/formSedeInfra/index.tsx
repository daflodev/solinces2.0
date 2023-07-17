import "../../../utils/assets/styles/sedeInfra.css";

import {
    Col,
    Form,
    Input,
    Row,
    Select,

} from 'antd';
import { saveIcon } from '../../assets/icon/iconManager';

interface infraProps{
    onClick?: ()=> void;
}


const SedeInfraEstructuraFisica: React.FC<infraProps> = () => {

    
    

      

        

        return (
            <>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                disabled={false}
                style={{ maxWidth: 600 }}
            >

                <Row gutter={16} >
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