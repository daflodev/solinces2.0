import { useEffect, useState } from "react";
import {
    apiFKThunksAsyncSedeInfra,
   
    apiGetThunksAsyncSedeTecnology,
    apiPutSedeTecnology,
} from "../../../../utils/services/api/thunks";
import { QueryBuilders } from "../../../../utils/orm/queryBuilders";
import { Form } from "antd";

import _ from "lodash";
// import { apiPostThunksAsyncSedeJornada } from "../../../../utils/services/api/thunks";

export const useSedeTecnology = () => {
    // const tokenInformation = localStorage.getItem("user_token_information");
    // const parserTokenInformation: any | null = tokenInformation
    //   ? JSON.parse(tokenInformation)
    //   : null;

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

   

    //data table for items list FK_TLV
    const [dataSedeTecnology, setDataSedeTecnology] = useState<any>({});
    const [initialValuesTec, setInitialValuesTec] = useState<any>({});
    const [dataSeelectTec, setDataSelectTec] = useState<any>();

    const [form] = Form.useForm();

    const fkTlvCategoria = [
        "'ESTADO_TecnologyESTRUCTURA'",
        "'TERRENA_ZONA'",
        "'TIPO_AULA'",
        "'SISTEMA_OPERATIVO'",
        "'ENCARGADO_LICENCIAS'",
    ];

    const TecnologyFKData = async () => {
        try {
            const response = await apiFKThunksAsyncSedeInfra(fkTlvCategoria);
            const predata = response.data;

            setDataSelectTec(predata);

            return predata;
        } catch (error) {
            console.log("catch response: ", error);
            return null;
        }
    };
    // Agrupar por la propiedad 'categoria'
    const agrupados = _.groupBy(dataSeelectTec, "CATEGORIA");

    // Imprimir los resultados
    // Crear un objeto final con el nombre de la categoría como llave
    const resultado = {};
    Object.entries(agrupados).forEach(([categoria, productos]) => {
        resultado[categoria] = productos;
        // console.log(resultado, "resultado");
    });

    const TecnologySedeGetData = async (record) => {
        // const getPK = record["PK_TSEDE"]
        await apiGetThunksAsyncSedeTecnology(record.PK_TSEDE)
            .then((response) => {
                if (response) {
                    // console.log(response.data[0], "data")
                    const preData = response.data[0];

                    // console.log(preData, "mergeData");
                    setDataSedeTecnology(preData);
                    setInitialValuesTec({
                        N_EQUIPO_RED: preData.N_EQUIPO_RED
                            ? preData.N_EQUIPO_RED
                            : null,
                        N_RED_DATOS: preData.N_RED_DATOS
                            ? preData.N_RED_DATOS
                            : null,
                        N_EQUIPO_ADMIN: preData.N_EQUIPO_ADMIN
                            ? preData.N_EQUIPO_ADMIN
                            : null,
                        N_EQUIPO_PROCESADOR_CON_486: preData.N_EQUIPO_PROCESADOR_CON_486
                            ? preData.N_EQUIPO_PROCESADOR_CON_486
                            : null,
                        N_AULA_INFORMATICA: preData.N_AULA_INFORMATICA
                            ? preData.N_AULA_INFORMATICA
                            : null,
                        N_PUNTOS_RED_DATO_HABILITADO: preData.N_PUNTOS_RED_DATO_HABILITADO
                            ? preData.N_PUNTOS_RED_DATO_HABILITADO
                            : null,
                        COSTO_MENSUAL_INTERNET: preData.COSTO_MENSUAL_INTERNET
                            ? preData.COSTO_MENSUAL_INTERNET
                            : null,
                        N_EQUIPO_EDU: preData.N_EQUIPO_EDU
                            ? preData.N_EQUIPO_EDU
                            : null,
                        N_EQUIPO_POCESADOR_INF_486: preData.N_EQUIPO_POCESADOR_INF_486
                            ? preData.N_EQUIPO_POCESADOR_INF_486
                            : null,
                            N_EQUIPO_POCESADOR_SUP_486: preData.N_EQUIPO_POCESADOR_SUP_486
                            ? preData.N_EQUIPO_POCESADOR_SUP_486
                            : null,
                            SUMINISTRO_ENERGIA: preData.SUMINISTRO_ENERGIA
                            ? preData.SUMINISTRO_ENERGIA
                            : null,
                        // FK_TLV_ESTADO_TecnologyESTRUCTURA: preData.FK_TLV_ESTADO_TecnologyESTRUCTURA
                        //     ? preData.FK_TLV_ESTADO_TecnologyESTRUCTURA
                        //     : null,
                        // FK_TLV_TERRENA_ZONA: preData.FK_TLV_TERRENA_ZONA
                        //     ? preData.FK_TLV_TERRENA_ZONA
                        //     : null,
                        // FK_TLV_TIPO_AULA: preData.FK_TLV_TIPO_AULA
                        //     ? preData.FK_TLV_TIPO_AULA
                        //     : null,
                        // FK_TLV_SISTEMA_OPERATIVO: preData.FK_TLV_SISTEMA_OPERATIVO
                        //     ? preData.FK_TLV_SISTEMA_OPERATIVO
                        //     : null,
                        // FK_TLV_ENCARGADO_LICENCIAS: preData.FK_TLV_ENCARGADO_LICENCIAS
                        //     ? preData.FK_TLV_ENCARGADO_LICENCIAS
                        //     : null,
                    });
                }
            })

            .catch((error) => {
                console.log("catch response: ", error);
            });
    };
    const handleFormSubmit = async (values) => {
        // console.log("Valores del formulario:", values);
        const dataForm = values;

        const convertedData = {
            data: { ...dataForm, FK_TSEDE: dataSedeTecnology.FK_TSEDE },
        };

        // Convierte el objeto o arreglo a JSON
        // const jsonData = JSON.stringify(convertedData);
        // console.log("Datos convertidos a JSON:", jsonData);

        // console.log(dataForm);
        // console.log(dataSedeTecnology.FK_TSEDE);

        await apiPutSedeTecnology(dataSedeTecnology.FK_TSEDE, convertedData.data)
            .then((response) => {
                if (response.data.status === "success") {
                    apiGetThunksAsyncSedeTecnology(dataSedeTecnology.FK_TSEDE);
                }
                console.log(response);

                // const updateData = convertedData;

                // console.log(updateData);
                return response;
            })
            .catch((error) => {
                console.log("Error al obtener los datos actualizados:", error);
            });

        //     // Realizar acciones adicionales con los valores del formulario si es necesario
    };
   

    return {
        // apiGetFKTLV,
        form,
        dataSedeTecnology,
        TecnologySedeGetData,
        initialValuesTec,
        dataSeelectTec,
        resultado,
        TecnologyFKData,
        handleFormSubmit,
    };
};
