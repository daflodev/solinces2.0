import { useEffect, useState } from "react";

import moment from 'moment-timezone';

export const EditableCellsHooks = (fkGroup, title) => {

    const [dataToSelect, setDataToSelect] = useState([]);

    const [editing, setEditing] = useState(false);

    const [editingValueDate, setEditingValueDate] = useState({editingDate: false, value: {}});


    const determinateIfIsSelected = (titleSelected: any) => {

      let answer = false;
  
      if (titleSelected) {
        const titleName = titleSelected?.props?.name;
        answer = (titleName.startsWith("FK_"));
      }
  
      return answer
    }

    const ifSelect = determinateIfIsSelected(title)

    const optionsManager = (data: any, columnName: any) => {

      let reBuilName = columnName?.replace("FK_T", "PK_T");

      if(reBuilName.includes('_PADRE')){
        reBuilName = reBuilName.replace('_PADRE', '')
      }

      if(reBuilName.includes('PK_TLV_') || reBuilName.includes('PK_TLISTA_VALOR_')){
        reBuilName = 'PK_TLISTA_VALOR'
      }

      // console.log("rebuild name: ", reBuilName)
  
      const options = data.map((item) => {
        return({
          value: item[reBuilName], label: item.NOMBRE
        })
      }) 

      // console.log("options: ", options)

      return options;
    };

    const getDefaultValue = (key: any, columnName: any) => {

      let reBuildName = columnName?.replace("FK_T", "PK_T");

      if(reBuildName.includes('_PADRE')){
        reBuildName = reBuildName.replace('_PADRE', '')
      }

      if(reBuildName.includes('PK_TLV_') || reBuildName.includes('PK_TLISTA_VALOR_')){
        reBuildName = 'PK_TLISTA_VALOR'
      }
  
      const result : any = dataToSelect.filter((item:any)=>{
        if (item[reBuildName] == key) {
          return item.NOMBRE;
        }
      })
  
      if (result.length > 0) {
        return result[0]?.NOMBRE;
      } else {
        return "Cargando...";
      }
    };

    const insertSeparator = (number: any, maxLength: any, separatorCharacter = '', scale = 0) => {
      let invertNumber = number?.split('')?.reverse()?.join('');

      if(invertNumber?.length > maxLength){
          const noValidValues = invertNumber.length - maxLength;

          const validLengthValue = invertNumber?.substring(noValidValues)

          invertNumber = validLengthValue
      }

      const formateNumber = (n: any, maxStringLengthValue: any, scaleValue: any, s: any) => {

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

    const formattingValueWithPoint = (number: any, maxLength: any, separatorCharacter = '', scale = 0)=>{

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

    const formattingNumberFunction = (value: any, baseConditions: any, separator: any) => {

      const stringValue = value?.toString()?.trim();

      if(stringValue?.includes('.')){

        const formattedValueUserUsingPoint = formattingValueWithPoint(stringValue, baseConditions?.numeric_precision, separator, baseConditions?.numeric_scale);

        return formattedValueUserUsingPoint
      }else{
        const formattedNumber = insertSeparator(stringValue, baseConditions?.numeric_precision, separator, baseConditions?.numeric_scale)

        return formattedNumber
      }
    }

    const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

    const buildDefaultValue = (date: any)=>{

      if(date.includes('T00:00:00.000Z')){

        const newFormattedDate = date.replace('T00:00:00.000Z', '')

        return newFormattedDate.split('-').reverse().join('/');

      }else{
        const timeZone = getTimeZone();

        const adjustedDate = moment.tz(date, 'America/Bogota').tz(timeZone).toDate();
  
        const formattedDate = new Intl.DateTimeFormat('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).format(new Date(adjustedDate));

        return formattedDate
      }

    }

    useEffect(() => {
      if (ifSelect) {
        const titleName = title?.props?.name;

        if(fkGroup[titleName]){
          setDataToSelect(fkGroup[titleName]);
        } 
      }
    }, [fkGroup])

    return {
        ifSelect,
        dataToSelect, 
        setDataToSelect,
        optionsManager,
        getDefaultValue,
        formattingNumberFunction,
        editing, 
        setEditing,
        buildDefaultValue,
        editingValueDate,
        setEditingValueDate
    }
}
