import { withPrincipal } from "../content";


const tokenF1 = localStorage.getItem("accesToken")

const IframeForo = () => {

    const renderIframe = (
        <>
            <iframe style={{ border: '0px', width: '100%', height: '90vh' }} src={`http://localhost:4046/initial/${tokenF1}/agenda/gestor-actividades`}></iframe>
        </>
    )



    return (
        
            <div>{renderIframe}</div>

    
    )
}

export default withPrincipal(IframeForo);