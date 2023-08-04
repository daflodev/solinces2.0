/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const TPeriodoPermissionGetDataHook  = (data?: any) =>{
    const [dataPeriodoPermisos, setdataPeriodoPermisos] = useState<any>(null);

    const functionPeriodoPermisos = (dataPrueba) => {

        setdataPeriodoPermisos(dataPrueba)

    }
    
    useEffect(() => {

        dataPeriodoPermisos

    }, [dataPeriodoPermisos])


    return {
        dataPeriodoPermisos,
        setdataPeriodoPermisos,
        functionPeriodoPermisos
    }
}
