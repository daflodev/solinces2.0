import { InputNumber } from "antd";

const NumericInputUserSettings = ({
    field,
    form,
    placeholder,
    defaultValue = ''
}) => {

    const onChange = (value: any) => {

        form.setFieldValue(field.name, value);
    };

    return (
        <div className='user_settings_numeric_input'>
            <InputNumber
                name={field.name}
                onChange={onChange}
                onBlur={field.onBlur}
                step="1"
                min="0"
                placeholder={placeholder}
                defaultValue={defaultValue}
            />
        </div>
    )
}

export default NumericInputUserSettings;