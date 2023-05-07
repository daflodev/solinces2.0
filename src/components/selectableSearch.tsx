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
                <Button
                    className="mostrarOcultar"
                    onClick={() => {
                        setOptionSelected(null)
                        handleOcultarInput();
                        onClear(name);
                    }}
                >
                    <CloseCircleOutlined />
                </Button>
            ) : (
                <Button className="mostrarOcultar" onClick={handleMostrarInput}>
                    {searchIcon}
                </Button>
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
                placeholder={name}
                filterOption={filterOption}
                />
            ) : (
                <>{name || ""}</>
            )}
        </Space>
    );
}

export default SelectableSearch;