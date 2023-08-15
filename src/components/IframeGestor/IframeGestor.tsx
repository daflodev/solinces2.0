import * as React from "react";
import { withPrincipal } from "../content";





interface viwesFase1 {
    // Aquí puedes agregar propiedades adicionales específicas de IframeGestor
    srcurl?: string;
}
const IframeGestor = ({srcurl}: {srcurl: string}) => {



    // const renderIframe = (
    //     <>
    //         <iframe style={{ border: '0px', width: '100%', height: '90vh' }} src={src}></iframe>

    //     </>
    // )



    return (

        <iframe style={{ border: '0px', width: '100%', height: '90vh' }} src={srcurl} />


    )
}

export default IframeGestor;