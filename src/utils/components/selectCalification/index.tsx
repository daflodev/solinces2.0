import { Cascader, Col, Row, Select } from "antd"
import { UseSelectCalification } from "./hooks/useSelectCalification";


export const SelectCalificationComponent = () => {

    const {
        options,
        onChange,
        loadData,
        evaluacion,
        onChangeSelect,
    } = UseSelectCalification();
    

    return (
        <>
        <Row gutter={2}>
            <Col span={6}>
            <Cascader 
            options={options}
            loadData={loadData} 
            onChange={onChange}
            displayRender={label => label.join(' - ')}
            changeOnSelect />
            </Col>
            
            <Col style={{ marginLeft: '10px' }} span={6}>
            <Select
                allowClear
                options={evaluacion}
                onChange={onChangeSelect}
                />
            </Col>
        </Row>
        </>
        
    )

}