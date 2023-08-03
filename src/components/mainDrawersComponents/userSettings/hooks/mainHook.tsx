/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

import { message } from 'antd';

import { apiGetThunksAsync, apiPostThunksAsync, apiPostPasswordChange } from "@/services/api/thunks.ts";

import { mainDrawerStore } from "../../../../store/mainDrawerStore.ts";

export const mainHook = () =>{

   
    const [bloodType, setBloodType] = useState<object[]>([]);
    const [municipalResidence, setMunicipalResidence] = useState<object[]>([]);
    const [documentType, setDocumentType] = useState<object[]>([]);

    const [initialValuesUser, setInitialValuesUser] = useState<object | null>(null);

    const [currentPasswordErrorMessageState, setCurrentPasswordErrorMessageState] = useState(false);
    const [newPasswordErrorMessageState, setNewPasswordErrorMessageState] = useState(false);
    const [verifyNewPasswordErrorMessageState, setVerifyNewPasswordErrorMessageState] = useState(false);

    const [pktUser, setPktUser] = useState<string>('')

    const tokenInformation = localStorage.getItem('user_token_information');
    const parserTokenInformation: any | null = tokenInformation ? JSON.parse(tokenInformation) : null;

    const { close } = mainDrawerStore()

    const [messageApi, contextHolder] = message.useMessage();

    function changeKey(
        json: Record<string, any>,
        llaveActual: string,
        nuevaLlave: string
        ): Record<string, any> {
            if (json.hasOwnProperty(llaveActual)) {
                json[nuevaLlave] = json[llaveActual];
                delete json[llaveActual];
            }
            return json;
        }

    const apiGetFK = async (nameTable:any) => {
        const prevData = {
            base: "",
            schema: parserTokenInformation?.dataSchema[0],
        };
    
        const getdata = changeKey(prevData, "base", nameTable);
    
        const getDataTable = await apiGetThunksAsync(getdata).then((response) => {
            //@ts-ignore
            const { getdata } = response
    
            const res = getdata
            return res
        });
        return getDataTable
        };

    const apiGetFKTLV = async (nameTable: any) => {

        const formatedName = nameTable.toUpperCase();

        const prevData = {
            base: "",
            schema: parserTokenInformation?.dataSchema[0],
            where: { "lista_valor.CATEGORIA": `'${formatedName}'` }
        };

        const getdata = changeKey(prevData, "base", 'lista_valor');

        const getDataTable = await apiGetThunksAsync(getdata).then((response) => {
            //@ts-ignore
            const { getdata } = response

            const res = getdata
            return res
        });
        return getDataTable
    };

    const apiGetInstitutionsAndCampus = async () => {
        const prevData = { 
            "usuario": "",
            "where": { "usuario.CUENTA": `'${parserTokenInformation?.preferred_username}'` },
            "schema":parserTokenInformation?.dataSchema[0]
        }

        const getDataTable = await apiGetThunksAsync(prevData).then((response) => {
            
            //@ts-ignore
            const {getdata} = response;

            const userData = getdata[0];

            const initialUserInformation = {
                primer_nombre: userData.PRIMER_NOMBRE ? userData.PRIMER_NOMBRE : '',
                segundo_nombre: userData.SEGUNDO_NOMBRE ? userData.SEGUNDO_NOMBRE : '',
                primer_apellido: userData.PRIMER_APELLIDO ? userData.PRIMER_APELLIDO : '',
                segundo_apellido: userData.SEGUNDO_APELLIDO ? userData.SEGUNDO_APELLIDO : '',
                tipo_identificacion: userData.FK_TTIPO_DOCUMENTO ? userData.FK_TTIPO_DOCUMENTO : '',
                municipio: userData.FK_TMUNICIPIO_RESIDENCIA ? userData.FK_TMUNICIPIO_RESIDENCIA : '',
                tipo_sangre: userData.FK_TLV_TIPO_SANGRE ? userData.FK_TLV_TIPO_SANGRE : '',
                numero_identificacion: userData.IDENTIFICACION ? userData.IDENTIFICACION : '',
                telefono: userData.TELEFONO ? userData.TELEFONO : '',
                correo_electronico: userData.CORREO_ELECTRONICO ? userData.CORREO_ELECTRONICO : '',
                current_password: '',
                new_password: '',
                verify_new_password: '',
            }

            setInitialValuesUser(initialUserInformation)

            setPktUser(userData?.PK_TUSUARIO)

            return response
        });
        return getDataTable
    };

    const handleSubmitUserSettings = async (
        values:any,
    ) => {

        const getdata = {
            update_usuario: values,
            where: {
                PK_TUSUARIO: pktUser
            },
            schema: parserTokenInformation?.dataSchema[0]
        }

        setInitialValuesUser(null)

        await apiPostThunksAsync(getdata)
        .then((response) => {
            if (response.success == "OK") {

                messageApi.open({
                    type: 'success',
                    content: 'Los datos fueron actualizados correctamente',
                    duration: 2
                });
            }

            if(response.status == 400){

                const messageResponse = response?.data?.message;   
                
                if(messageResponse.includes("already exists")){

                    messageApi.open({
                        type: 'warning',
                        content: 'Uno o mas campos de valores unicos ya se encuentran registrado.',
                        duration: 2
                    });
                }else{

                    messageApi.open({
                        type: 'error',
                        content: 'Ocurrio un error inesperado, intentelo mas tarde.',
                        duration: 2
                    });
                }
            }
        })
        .catch(()=>{
            messageApi.open({
                type: 'error',
                content: 'Ocurrio un error inesperado, intentelo mas tarde.',
                duration: 2
            });

        })
        .finally(() => {

            setTimeout( () =>
                close()
            , 2500);
        });
    };

    const handleSubmitUserPasswordChange = async (
        values:any,
    ) => {

        const getdata = {
            credentials:[
                {
                    type:"password",
                    value: values.new
                }
            ]
        
        }

        setInitialValuesUser(null)

        await apiPostPasswordChange(getdata)
        .then((response) => {
            if (response.success == "OK") {

                messageApi.open({
                    type: 'success',
                    content: 'Los datos fueron actualizados correctamente',
                    duration: 2
                });
            }

            if(response.status == 400){

                const messageResponse = response?.data?.message;   
                
                if(messageResponse.includes("already exists")){

                    messageApi.open({
                        type: 'warning',
                        content: 'Uno o mas campos de valores unicos ya se encuentran registrado.',
                        duration: 2
                    });
                }else{

                    messageApi.open({
                        type: 'error',
                        content: 'Ocurrio un error inesperado, intentelo mas tarde.',
                        duration: 2
                    });
                }
            }
        })
        .catch(()=>{
            messageApi.open({
                type: 'error',
                content: 'Ocurrio un error inesperado, intentelo mas tarde.',
                duration: 2
            });

        })
        .finally(() => {

            setTimeout( () =>
                close()
            , 2500);
        });
    };

    useEffect(() => {
        apiGetInstitutionsAndCampus();

        apiGetFK('tipo_documento').then((response) => {

            let processedDocumentTypeData: object[] = [];

            response.map((item) => {
                const processedItem = {
                    value: item?.PK_TTIPO_DOCUMENTO,
                    label: item?.CODIGO
                }

                processedDocumentTypeData.push(processedItem)
            })

            setDocumentType(processedDocumentTypeData)
        });

        apiGetFK('municipio').then((response) => {

            let processedMunicipio: object[] = [];

            response.map((item) => {
                const processedItem = {
                    value: item?.PK_TMUNICIPIO,
                    label: item?.NOMBRE
                }

                processedMunicipio.push(processedItem)
            })

            setMunicipalResidence(processedMunicipio)
        });

        apiGetFKTLV('tipo_sangre').then((response) =>{

            let processedBloodType: object[] = [];

            response.map((item) => {
                const processedItem = {
                    value: item?.PK_TLISTA_VALOR,
                    label: item?.VALOR
                }

                processedBloodType.push(processedItem)
            })

            setBloodType(processedBloodType)
        })
    }, []);

    return {
        bloodType, 
        municipalResidence,
        documentType, 
        parserTokenInformation,
        initialValuesUser,
        handleSubmitUserSettings,
        mainDrawerStore,
        contextHolder,
        currentPasswordErrorMessageState, setCurrentPasswordErrorMessageState,
        newPasswordErrorMessageState, setNewPasswordErrorMessageState,
        verifyNewPasswordErrorMessageState, setVerifyNewPasswordErrorMessageState,
        handleSubmitUserPasswordChange
    }
}