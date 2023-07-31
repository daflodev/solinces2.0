import { useEffect, useState } from "react";

export const useEvaluationViewHook  = () =>{

    const optionsFromEvaluationView = ['tfinales', 'tinformes', 'tactividad_soporte', 'trecurso_compartido', 'tlogro', 'tasistencia', 'tactividad'];

    const [isOnEvaluationView, setIsOnEvaluationView] = useState(false);
    const [currentOptionName, setCurrentOptionName] = useState('');

    function verifyIsValidOption(validOptions, currentOption) {
        return validOptions.filter(item => item.includes(currentOption)).length > 0;
      }

    useEffect(() => {
        //TODO: limpiar los valores en zustand de lso selectores

        if(!isOnEvaluationView){
            console.log('limpiando los valores en el zustand...')
        }

    }, [isOnEvaluationView])

    useEffect(() => {

        const isValidOption = verifyIsValidOption(optionsFromEvaluationView, currentOptionName?.toLowerCase())

        if(isValidOption){
            setIsOnEvaluationView(true)
        }else{
            setIsOnEvaluationView(false)
        }
        
    }, [currentOptionName])

    return {
        isOnEvaluationView,
        setIsOnEvaluationView,
        currentOptionName,
        setCurrentOptionName
    }
}