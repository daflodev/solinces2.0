import { useEffect, useState } from "react";

export const useEvaluationViewHook  = () =>{

    const optionsFromEvaluationView = ['tfinales', 'tinformes', 'tactividad_soporte', 'trecurso_compartido', 'tlogro', 'tasistencia', 'tactividad'];

    const [isOnEvaluationView, setIsOnEvaluationView] = useState(false);
    const [currentOptionName, setCurrentOptionName] = useState<any>(null);

    function verifyIsValidOption(validOptions, currentOption) {
        
        const answer = validOptions.filter(item => item.includes(currentOption)).length > 0;

        return answer;
    }

    // useEffect(() => {
    //     //TODO: limpiar los valores en zustand de lso selectores

    //     if(!isOnEvaluationView){
    //         console.log('limpiando los valores en el zustand...')
    //     }

    // }, [isOnEvaluationView])

    useEffect(() => {

        const isValidOption = currentOptionName ? verifyIsValidOption(optionsFromEvaluationView, currentOptionName?.toLowerCase()) : false;

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