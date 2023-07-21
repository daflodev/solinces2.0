import { Cascader, Select } from "antd"
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
            <Cascader 
            options={options}
            loadData={loadData} 
            onChange={onChange}
            displayRender={label => label.join(' - ')}
            changeOnSelect />

            <Select
                style={{ width: 120 }}
                allowClear
                options={evaluacion}
                onChange={onChangeSelect}
                />
        </>
        
    )

}