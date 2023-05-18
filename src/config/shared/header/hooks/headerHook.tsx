import { useState } from "react";

import { CampusOptions } from "../headerGInterfaces";

import shallow from "zustand/shallow";
import { sessionInformationStore } from "../../../../store/userInformationStore";

export const HeaderHook = () => {
    const getItem : any =  localStorage.getItem("user_token_information") ?? null;
    const dataKCToken : any =  JSON.parse(getItem) ?? null;

    const [institutionsAndCampusOptions, setInstitutionsAndCampusOptions] = useState<CampusOptions[]>([])

    const { currentRol, currentInstitution, currentCampus } = sessionInformationStore(
        (state) => ({
            currentRol: state.currentRol,
            currentInstitution: state.currentInstitution,
            currentCampus: state.currentCampus
        }),
        shallow
    );

    const { updateValue } = sessionInformationStore();

    const onChangeCascaderHeaderFilter = (value: any, selectedOptions: any)=>{
        console.log("on the hook: ", value);

        console.log("on the hook selectedOptions: ", selectedOptions);

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
                        label: value?.nombre_sede,
                    }
                ); 

            }else{
                const formattedValue = {
                
                    value: value?.PK_TESTABLECIMIENTO,
                    label: value?.NOMBRE,
                    children: [
                        {
                            value: value?.PK_TSEDE,
                            label: value?.nombre_sede,
                        }
                    ]
                }
                
                response.push(formattedValue)
            }
        });

        return response;
    }

    return {
        institutionsAndCampusOptions,
        setInstitutionsAndCampusOptions,
        currentRol,
        currentInstitution,
        currentCampus,
        onChangeCascaderHeaderFilter,
        institutionAndCampusCaracterizationResponse,
        updateValue
    };
};