import { useState } from "react";
import {
    apiFKThunksAsyncSedeInfra,
    apiGetThunksAsyncSedeInfra,
    apiGetThunksAsyncSedePeripherals,
    apiPostThunksAsyncPeripherals,

    // apiPostThunksAsyncSedeInfra
    apiPutSedePeripherals,
} from "../../../../utils/services/api/thunks";
import { Form, message } from "antd";

import _ from "lodash";
import { QueryBuilders } from "@/utils/orm/queryBuilders";

export const useSedePerifericos = () => {
    const tokenInformation = localStorage.getItem("user_token_information");
    const parserTokenInformation: any | null = tokenInformation
        ? JSON.parse(tokenInformation)
        : null;

    const [dataSedePerifericos, setDataSedePerifericos] = useState<any>({});
    const [initialValuesPerifericos, setInitialValuesPerifericos] = useState<any>(
        {}
    );
    const [colunmFieldPerifericos, setColumnFieldPerifericos] = useState<any>([]);
    const [dataSelectPerifericos, setDataSelectPerifericos] = useState<any>();

    const [form] = Form.useForm();
    const [messageApi, contextHolderPerifericos] = message.useMessage();

    const fkTlvCategoria = ["'ALCANCE_EMISORA'", "'TIPO_BIBLIOTECA'"];

    const FKDataPerifericos = async () => {
        try {
            const response = await apiFKThunksAsyncSedeInfra(fkTlvCategoria);
            const predata = response;

            setDataSelectPerifericos(predata);

            return predata;
        } catch (error) {
            console.log("catch response: ", error);
            return null;
        }
    };
    // Agrupar por la propiedad 'categoria'
    const agrupados = _.groupBy(dataSelectPerifericos, "CATEGORIA");

    // Imprimir los resultadoPerifericoss
    // Crear un objeto final con el nombre de la categoría como llave
    const resultadoPerifericos = {};
    Object.entries(agrupados).forEach(([categoria, productos]) => {
        // if(categoria ===  )
        resultadoPerifericos[`FK_TLV_${categoria}`] = productos;
        // console.log(resultadoPerifericos, "resultadoPerifericos");
    });

    const columInfoPerifericos = async (key_table) => {
        const query = new QueryBuilders("sede_perifericos_medios");

        // const getdata = changeKey(dataSede, "base", "sede_infraestructura");

        const getDataTable = await query
            .select(["*"])
            .where('sede_perifericos_medios."FK_TSEDE"', "=", key_table?.PK_TSEDE)
            .schema(parserTokenInformation?.dataSchema[0])
            .columninfo();

        const preData = Object.values(getDataTable);
        const filteredData = preData.filter(
            (obj) =>
                obj.column_name !== "FK_TSEDE" &&
                obj.column_name !== "AUTHOR_RC" &&
                obj.column_name !== "CLIENTS_RC"
        );

        console.log(filteredData, "COLUMN_INFO");
        setColumnFieldPerifericos(filteredData);
    };

    const perifericosSedeGetData = async (key_table) => {
        const query = new QueryBuilders("sede_perifericos_medios");

        const getDataTable = await query
            .select(["*"])
            .where('sede_perifericos_medios."FK_TSEDE"', "=", key_table?.PK_TSEDE)
            .schema(parserTokenInformation?.dataSchema[0])
            .get();
        const preData = getDataTable[0];
        console.log(preData);
        setDataSedePerifericos(preData);
        setInitialValuesPerifericos({
            FK_TLV_ALCANCE_EMISORA: preData.FK_TLV_ALCANCE_EMISORA
                ? preData.FK_TLV_ALCANCE_EMISORA
                : null,
            FK_TLV_TIPO_BIBLIOTECA: preData.FK_TLV_TIPO_BIBLIOTECA
                ? preData.FK_TLV_TIPO_BIBLIOTECA
                : null,
            NUMERO_DVD: preData.NUMERO_DVD ? preData.NUMERO_DVD : null,
            NUMERO_LINEA_TELEFONICA: preData.NUMERO_LINEA_TELEFONICA
                ? preData.NUMERO_LINEA_TELEFONICA
                : null,
            NUMERO_PROYECTORES_ACETATOS: preData.NUMERO_PROYECTORES_ACETATOS
                ? preData.NUMERO_PROYECTORES_ACETATOS
                : null,
            NUMERO_TELEVISORES: preData.NUMERO_TELEVISORES
                ? preData.NUMERO_TELEVISORES
                : null,
            NUMERO_UPS: preData.NUMERO_UPS ? preData.NUMERO_UPS : null,
            NUMERO_VHS: preData.NUMERO_VHS ? preData.NUMERO_VHS : null,
            NUMERO_VIDEOBEAM: preData.NUMERO_VIDEOBEAM
                ? preData.NUMERO_VIDEOBEAM
                : null,
            NUMERO_VIDEO_CAMARAS: preData.NUMERO_VIDEO_CAMARAS
                ? preData.NUMERO_VIDEO_CAMARAS
                : null,
            TIENEN_BIBLIOTECA: preData.TIENEN_BIBLIOTECA
                ? preData.TIENEN_BIBLIOTECA
                : null,
            TIENEN_DVD: preData.TIENEN_DVD ? preData.TIENEN_DVD : null,
            TIENEN_EMISORA_ESTUDIANTIL: preData.TIENEN_EMISORA_ESTUDIANTIL
                ? preData.TIENEN_EMISORA_ESTUDIANTIL
                : null,
            TIENEN_PERIODICO_ESTUDIANTIL: preData.TIENEN_PERIODICO_ESTUDIANTIL
                ? preData.TIENEN_PERIODICO_ESTUDIANTIL
                : null,
            TIENEN_TELEVISORES: preData.TIENEN_TELEVISORES
                ? preData.TIENEN_TELEVISORES
                : null,
            TIENEN_VHS: preData.TIENEN_VHS ? preData.TIENEN_VHS : null,
            TIENEN_VIDEO_CAMARA: preData.TIENEN_VIDEO_CAMARA
                ? preData.TIENEN_VIDEO_CAMARA
                : null,
            TIENE_LINEA_TELEFONICA: preData.TIENE_LINEA_TELEFONICA
                ? preData.TIENE_LINEA_TELEFONICA
                : null,
            TIENE_PROYECTOR_ACETATOS: preData.TIENE_PROYECTOR_ACETATOS
                ? preData.TIENE_PROYECTOR_ACETATOS
                : null,
            TIENE_RADIO: preData.TIENE_RADIO ? preData.TIENE_RADIO : null,
            TIENE_UPS: preData.TIENE_UPS ? preData.TIENE_UPS : null,
            TIENE_VIDEOBEAM: preData.TIENE_VIDEOBEAM ? preData.TIENE_VIDEOBEAM : null,
        });
    };



    const isValuesEmpty = (values: any) => {
        return Object.values(values).every(value => value === null || value === undefined);
    };

    const handleFormSubmitPerifericos = async (values: any, cerrarTable: any, record: any) => {
        const updateForm = new QueryBuilders('sede_infraestructura');
        if (isValuesEmpty(values)) {

            await updateForm.create(values).schema(parserTokenInformation?.dataSchema[0]).save();
            // console.log(results);
            setTimeout(() => {
                cerrarTable();
            }, 2000);

        } else {
            // If values are not empty, perform the update operation
            await updateForm.update(values)
                .where('"FK_TSEDE"', '=', record)
                .schema(parserTokenInformation?.dataSchema[0])
                .save()
                .then((response) => {
                    console.log(response)
                    let isSuccess = false;

                    for (const key in response) {
                        if (Object.hasOwnProperty.call(response, key)) {
                            const value = response[key];
                            console.log(`${key}: ${value}`);

                            if (key === 'message' && value === 'Success') {
                                isSuccess = true;
                                break;
                            }
                        }
                    }

                    if (isSuccess) {
                        console.log('La solicitud fue exitosa.');
                        messageApi.open({
                            type: "success",
                            content: "se ha modificado la perifericos medios a la sede",
                        });

                        setTimeout(() => {
                            cerrarTable();
                        }, 2000);
                    } else {
                        console.log('La solicitud no fue exitosa.');
                        messageApi.open({
                            type: "error",
                            content:
                                "no se pudo hacer editar perifericos medios  de la sede",
                        });
                        setTimeout(() => {
                            cerrarTable();
                        }, 2000);
                    }


                })
        }

        setInitialValuesPerifericos(values);

        // const dataForm = values;

        // const convertedData = {
        //   data: { ...dataForm, FK_TSEDE: initialValues.FK_TSEDE },
        // };

        // let statusValue = false;

        // // initialValuesTec.map((item) => {
        // //     if (item != null) {
        // //         statusValue = true
        // //     }
        // // })

        // for (let propiedad in initialValues) {
        //   if (initialValues.hasOwnProperty(propiedad)) {
        //     // console.log(`La propiedad ${propiedad} tiene el valor ${initialValues[propiedad]}`);
        //     if (initialValues[propiedad] != null) {
        //       statusValue = true;
        //       break;
        //     }
        //   }
        // }

        // if (statusValue) {
        //   await apiPutSedeInfra(dataSedeInfra.FK_TSEDE, convertedData.data)
        //     .then((response) => {
        //       if (response.data.status === "success") {
        //         apiGetThunksAsyncSedeInfra(dataSedeInfra.FK_TSEDE);
        //         messageApi.open({
        //           type: "success",
        //           content: "se ha modificado las infraestructura fisica a la sede",
        //         });

        //         setTimeout(() => {
        //           cerrarTable();
        //         }, 2000);
        //       } else {
        //         messageApi.open({
        //           type: "error",
        //           content:
        //             "no se pudo editar la infraestructura fisica de la sede",
        //         });
        //       }

        //       return response;
        //     })
        //     .catch((error) => {
        //       console.log("Error al obtener los datos actualizados:", error);
        //     });
        // } else {
        //   await apiPostThunksAsyncSedeInfra(convertedData.data).then((response) => {
        //     if (response.data.status === "success") {
        //       apiGetThunksAsyncSedeInfra(dataSedeInfra.FK_TSEDE);
        //     }
        //   });
        // }

        //     // Realizar acciones adicionales con los valores del formulario si es necesario
    };

    return {
        // apiGetFKTLV,
        form,
        dataSedePerifericos,
        perifericosSedeGetData,
        initialValuesPerifericos,
        dataSelectPerifericos,
        resultadoPerifericos,
        FKDataPerifericos,
        handleFormSubmitPerifericos,
        contextHolderPerifericos,
        setDataSedePerifericos,
        columInfoPerifericos,
        colunmFieldPerifericos,
    };
};
