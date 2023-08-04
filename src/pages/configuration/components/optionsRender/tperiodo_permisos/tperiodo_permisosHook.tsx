/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const TPeriodoPermissionGetDataHook  = (data?: any) =>{
    const [dataPeriodoPermisos, setdataPeriodoPermisos] = useState<any>(data ? data : null);

    const functionPeriodoPermisos = () => {

        setdataPeriodoPermisos([])

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
