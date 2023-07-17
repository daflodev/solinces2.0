import { useEffect, useRef, useState } from "react";

import { sessionInformationStore } from "@/store/userInformationStore";
import { apiGetAllRoles, apiGetPermissionOptions, apiGetUserRoles, apiUpdateUserRoles } from "@/utils/services/api/thunks";
import { shallow } from "zustand/shallow";

import type { InputRef } from 'antd';

let index = 0;

export const TFuncionarioTPermissionGetDataHook  = (data?: any, rolesToAdd?: any, userID?: any) =>{
    const [items, setItems] = useState<any>(data ? data : null);
    const [rollOptions, setRollOptions] = useState<any>(rolesToAdd ? rolesToAdd : null);

    const [name, setName] = useState<any>(null);
    const [mainSelectStatus, setMainSelectStatus] = useState(false);

    const [rolSelectedToAddValue, setRolSelectedToAddValue] = useState(null);
    const [isRolSelectedToAddValueAvailable, setIsRolSelectedToAddValueAvailable] = useState(false);

    const [selectedRol, setSelectedRol] = useState<any>(null);
    const [selectedCampus, setSelectedCampus] = useState<any>(null);
    const[allowedMenuOptions, setAllowedMenuOptions] = useState<object[] | null>(null);
    const[notAllowedMenuOptions, setNotAllowedMenuOptions] = useState<object[] | null>(null);

    const currentTableCampusSelected = localStorage.getItem("campus");
    // console.log(currentTableCampusSelected,"DATA CURRENT CAMPUS")

    const { currentCampus , allCampus} = sessionInformationStore(
        (state) => ({
            currentCampus: state.currentCampus, 
            allCampus: state.allCampus,
        }),
        shallow
      );

    const dataDigestor = (dataToDigest) => {

        const answer = dataToDigest.map((item) => {

            return ({
                value: item?.PK_TROL,
                label: item?.CODIGO
            })
        })

        return answer;
    };

    const getUserRoles = async (userId) => {

        apiGetUserRoles(userId)
        .then((response: any) => {
            const processedData = dataDigestor(response.data);

            const findDuplicateRol = () => {
                const foundKeys = {};
                return processedData.reduce((acc, obj) => {
                  if (!foundKeys[obj.value]) {
                    foundKeys[obj.value] = true;
                    acc.push(obj);
                  }
                  return acc;
                }, []);
              };

            const filteredDuplicateRoles = findDuplicateRol()

            setItems(filteredDuplicateRoles);

            getRoles(filteredDuplicateRoles);

        })
        .catch(() => {
            //TODO: Manejo de log de errores
            //console.log("catch response: peticion all user roles FAIL!", error);
        });

    }

    const getRoles = (alreadyAddedRoles) => {

        apiGetAllRoles()
        .then((response: any) => {
            const processedData = dataDigestor(response.data);

            const alreadyIdRoles =  alreadyAddedRoles.map(objet => objet.value);

            const readyRolOptions = processedData.map((singleRol) => {

                const rolId = singleRol?.value;

                if(!alreadyIdRoles.includes(rolId)){
                    return singleRol;
                }
            });

            const filteredNoDefinedValues = readyRolOptions.filter(obj => obj !== undefined);
            setRollOptions(filteredNoDefinedValues  )
        })
        .catch(() => {
            //TODO: Manejo de log de errores
        });
    }

    const inputRef = useRef<InputRef>(null);

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {

        setIsRolSelectedToAddValueAvailable(true)

        const prepareValueToAdd =[
            {
                FK_TSEDE: currentTableCampusSelected == "usuario" ? selectedCampus : currentCampus?.value,
                FK_TROL: name?.value,
                FK_TUSUARIO: userID,
                TLV_ESTADO: "ACTIVO",
                BOOLEAN_FIELD: true
            }
            ];

        try {

            apiUpdateUserRoles(prepareValueToAdd).then(
                (answer)=>{

                    if(answer?.status != 402 && answer?.status != 400){
                        setMainSelectStatus(true);
                        e.preventDefault();
                        setItems([...items, name || `New item ${index++}`]);
                        setTimeout(() => {
                        inputRef.current?.focus();
                        }, 0);
                    }
                    
                    setName(null);
                    setRolSelectedToAddValue(null);
                    setIsRolSelectedToAddValueAvailable(false)
                }
            );
            
        } catch (error) {

            setIsRolSelectedToAddValueAvailable(false)
            //TODO: includes error a¡manager
        }
    };

    const answerGetPermissionDigestor = (answerGetPermission) =>{
        const allowedData: object[] = [];
        const notAllowedData: object[] = [];

        answerGetPermission?.map((menu)=>{

            if(!menu?.BOOLEAN_FIELD){

                let fatherAlreadyAddedToNotAlllowedCauseAChild = false;

                allowedData.push({
                    key: menu?.PK_TMENU, 
                    title:  menu?.NOMBRE
                });

                const subMenu = menu?.SUB_MENU;

                subMenu?.map((option)=>{

                    if(!option.BOOLEAN){

                        allowedData.push({
                            key: option?.PK_TMENU, 
                            title: option?.NOMBRE,
                            parent: menu?.PK_TMENU
                        });

                    }else{

                        if(!fatherAlreadyAddedToNotAlllowedCauseAChild){
                            notAllowedData.push({
                                key: menu?.PK_TMENU, 
                                title:  menu?.NOMBRE
                            });

                            fatherAlreadyAddedToNotAlllowedCauseAChild = true;
                        }

                        notAllowedData.push({
                            key: option?.PK_TMENU, 
                            title: option?.NOMBRE,
                            parent: menu?.PK_TMENU
                        });
                    }

                })

            }else{

                notAllowedData.push({
                    key: menu?.PK_TMENU, 
                    title:  menu?.NOMBRE
                });

                const subMenu = menu?.SUB_MENU;

                subMenu.map((option)=>{

                    notAllowedData.push({
                        key: option?.PK_TMENU, 
                        title: option?.NOMBRE,
                        parent: menu?.PK_TMENU
                    });
                })
            }

        })

        return{
            allowedData,
            notAllowedData
        }
    }

    const onChange = (value: string) => {
        // console.log(`selected ${value}`);
        setSelectedCampus(value)
    };
    
    useEffect(() => {

        if(selectedRol){
            setAllowedMenuOptions(null);
            setNotAllowedMenuOptions(null);


            (function(){
                apiGetPermissionOptions({
                    PK_TSEDE: selectedCampus != null ? selectedCampus : currentCampus?.value,
                    PK_TUSUARIO: userID,
                    PK_TROL: selectedRol?.value
                }).then(
                    (answer)=>{
                        const{ allowedData, notAllowedData} = answerGetPermissionDigestor(answer)

                        setAllowedMenuOptions(allowedData);
                        setNotAllowedMenuOptions(notAllowedData);
                    }
                ).catch((error) => {
                    //TODO: Manejo de log de errores

                    setAllowedMenuOptions([]);
                    setNotAllowedMenuOptions([]);
                    console.log('paso un error: ', error);
                });
            }());
        }
        
    }, [selectedRol, currentCampus, selectedCampus])

    return {
        items, setItems,
        rollOptions, setRollOptions,
        mainSelectStatus, setMainSelectStatus,
        rolSelectedToAddValue, setRolSelectedToAddValue,
        allowedMenuOptions,
        notAllowedMenuOptions,
        isRolSelectedToAddValueAvailable,
        selectedRol, setSelectedRol,
        getUserRoles,
        addItem,
        name,
        setName,
        currentCampus,
        setSelectedCampus,
        selectedCampus,
        allCampus,
        onChange
    }
}