// @ts-ignore
import ".././modules/configuration/testing.css";
import { FC } from "react";
import { InputSearchHooks } from "./hooks/inputSearchHooks";

import { CloseCircleOutlined } from '@ant-design/icons';
import { Input, Space } from "antd";
import { searchIcon } from "../assets/icon/iconManager";

interface inputSearch {
  SearchFilter?: string;
  name: string;
  value: string;
  placeholder:string;
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  onChange: (e: any) => void;
  onClear: (nameInput: string) => void;
}

const InputSearch: FC<inputSearch> = ({
  SearchFilter,
  name,
  value,
  onChange,
  onClear,
  placeholder,
}) => {
  const {
    mostrarInput,
    handleMostrarInput,
    handleOcultarInput,
  } = InputSearchHooks();

  return (
    <Space>
      {mostrarInput ? (
        <div
          className="mostrarOcultar"
          onClick={() => {
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
 
 {mostrarInput ?<Input
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        /> :(
      <> { SearchFilter!!.toLocaleLowerCase()  || ""}</>
        ) }
      
       
        
    
    </Space>
  );
};

export { InputSearch };
