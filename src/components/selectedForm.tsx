import { Select } from "antd";


const MultiSelect = ({
    field,
    form,
    options,
    isMulti = false,
    placeholder = 'Select',
    filterOption
}) => {

    return (
        <Select
            options={options}
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