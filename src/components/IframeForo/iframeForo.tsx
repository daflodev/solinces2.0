import { withPrincipal } from "../content";




const IframeForo = () => {

    const renderIframe = (
        <>
            <iframe style={{ border: '0px', width: '100%', height: '90vh' }} src="http://localhost:4046/planilla-actividades"></iframe>
        </>
    )



    return (
        
            <div>{renderIframe}</div>

    
    )
}

export default withPrincipal(IframeForo);