import { Fragment} from "react";
import { withPrincipal } from "../content";
import { useIframe } from "./useIframe";
import IframeGestor from "./IframeGestor";


const PreloaderPage = () => {
const {redirectPage, page}: any = useIframe()

    const getUrl = redirectPage(page)

    return (
        <Fragment>
         {/* <>{getUrl}</> */}
            <IframeGestor srcurl={redirectPage(page)}/>
        </Fragment>
    )
}

export default withPrincipal(PreloaderPage);