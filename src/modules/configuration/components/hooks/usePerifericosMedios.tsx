import { useState } from "react";
import {
    apiFKThunksAsyncSedeInfra,
    apiGetThunksAsyncSedeInfra,
    apiGetThunksAsyncSedePeripherals,
    apiPostThunksAsyncPeripherals,
    apiPostThunksAsyncSedeInfra,
    // apiPostThunksAsyncSedeInfra,
    apiPutSedeInfra,
    apiPutSedePeripherals,
} from "../../../../utils/services/api/thunks";
import { Form, message } from "antd";

import _ from "lodash";

export const useSedePerifericos = () => {
    // const tokenInformation = localStorage.getItem("user_token_information");
    // const parserTokenInformation: any | null = tokenInformation
    //   ? JSON.parse(tokenInformation)
    //   : null;

    const [dataSedePerifericos, setDataSedePerifericos] = useState<any>({});
    const [initialValuesPerifericos, setInitialValuesPerifericos] = useState<any>(
        {}
    );
    const [dataSelectPerifericos, setDataSelectPerifericos] = useState<any>();

    const [form] = Form.useForm();
    const [messageApi, contextHolderPerifericos] = message.useMessage();

    const fkTlvCategoria = ["'ALCANCE_EMISORA'", "'TIPO_BIBLIOTECA'"];

    const infraFKDataPerifericos = async () => {
        try {
            const response = await apiFKThunksAsyncSedeInfra(fkTlvCategoria);
            const predata = response.data;

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

    const perifericosSedeGetData = async (record) => {
        // const getPK = record["PK_TSEDE"]
        await apiGetThunksAsyncSedePeripherals(record.PK_TSEDE)
            .then((response) => {
                if (response) {
                    // console.log(response.data[0], "data")
                    const preData = response.data[0];

                    // console.log(preData, "mergeData");
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
                        TIENE_VIDEOBEAM: preData.TIENE_VIDEOBEAM
                            ? preData.TIENE_VIDEOBEAM
                            : null,
                    });
                }
            })

            .catch((error) => {
                console.log("catch response: ", error);
            });
    };
    const handleFormSubmitPerifericos = async (values, cerrarTable) => {
        // console.log("Valores del formulario:", values);
        const dataForm = values;

        const convertedData = {
            data: { ...dataForm, FK_TSEDE: dataSedePerifericos.FK_TSEDE },
        };

        let statusValue = false;

        // initialValuesPerifericosTec.map((item) => {
        //     if (item != null) {
        //         statusValue = true
        //     }
        // })

        for (let propiedad in initialValuesPerifericos) {
            if (initialValuesPerifericos.hasOwnProperty(propiedad)) {
                console.log(
                    `La propiedad ${propiedad} tiene el valor ${initialValuesPerifericos[propiedad]}`
                );
                if (initialValuesPerifericos[propiedad] != null) {
                    statusValue = true;
                    break;
                }
            }
        }

        if (statusValue) {
            await apiPutSedePeripherals(
                dataSedePerifericos.FK_TSEDE,
                convertedData.data
            )
                .then((response) => {
                    if (response.data.status === "success") {
                        apiGetThunksAsyncSedePeripherals(dataSedePerifericos.FK_TSEDE);
                        messageApi.open({
                            type: "success",
                            content: "se ha modificado las infraestructura fisica a la sede",
                        });

                        setTimeout(() => {
                            cerrarTable();
                        }, 2000);
                    } else {
                        messageApi.open({
                            type: "error",
                            content:
                                "no se pudo hacer editar la infraestructura fisica de la sede",
                        });
                    }

                    return response;
                })
                .catch((error) => {
                    console.log("Error al obtener los datos actualizados:", error);
                });
        } else {
            await apiPostThunksAsyncPeripherals(convertedData.data).then(
                (response) => {
                    if (response.data.status === "success") {
                        apiGetThunksAsyncSedeInfra(dataSedePerifericos.FK_TSEDE);
                    }
                }
            );
        }

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
        infraFKDataPerifericos,
        handleFormSubmitPerifericos,
        contextHolderPerifericos,
        setDataSedePerifericos,
    };
};
