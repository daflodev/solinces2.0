import * as React from "react";
import { withPrincipal } from "../content";


const iframeGestor = ({srcurl}: {srcurl: string}) => {


    return (

        <iframe style={{ border: '0px', width: '100%', height: '90vh' }} src={srcurl} />


    )
}

export default iframeGestor
;