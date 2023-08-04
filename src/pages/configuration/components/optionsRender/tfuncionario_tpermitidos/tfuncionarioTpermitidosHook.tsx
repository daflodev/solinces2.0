/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

import { sessionInformationStore } from "@/store/userInformationStore";
import { apiGetAllRoles, apiGetPermissionOptions, apiGetUserRoles, apiUpdateUserRoles } from "@/services/api/thunks";
import { shallow } from "zustand/shallow";

import type { InputRef } from 'antd';
import { QueryBuilders } from "@/services/orm/queryBuilders";

let index = 0;

export const TFuncionarioTPermissionGetDataHook  = (data?: any, rolesToAdd?: any, userID?: any) =>{
    const [items, setItems] = useState<any>(data ? data : null);
    const [rollOptions, setRollOptions] = useState<any>(rolesToAdd ? rolesToAdd : null);

    const [userCampus, setUserCampus] = useState<any>(null)

    const [name, setName] = useState<any>(null);
    const [mainSelectStatus, setMainSelectStatus] = useState(false);

    const [nameCampus, setNameCampus] = useState<any>(null);
    const [mainSelectCampusStatus, setMainSelectCampusStatus] = useState(false);
    const [campusSelectedToAddValue, setCampusSelectedToAddValue] = useState(null);
    const [isCampusSelectedToAddValueAvailable, setIsCampusSelectedToAddValueAvailable] = useState(false);

    const [rolSelectedToAddValue, setRolSelectedToAddValue] = useState(null);
    const [isRolSelectedToAddValueAvailable, setIsRolSelectedToAddValueAvailable] = useState(false);

    const [selectedRol, setSelectedRol] = useState<any>(null);
    const [selectedCampus, setSelectedCampus] = useState<any>(null);
    const[allowedMenuOptions, setAllowedMenuOptions] = useState<object[] | null>(null);
    const[notAllowedMenuOptions, setNotAllowedMenuOptions] = useState<object[] | null>(null);

    let firstLoad = false;

    const currentTableCampusSelected = localStorage.getItem("campus");

    const tokenInformation = localStorage.getItem("user_token_information");
    const parserTokenInformation: any | null = tokenInformation
    ? JSON.parse(tokenInformation)
    : null;

    const query = new QueryBuilders("sede_usuario");

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

    const getUserRoles = async (userId, sedeId) => {

        apiGetUserRoles(userId, sedeId)
        .then((response: any) => {
            const processedData = dataDigestor(response);

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
            const processedData = dataDigestor(response);

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

    const proccesInformationCampus = (userCampusData: any) => {

        const answerCampus = userCampusData?.map(item => {

            const responseCampus = {
                
                label: item?.NOMBRE,
                value: item?.FK_TSEDE

            }

            return responseCampus;

        })

        return answerCampus;

    }
    
    const getUserCampus = async (userID) => {
        //TODO: Agregar Metodo Para Obtener Sede
        const schema =  parserTokenInformation?.dataSchema[0]

        const getDataTable = await query
            .select('*')
            .schema(schema)
            .join('sede', '"PK_TSEDE"', 'sede_usuario."FK_TSEDE"')
            .where("sede_usuario.\"FK_TUSUARIO\"", '=', userID)
            .get()

        const dataFunctionCampus = proccesInformationCampus(getDataTable)

        setUserCampus(dataFunctionCampus)

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

    const addItemCampus = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {

        /* setIsCampusSelectedToAddValueAvailable(true)

        const prepareValueCampusToAdd =[
            {
                FK_TSEDE: currentTableCampusSelected == "usuario" ? selectedCampus : currentCampus?.value,
                FK_TUSUARIO: userID,
                TLV_ESTADO: "ACTIVO",
                BOOLEAN_FIELD: true
            }
            ];

    try {

            apiUpdateUserRoles(prepareValueCampusToAdd).then(
                (answer)=>{

                    if(answer?.status != 402 && answer?.status != 400){
                        setMainSelectStatus(true);
                        e.preventDefault();
                        setItems([...userCampus, nameCampus || `New item ${index++}`]);
                        setTimeout(() => {
                        inputRef.current?.focus();
                        }, 0);
                    }
                    
                    setName(null);
                    setCampusSelectedToAddValue(null);
                    setIsCampusSelectedToAddValueAvailable(false)
                }
            );
            
        } catch (error) {

            setIsCampusSelectedToAddValueAvailable(false)
            //TODO: includes error a¡manager
        } */

        setMainSelectCampusStatus(true);
        e.preventDefault();
        setUserCampus([...userCampus, nameCampus || `New item ${index++}`]);
        setTimeout(() => {
        inputRef.current?.focus();
        }, 0);
        setNameCampus(null);
        setCampusSelectedToAddValue(null);
        setIsCampusSelectedToAddValueAvailable(false)
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
                ).catch(() => {
                    //TODO: Manejo de log de errores

                    setAllowedMenuOptions([]);
                    setNotAllowedMenuOptions([]);
                });
            }());
        }
        
    }, [selectedRol, currentCampus, selectedCampus])

    useEffect(() => {

        if(currentTableCampusSelected == "usuario" && userID && !firstLoad){
            firstLoad = true;
            getUserCampus(userID);
        }

    }, [])

    /* componentDidMount() {
        if(currentTableCampusSelected == "usuario" && userID){
            console.log(userID,"USER ID")
            getUserCampus(userID);
        }
    } */

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
        onChange,
        userCampus,
        mainSelectCampusStatus, 
        setMainSelectCampusStatus,
        campusSelectedToAddValue, 
        setCampusSelectedToAddValue,
        nameCampus, 
        setNameCampus,
        isCampusSelectedToAddValueAvailable, 
        setIsCampusSelectedToAddValueAvailable,
        addItemCampus,
    }
}