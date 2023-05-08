import React from "react";
import "../modules/configuration/testing.css";
import { EditableCellsHooks } from "./hooks/editableCellsHooks";
import { FC, useEffect, useContext, useRef } from "react";
import { EditableContext } from "./inputCells";

//interface de tipado para pasar por props los datos editado
interface EditableCellProps {
  title: any;
  editable: boolean;
  children: React.ReactNode;
  //dataIndex: keyof Item;
  dataIndex: any;
  //record: Item;
  record: any;
  //save: (record: Item) => void;
  save: (record: any) => void;
}

import moment from 'moment-timezone';

import 'moment/locale/es';
import { Form, DatePicker, Input, InputNumber, InputRef, Select } from "antd";

const columnConditionsExtractor = (allColumnInformation:any, columnName:any) => {

  const columnQualitiesInformation = allColumnInformation?.filter((itemColumn:any) => itemColumn?.column_name == columnName)

  if(columnQualitiesInformation && columnQualitiesInformation.length > 0){
    return columnQualitiesInformation[0]
  }

}

export const EditableCell= ({
  title,
  editable,
  children,
  dataIndex,
  record,
  save,
  fkGroup,
  itemsColumnsInformation,
  ...restProps
}) => {

  const {
    ifSelect,
    dataToSelect,
    optionsManager,
    getDefaultValue,
    formattingNumberFunction,
    editing, 
    setEditing,
    buildDefaultValue,
    editingValueDate,
    setEditingValueDate
  } = EditableCellsHooks(fkGroup, title)

  const columnInformation = columnConditionsExtractor(itemsColumnsInformation, title?.props?.name)

  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  // setea los datos del campo de edicion
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const selectEditableInputType = (isSelectableData:any ,dataInformation:any) =>{

    let renderValue = <></>;

    if(isSelectableData){
      renderValue = (
        dataToSelect ? (
          <Select
            ref={inputRef}
            onPressEnter={()=>save(form, record, toggleEdit, children)}
            onBlur={()=>save(form, record, toggleEdit, children)}
            options={optionsManager(dataToSelect, title?.props?.name)}            />
        ) : (
          <p> Cargando ...</p>
        )
      )

      return renderValue
    }

    if(dataInformation?.data_type === "character varying" && !isSelectableData){
      
      renderValue = (
        <Input 
          ref={inputRef} 
          onPressEnter={()=>save(form, record, toggleEdit, children)} 
          onBlur={()=>save(form, record, toggleEdit, children)}
          maxLength={dataInformation?.longitud}
        />
      )

      return renderValue
    }

    if((dataInformation?.data_type === "integer" || dataInformation?.data_type === "numeric") && !isSelectableData){

      renderValue = (
        <InputNumber
            ref={inputRef}
            formatter={(value: any) => formattingNumberFunction(value, dataInformation,'.')}
            onBlur={()=> {
              save(form, record, toggleEdit, children)
            }}
            onPressEnter={()=>{
              save(form, record, toggleEdit, children)
            }}
            step="1"
            min="1" //TODO: se debe ajustar a ser parametrizado, lo mismo para la propiedad max
            precision={2}
            onChange={(value: any)=>{
              const formattedValue = formattingNumberFunction(value, dataInformation,'.')

              form.setFieldValue(title?.props?.name, formattedValue)
            }}
        />
      )


      return renderValue
    }

    return <Input ref={inputRef} onPressEnter={()=>save(form, record, toggleEdit, children)} onBlur={()=>save(form, record, toggleEdit, children)} />

  }

  const switchBetweenDatePickerAndFormItem = ()=>{

    if(columnInformation?.data_type === "date"){

      const defaultDateValue = buildDefaultValue(children[1]);

      return (
        <DatePicker
            format="DD/MM/YYYY"
            onChange={(value:any) => {
              const date = new Date(value);

              const newDate = moment(date).tz('America/Bogota').format();

              setEditingValueDate({editingDate: true, value:{[title?.props?.name]: newDate}})
            }}
            onBlur={()=> {
              save(editingValueDate, record, toggleEdit, children)
            }}
            onPressEnter={()=>{
              save(editingValueDate, record, toggleEdit, children)
            }}
            locale={moment.locale('es')}
        />
      )

    }else{
      return( <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: children[1] ? true : false,
            message: "Este campo es requerido.",
          },{
            pattern:  /^\S(.*\S)?$/,
            message: "formato no valido"
          }
        ]}
      >
        {selectEditableInputType(ifSelect, columnInformation)}
      </Form.Item>)
    }
  }

  let childNode = children;
  //valida si el input esta vacio el input
  if (editable) {
    childNode = editing ? (switchBetweenDatePickerAndFormItem()) : (
      <div
        className="editable-cell-value-wrap"
        style={!children[1] &&  (columnInformation?.is_nullable === 'YES') ? {
          'position': "absolute",
          'top': 0,
          'left': 0,
          'width': "100%",
          'height': "100%",
          'opacity': 0,
          'pointerEvents': "auto"
        } : { paddingRight: 24 }}
        onClick={toggleEdit}
        onKeyDown={toggleEdit}
      >
        { !children[1] &&  (columnInformation?.is_nullable === 'YES') ?
            'No assigned value'
            :
            (ifSelect ? getDefaultValue(children[1], title?.props?.name) : (
              columnInformation?.data_type === "date" ? buildDefaultValue(children[1]) : children
              )) }
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
