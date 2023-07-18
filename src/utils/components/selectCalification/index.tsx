import { Cascader } from "antd"
import { UseSelectCalification } from "./hooks/useSelectCalification";


export const SelectCalificationComponent = () => {

    const {
        options,
        onChange,
        loadData
    } = UseSelectCalification();

    return (
        <Cascader 
        options={options}
        loadData={loadData} 
        onChange={onChange}
        displayRender={label => label.join(' - ')}
        changeOnSelect />
    )

}