import { Fragment} from "react";
import { withPrincipal } from "../content";
import { useIframe } from "./useIframe";
import IframeGestor from "./IframeGestor";


const PreloaderPage = () => {
const {redirectPage}: any = useIframe()

    const getUrl = redirectPage()

    return (
        <Fragment>
         <>{redirectPage}</>
            <IframeGestor srcurl={redirectPage()}/>
        </Fragment>
    )
}

export default withPrincipal(PreloaderPage);