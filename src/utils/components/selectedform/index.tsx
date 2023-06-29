import { Select } from "antd";


const MultiSelect = ({
    field,
    form,
    options,
    // @ts-ignore
    isMulti = false,
    placeholder = '',
    filterOption,
    className,
}) => {

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
        />
    )
}

export default MultiSelect;
