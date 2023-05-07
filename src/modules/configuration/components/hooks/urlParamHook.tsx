import { useState } from "react";
import { useParams } from "react-router";

export const UrlParamHook = () =>{

    const params: any = useParams<{ type }>();

    return {
        params
    }

}