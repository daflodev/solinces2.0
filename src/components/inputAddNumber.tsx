import { InputNumber } from "antd";

const InputAddNumber = ({
    field,
    form,
    InputConditions,
    placeholder
}) => {

    const insertSeparator = (number, maxLength, separatorCharacter = '', scale = 0) => {

        let invertNumber = number?.split('')?.reverse()?.join('');

        if(invertNumber?.length > maxLength){
            const noValidValues = invertNumber.length - maxLength;

            const validLengthValue = invertNumber?.substring(noValidValues)

            invertNumber = validLengthValue
        }

        const formateNumber = (n, maxStringLengthValue, scaleValue, s) => {

            const preScaleValue = maxStringLengthValue - invertNumber?.length

            if(preScaleValue < scaleValue && preScaleValue >= 0){

                const totalScaleValue = scaleValue - preScaleValue;

                const firstP = n?.substring(0, totalScaleValue)

                const secondP = n?.substring(totalScaleValue)
    
                return firstP + s + secondP
            }
        }

        const invertAnswer = (invertNumber?.length > (maxLength - scale) && scale != 0) ? formateNumber(invertNumber, maxLength, scale, separatorCharacter) : invertNumber;

        let answer = invertAnswer?.split('')?.reverse()?.join('')

        if(answer && maxLength == 6 && scale == 3 && parseFloat(answer) >= 100){

            answer = '100' + separatorCharacter + '00'
        }

        if(answer){
            return answer
        }else{
            return null
        }
    }

    const formattingValueWithPoint = (number, maxLength, separatorCharacter = '', scale = 0)=>{

        const splitByPoint = number.split('.');

        let firstNumberPart = splitByPoint[0];
        let secondNumberPart = splitByPoint[1];

        if(firstNumberPart?.length > (maxLength - scale)){
            const firstPartInvalidValues = firstNumberPart?.length - (maxLength - scale);

            firstNumberPart = firstNumberPart.substring(firstPartInvalidValues);
        }

        if(secondNumberPart?.length > scale){
            const secondPartInvalidValues = secondNumberPart?.length - scale;

            secondNumberPart = secondNumberPart.substring(secondPartInvalidValues);
        }

        if(secondNumberPart?.length > 0){

            return firstNumberPart + separatorCharacter + secondNumberPart
        }else{

            return firstNumberPart
        }
    }

    const onChange = (value) => {

        const processedValue = formattingNumberFunction(value, InputConditions, '.')

        form.setFieldValue(field.name, processedValue)
    };

    const formattingNumberFunction = (value, baseConditions, separator) => {

        const stringValue = value?.toString()?.trim();

        if(stringValue?.includes('.')){

            const formattedValueUserUsingPoint = formattingValueWithPoint(stringValue, baseConditions?.numeric_precision, separator, baseConditions?.numeric_scale);

            return formattedValueUserUsingPoint
        }else{
            const formattedNumber = insertSeparator(stringValue, baseConditions?.numeric_precision, separator, baseConditions?.numeric_scale);

            return formattedNumber
        }
    }

    return (
        <>
            <InputNumber
                style={{'width': '75%'}}
                name={field.name}
                formatter={(value) => formattingNumberFunction(value, InputConditions, '.')}
                onChange={onChange}
                onBlur={field.onBlur}
                step="1"
                min="0" //TODO: se debe ajustar a ser parametrizado, lo mismo para la propiedad max
                placeholder={placeholder}
            />
        </>
    )
}

export default InputAddNumber;