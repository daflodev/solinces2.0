//@ts-ignore
import { Select } from "antd";


const MultiSelectUserSettings = ({
    field,
    form,
    options,
    // @ts-ignore
    isMulti = false,
    placeholder = 'Select',
    filterOption
}) => {

    return (
        <div className='user_settings_select_input'>
            <Select
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
                showSearch={true}
            />
        </div>
    )
}

export default MultiSelectUserSettings;