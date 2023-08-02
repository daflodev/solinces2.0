// @ts-ignore
import "@/assets/styles/testing.css";
import { FC } from "react";

import { CloseCircleOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { InputSearchHooks } from "./inputSearchHooks.tsx";
import { searchIcon } from "@/assets/icon/iconManager.tsx";

interface inputSearch {
  SearchFilter?: string;
  name: string;
  value: string;
  placeholder: string;
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
  const { mostrarInput, handleMostrarInput, handleOcultarInput } =
    InputSearchHooks();

  return (
    <>
      {mostrarInput ? (
        <>
          <Space>
            <div
              className="mostrarOcultar"
              onClick={() => {
                handleOcultarInput();
                onClear(name);
              }}
            >
              <CloseCircleOutlined />
            </div>

            <Input
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={onChange}
            />
          </Space>
        </>
      ) : (
        <>
          <Space>
            <div className="mostrarOcultar" onClick={handleMostrarInput}>
              {searchIcon}
            </div>

            {SearchFilter?.toLocaleLowerCase() || ""}
          </Space>
        </>
      )}
    </>
  );
};

export { InputSearch };
