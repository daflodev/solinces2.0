import { useState } from "react";
import { message } from "antd";

import { sessionInformationStore } from "@/store/userInformationStore";
import shallow from "zustand/shallow";

import { apiUpdatePermissionOptions } from '@/utils/services/api/thunks';

export const TransferComponentHook  = (fullData, noPermissionFullData) =>{

    const [optionsColumnData, setOptionsColumnData] = useState(fullData)
    const [noPermissionColumnData, setNoPermissionColumnData] = useState(noPermissionFullData)

    const [previousCheckedList, setPreviousCheckedList] = useState<any>([]);
    const [checkedList, setCheckedList] = useState<any>([]);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [rightSearchBarValue, setRightSearchBarValue] = useState('');

    const [previousCheckedListNoPermission, setPreviousCheckedListNoPermission] = useState<any>([]);
    const [checkedListNoPermission, setCheckedListNoPermission] = useState<any>([]);
    const [indeterminateNoPermission, setIndeterminateNoPermission] = useState(false);
    const [checkAllNoPermission, setCheckAllNoPermission] = useState(false);
    const [leftSearchBarValue, setLeftSearchBarValue] = useState('');

    const { currentCampus } = sessionInformationStore(
        (state) => ({
            currentCampus: state.currentCampus,
        }),
        shallow
      );

    const [messageApi, contextHolder] = message.useMessage();

    const filterProcess = (filterValue ,theData) => {

        if(filterValue?.length > 0){

            const answer = theData.map((data)=>{

                const wold = data?.title.toLowerCase();

                if(wold?.includes(filterValue.toLowerCase())){
                    if(!data?.parent){

                        const childAnswered = theData?.filter(object => {
                            if(object?.parent == data?.key){
                                return object
                            }
                        }).map(item => item.key);
                    
                        childAnswered?.push(data.key)

                        return(childAnswered)
                    }else{

                        return([data?.key, data?.parent])
                    }
                }
            })
            
            const preProcessAnswer = [...new Set(answer?.flat(Infinity))]

            const processAnswer =theData.filter(objet => preProcessAnswer?.includes(objet.key));

            return processAnswer;
        }else{
            return theData;
        }
    };

    const toCheckedAll = (theData, filterValue) =>{

        const filteredData = filterProcess(filterValue ,theData);

        const answer = filteredData.map((item)=> item.key);

        return answer
    }

    const addParentElementToCheck = (previousList, theData) => {

        const parentsSelected = previousList.map((item) =>{

            const preElements = theData.filter(object => object.key == item);

            const element = preElements[0];

            if(!element.parent){
                const childAnswered = theData.filter(object => {
                    if(object?.parent == element.key){
                        return object
                    }
                }).map(item => item.key);

                childAnswered.push(element.key)

                return childAnswered;
            }else{
                return element.key;
            }
        });

        return parentsSelected;
    }

    const verifyParentsAndChildAreUnchecked = (previousCheckedList, newCheckedList, theData) => {

        const retiredElements = previousCheckedList.filter(element => !newCheckedList.includes(element));

        const chidWillRetired = retiredElements.map((item) =>{

            const preElements = theData.filter(object => object.key == item);

            const element = preElements[0];

            if(!element.parent){
                const childAnswered = theData.filter(object => {
                    if(object?.parent == element.key){
                        return object
                    }
                }).map(item => item.key);

                childAnswered.push(element.key)

                return childAnswered;
            }
        });

        const digestChidWillRetired = [...new Set(chidWillRetired.flat(Infinity))]

        const answer = newCheckedList.filter(element => !digestChidWillRetired.includes(element));

        return answer;
    }

    const onChange = (list) => {

        const newList = addParentElementToCheck(list, optionsColumnData)

        const newListPreProcessed = newList.flat(Infinity);

        const newListProcessed = [...new Set(newListPreProcessed)]; 


        const verifyChildListElements = verifyParentsAndChildAreUnchecked(previousCheckedList, newListProcessed, optionsColumnData)

        setPreviousCheckedList(verifyChildListElements)

        setCheckedList(verifyChildListElements);
        setIndeterminate(!!verifyChildListElements.length && verifyChildListElements.length < optionsColumnData.length);

        const filteredData = filterProcess(rightSearchBarValue ,optionsColumnData)

        setCheckAll(verifyChildListElements.length === filteredData.length);
    };

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? toCheckedAll(optionsColumnData, rightSearchBarValue) : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const onChangeNoPermission = (list) => {

        const newList = addParentElementToCheck(list, noPermissionColumnData)

        const newListPreProcessed = newList.flat(Infinity);

        const newListProcessed = [...new Set(newListPreProcessed)]; 


        const verifyChildListElements = verifyParentsAndChildAreUnchecked(previousCheckedListNoPermission, newListProcessed, noPermissionColumnData)

        setPreviousCheckedListNoPermission(verifyChildListElements);

        setCheckedListNoPermission(verifyChildListElements);
        setIndeterminateNoPermission(!!verifyChildListElements.length && verifyChildListElements.length < noPermissionColumnData.length);

        const filteredData = filterProcess(leftSearchBarValue ,noPermissionColumnData)
        setCheckAllNoPermission(verifyChildListElements.length === filteredData.length);
    };
    const onCheckAllChangeNoPermission = (e) => {
        setCheckedListNoPermission(e.target.checked ? toCheckedAll(noPermissionColumnData, leftSearchBarValue) : []);
        setIndeterminateNoPermission(false);
        setCheckAllNoPermission(e.target.checked);
    };

    const obtainParentsAndElementsSelected = (previousList, theData) => {

        const parentsSelected = previousList.map((item) =>{

            const preElements = theData.filter(object => object.key == item);

            const element = preElements[0];

            if(!element.parent){
                const childAnswered = theData.filter(object => {
                    if(object?.parent == element.key){
                        return object
                    }
                }).map(item => item.key);

                childAnswered.push(element.key)

                return childAnswered;
            }else{
                return [element.key, element.parent];
            }
        });

        return parentsSelected;
    }

    const transferElementFunction = (selectedElements, setSelectedElements, fullDestinationData, fullExtractionData, setFunctionDestination, setFunctionExtraction) =>{
        const elementsToAdd = obtainParentsAndElementsSelected(selectedElements, fullExtractionData);

        const digestElementsToAdd = [...new Set(elementsToAdd.flat(Infinity))];

        const cloneFullExtractionData = [...fullExtractionData];

        const fullExtractionDataElementsExtracted = cloneFullExtractionData.filter(objet => {

            if(!objet.parent){
                const childAnswered = cloneFullExtractionData.filter(element => {
                    if(element?.parent == objet.key){
                        return element
                    }
                }).map(item => item.key);

                const childrenToExtract = childAnswered.map((child)=>{
                    if(digestElementsToAdd.includes(child)){
                        return child
                    }
                });

                if((childrenToExtract.filter(element => element !== undefined)).length != (childAnswered.filter(element => element !== undefined)).length){
                    return objet
                }

            }else{

                if(!digestElementsToAdd.includes(objet.key)){
                    return objet;
                }
            }
        });

        const dataExtracted = cloneFullExtractionData.filter(objet => digestElementsToAdd.includes(objet.key));

        const cloneFullDestinationData = [...fullDestinationData];

        const newFullDestinationData = cloneFullDestinationData.concat(
            dataExtracted.filter(obj2 => !cloneFullDestinationData.some(obj1 => obj1.key === obj2.key)));

        setPreviousCheckedList([])

        setPreviousCheckedListNoPermission([])

        setSelectedElements([])

        setFunctionExtraction(fullExtractionDataElementsExtracted);

        setFunctionDestination(newFullDestinationData);

    };

    const loadingUpdate = () => {
        messageApi.open({
          type: 'loading',
          content: 'Action in progress..',
          duration: 0,
        });
      };

    const processOptionsToSent = (allowedOptions, notAllowedOptions, userID, currentRol) =>{

        const notAllowedParentFiltered = notAllowedOptions?.filter(notAllowed => {
            return !allowedOptions?.some(allowed => allowed?.key == notAllowed?.key)
        })

        const formattedAllowedOptions = allowedOptions?.map(option => {

            const answer = {
                PK_TSEDE: currentCampus?.value ? parseInt(currentCampus.value): null,
                PK_TUSUARIO: userID,
                PK_TMENU: option?.key,
                PK_TROL: currentRol?.value,
                BOOLEAN_FIELD: false
            }

            return answer
        })

        const formattedNotAllowedOptions = notAllowedParentFiltered?.map(option => {

            const answer = {
                PK_TSEDE: currentCampus?.value ? parseInt(currentCampus.value): null,
                PK_TUSUARIO: userID,
                PK_TMENU: option?.key,
                PK_TROL: currentRol?.value,
                BOOLEAN_FIELD: true
            }

            return answer
        })

        return formattedAllowedOptions?.concat(formattedNotAllowedOptions)

    }

    const updatePermissions = (allowedOptions, notAllowedOptions,userID, currentRol) =>{

        messageApi.open({
            type: 'loading',
            content: 'Actualizando permisos...',
            duration: 0,
            key: 'updatePermissions'
          });

        const formatedAllowedAndNotAllowedOptions = processOptionsToSent(allowedOptions, notAllowedOptions, userID, currentRol)

        try {

            apiUpdatePermissionOptions(formatedAllowedAndNotAllowedOptions).then(
                () => {
                    messageApi.destroy('updatePermissions')

                    messageApi.open({
                        type: 'success',
                        content: 'Permisos actualizados correctamente',
                      });
                }
            )
            
        } catch (error) {
            //TODO: manejo de errores
            messageApi.destroy('updatePermissions')

            messageApi.open({
                type: 'error',
                content: 'Ocurrio un error inesperado, intentelo nuevamente',
            });
        }
    }

    return {
        checkedList, setCheckedList,
        indeterminate, setIndeterminate,
        checkAll, setCheckAll,
        checkedListNoPermission, setCheckedListNoPermission,
        indeterminateNoPermission, setIndeterminateNoPermission,
        checkAllNoPermission, setCheckAllNoPermission,
        onChange,
        onCheckAllChange,
        onChangeNoPermission,
        onCheckAllChangeNoPermission,
        optionsColumnData,
        noPermissionColumnData,
        transferElementFunction,
        setOptionsColumnData,
        setNoPermissionColumnData,
        rightSearchBarValue, setRightSearchBarValue,
        leftSearchBarValue, setLeftSearchBarValue,
        filterProcess,
        updatePermissions,
        contextHolder
    }
}
