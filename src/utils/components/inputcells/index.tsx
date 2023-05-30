import { Form, FormInstance, Popconfirm, Space, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { UseSettigns } from "../../../modules/configuration/components/hooks/useApp";
import { deleteIcon } from "../../assets/icon/iconManager";
export const EditableContext = React.createContext<FormInstance<any> | null>(
  null
);
interface EditableRowProps {
  index: number;
  record: { key: React.Key };
}
// funcion que crea el input de edicion en la misma celda
export const EditableRow: React.FC<EditableRowProps> = ({
  record,
  ...props
}) => {
  const [form] = Form.useForm();

  const { settingOptions, handleDelete } = UseSettigns();

  const [isHovered, setIsHovered] = useState(false);


  // const [hovered, setHovered] = useState(false);
  // const trRef = useRef(null);
  // const [trHeight, setTrHeight] = useState(0);

  // useEffect(() => {
  //   if (trRef.current) {
  //     setTrHeight(trRef.current.offsetHeight);
  //   }
  // }, []);

  // const handleMouseEnter = () => {
  //   setHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setHovered(false);
  // };

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
{/*        
        {settingOptions?.length >= 1 ? (
          <>
            {hovered && (
              <div
                className={`iconHover${hovered ? " active" : ""}`}
                style={{ height: trHeight }}
              >
                <div
                  className="prueba"
                  style={{
                    width: "10%",
                    background: "black",
                    position: "fixed",
                    right: 100,
                    height: "20px",
                  }}
                >
                  <Popconfirm
                    title="seguro desea eliminar?"
                    onConfirm={() => handleDelete(record.key)}
                  >
                    <div
                      className="iconDelete"
                      style={{ visibility: "hidden" }}
                    >
                      {deleteIcon}
                    </div>
                  </Popconfirm>
                </div>
              </div>
            )}
          </>
        ) : null}  */}
       <tr
          {...props}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          // ref={trRef}
        />
      </EditableContext.Provider>
    </Form>
  );
};
