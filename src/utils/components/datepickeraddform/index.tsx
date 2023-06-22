import { DatePicker } from "antd";
import moment from "moment";


const DatePickerAddForm = ({
    field,
    form,
    placeholder = "select Date"
}) => {

    function formatDateISO8601(date: any) {
        const year = date.getUTCFullYear();
        const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
        const day = ('0' + date.getUTCDate()).slice(-2);
        const hours = ('0' + date.getUTCHours()).slice(-2);
        const minutes = ('0' + date.getUTCMinutes()).slice(-2);
        const seconds = ('0' + date.getUTCSeconds()).slice(-2);
        const milliseconds = ('00' + date.getUTCMilliseconds()).slice(-3);
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    }

    const onChange = (value: any) =>{

        const date = new Date(value);

        const newDate = formatDateISO8601(date)

        form.setFieldValue(field.name, newDate)
    }
    // @ts-ignore
    const handleDateChange = (value, setFieldValue) => {
        setFieldValue('fecha', value);
      };


    return (
        <DatePicker 
        {...field}
            placeholder={placeholder}
            format="DD/MM/YYYY"
            onChange={(value) => onChange(value)}
            value={field.value ? moment(field.value) : null}
          
            onBlur={field.onBlur}
        />
    )
}

export default DatePickerAddForm;