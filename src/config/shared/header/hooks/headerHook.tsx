import { useState } from "react";

import { AcademicPeriodAndEvaluatePeriodOptions, CampusOptions } from "../headerGInterfaces";

import { shallow } from 'zustand/shallow'
import { sessionInformationStore } from "../../../../store/userInformationStore";

export const HeaderHook = () => {

    const [institutionsAndCampusOptions, setInstitutionsAndCampusOptions] = useState<CampusOptions[]>([])

    const [academicPeriodOptions, setAcademicPeriodOptions] = useState<AcademicPeriodAndEvaluatePeriodOptions[]>([])
    const [isLoadingAcademicPeriodOptions, setIsLoadingAcademicPeriodOptions] = useState<boolean>(true)

    const [evaluatePeriodOptions, setEvaluatePeriodOptions] = useState<AcademicPeriodAndEvaluatePeriodOptions[]>([])
    const [isLoadingEvaluatePeriodOptions, setIsIsLoadingEvaluatePeriodOptions] = useState<boolean>(true)

    const { currentRol, currentInstitution, currentCampus, currentAcademicYear, currentAcademicPeriod } = sessionInformationStore(
        (state) => ({
            currentRol: state.currentRol,
            currentInstitution: state.currentInstitution,
            currentCampus: state.currentCampus,
            currentAcademicYear: state.currentAcademicYear,
            currentAcademicPeriod: state.currentAcademicPeriod
        }),
        shallow
    );
    
    const { updateValue, addToArray, clearArray } = sessionInformationStore();

    const capitalizeWords = (str) => {
        return str
            ?.toLowerCase()
            ?.split(" ")
            ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
            ?.join(" ");
    };
    // @ts-ignore
    const onChangeCascaderHeaderFilter = (value: any, selectedOptions: any)=>{

        const newCampusSelected = {
            label: selectedOptions[1].label,
            value: selectedOptions[1].value.toString()
        }

        const newInstitutionSelected = {
            label: selectedOptions[0].label,
            value: selectedOptions[0].value.toString()
        }

        updateValue([{
            element: 'currentCampus',
            value: newCampusSelected
        },{
            element: 'currentInstitution',
            value: newInstitutionSelected
        }])
    }

    const onChangeAcademicYear = (value: any) => {
        localStorage.setItem('currentAcademicYear', value )
        updateValue({
            element: 'currentAcademicYear',
            value: value
        })

        return(value)
    }

    const onChangeAcademicPeriod = (value: any) => {

        updateValue({
            element: 'currentAcademicPeriod',
            value: value
        })

        return(value)
    }

    const institutionAndCampusCaracterizationResponse = (dataResponse) => {

        let response: CampusOptions[] = [];

        dataResponse.map((value)=>{

            const institutionAlreadyExist = response.findIndex((item) => {
                return item?.value === value?.PK_TESTABLECIMIENTO;
            });

            if(institutionAlreadyExist !== -1){

                response[institutionAlreadyExist].children!.push(
                    {
                        value: value?.PK_TSEDE,
                        label: capitalizeWords(value?.nombre_sede),
                    }
                ); 

            }else{
                const formattedValue = {
                
                    value: value?.PK_TESTABLECIMIENTO,
                    label: value?.NOMBRE,
                    children: [
                        {
                            value: value?.PK_TSEDE,
                            label: capitalizeWords(value?.nombre_sede),
                        }
                    ]
                }
                
                response.push(formattedValue)
            }
        });

        return response;
    };

    const academicPeriodResponseDigestor = (dataResponse) =>{

        let response: AcademicPeriodAndEvaluatePeriodOptions[] = [];

        dataResponse.map((value) => {

            if(value?.PK_TPERIODO_ACADEMICO !== null && value?.NOMBRE !== null){
                const processedValue = {
                    key: value?.PK_TPERIODO_ACADEMICO,
                    label: value?.NOMBRE
                }
    
                response.push(processedValue)
            }
        })

        return(response)
    };

    const academicPeriodPeriodResponseDigestor = (dataResponse) =>{

        let response: AcademicPeriodAndEvaluatePeriodOptions[] = [];

        dataResponse.map((value) => {

            const processedValue = {
                key: value?.PK_TPERIODO_EVALUACION,
                label: capitalizeWords(value?.nombre_periodo_evaluacion)
            }

            response.push(processedValue)
        })

        return(response)
    };

    return {
        institutionsAndCampusOptions,
        setInstitutionsAndCampusOptions,
        academicPeriodOptions, 
        setAcademicPeriodOptions,
        evaluatePeriodOptions, 
        setEvaluatePeriodOptions,
        currentRol,
        currentInstitution,
        currentCampus,
        currentAcademicPeriod,
        currentAcademicYear,
        onChangeCascaderHeaderFilter,
        institutionAndCampusCaracterizationResponse,
        academicPeriodResponseDigestor,
        academicPeriodPeriodResponseDigestor,
        updateValue,
        onChangeAcademicYear,
        onChangeAcademicPeriod,
        isLoadingAcademicPeriodOptions,
        setIsLoadingAcademicPeriodOptions,
        isLoadingEvaluatePeriodOptions,
        setIsIsLoadingEvaluatePeriodOptions,
        addToArray,
        clearArray,
    };
};