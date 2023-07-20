import { Select } from "antd";
import { useEffect } from "react";


const MultiSelect = ({
    field,
    form,
    options,
    // @ts-ignore
    isMulti = false,
    placeholder = '',
    filterOption,
    className,
    defaultValue = null,
    isBloqued = false,
}) => {

    useEffect(()=>{
        if(isBloqued){
            // console.log('ariel pagame')
            form.setFieldValue(field.name, parseInt(defaultValue!!))
        }
    }, [])
   

    return (
        <Select
            className={className}
            options={options}
            // @ts-ignore
            name={field.name}
            value={options ? options.find((option: any) => option.value === field.value) : ''}
            onChange={(option: any) => {
                form.setFieldValue(field.name, option)
            }}
            onBlur={field.onBlur}
            placeholder={placeholder}
            filterOption={filterOption}
            disabled={isBloqued}
            defaultValue={ defaultValue != null ? parseInt(defaultValue) : null}   
        />
    )
}

export default MultiSelect;
