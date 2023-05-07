// @ts-ignore

import { DatePicker } from "antd";


const DatePickerAddForm = ({
    field,
    form,
    placeholder = 'Select Date'
}) => {

    function formatDateISO8601(date) {
        const year = date.getUTCFullYear();
        const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
        const day = ('0' + date.getUTCDate()).slice(-2);
        const hours = ('0' + date.getUTCHours()).slice(-2);
        const minutes = ('0' + date.getUTCMinutes()).slice(-2);
        const seconds = ('0' + date.getUTCSeconds()).slice(-2);
        const milliseconds = ('00' + date.getUTCMilliseconds()).slice(-3);
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    }

    const onChange = (value) =>{

        const date = new Date(value);

        const newDate = formatDateISO8601(date)

        form.setFieldValue(field.name, newDate)
    }

    return (
        <DatePicker 
            label={placeholder} 
            format="DD/MM/YYYY"
            onChange={onChange}
            onBlur={field.onBlur}
        />
    )
}

export default DatePickerAddForm;