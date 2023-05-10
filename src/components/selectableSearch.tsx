// @ts-ignore

import { searchIcon } from "../assets/icon/iconManager";
import { useState } from "react";
import { SelectableSearchHook } from "./hooks/selectableSearchHook";

import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Select, Space } from "antd";

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
                name={name}
                value={options ? options.find((option:any) => option.value === optionSelected) : ''}
                onChange={(option)=>{
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
    );
}

export default SelectableSearch;