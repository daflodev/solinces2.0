import { searchIcon } from "../../assets/icon/iconManager";
import { useState } from "react";

import { CloseCircleOutlined } from '@ant-design/icons';
import { Select, Space } from "antd";
import { SelectableSearchHook } from "../../../config/hooks/selectableSearchHook";
import "./selectTableSearch.css";

const SelectableSearch = ({
    onChange,
    options,
    filterOption,
    name,
    onClear,
}) => {

    const {
        // contextHolder,
        // language,
        mostrarInput,
        handleMostrarInput,
        handleOcultarInput,
      } = SelectableSearchHook();

      const [optionSelected, setOptionSelected] = useState(null);

    return (
        <div className="select-fk-global">
            <Space>
                {mostrarInput ? (
                    <div
                        className="mostrarOcultar"
                        onClick={() => {
                            setOptionSelected(null)
                            handleOcultarInput();
                            onClear(name);
                        }}
                    >
                        <CloseCircleOutlined />
                    </div>
                ) : (
                    <div className="mostrarOcultar" onClick={handleMostrarInput}>
                        {searchIcon}
                    </div>
                )}
        
                {mostrarInput ? (
                    <Select
                    options={options}
                    // @ts-ignore
                    name={name}
                    value={options ? options.find((option:any) => option.value === optionSelected) : ''}
                    onChange={(option: any)=>{
                        setOptionSelected(option)
                        onChange({
                            target: {
                                name: name, 
                                value: option}
                        })
                        
                    }}
                    placeholder={name.toLocaleLowerCase()}
                    filterOption={filterOption}
                    />
                ) : (
                    <>{name.toLocaleLowerCase() || ""}</>
                )}
            </Space>
        </div>
    );
}

export default SelectableSearch;