import { useParams } from "react-router-dom";





export const useIframe = () => {
    // let { token, page, link, grade, course, period, type, level }: any = useParams();
    const type_user = localStorage.getItem("type_user")
    console.log(type_user)
    const tokenF1 = localStorage.getItem("accesToken")
    console.log(tokenF1)

    const redirectPage = () => {
        let urlElements = 'http://localhost:4046';
        switch (type_user) {
            case "GESTOR-ACTIVIDADES":
                urlElements += `/initial/${tokenF1}/agenda/gestor-actividades/${type_user}`
                break;
            case "PLANILLA-ACTIVIDADES":
                urlElements += `/initial/${tokenF1}/planilla/planilla-actividades/${type_user}`
                break;
            default:
                urlElements
                break;
        }

        return urlElements
    }





    return {
        redirectPage,

    }
}
