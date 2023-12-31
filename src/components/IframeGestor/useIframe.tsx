import { loginFaseOne } from "@/services/api/services";
import { useEffect } from "react";
import { useParams } from "react-router-dom";





export const useIframe = () => {

    const tokenInformation = localStorage.getItem('user_token_information');
    const parserTokenInformation: any | null = tokenInformation ? JSON.parse(tokenInformation) : null;

    const getUser = async () => {
        // const query = new QueryBuilders('usuario');
        // const results: any = await query
        //     .select('*')
        //     .schema(parserTokenInformation.dataSchema[0])
        //     .where('usuario."CUENTA"', '=', parserTokenInformation.preferred_username)
        //     .limit(1)
        //     .get()
        //     .then(async (resp: any) => {
        //         console.log(resp[0].CUENTA)



        // })

        await loginFaseOne().then((resp: any) => {
            const parseResp = JSON.parse(resp)
            console.log(parseResp)
            localStorage.setItem("type_user", parseResp.data.type_user)
            localStorage.setItem("accesToken", parseResp.data.access)
        })

    }



    useEffect(() => {
        getUser()
    }, [])




    // let { token, page, link, grade, course, period, type, level }: any = useParams();
    const type_user = localStorage.getItem("type_user")
    console.log(type_user)
    const tokenF1 = localStorage.getItem("accesToken")
    console.log(tokenF1)

    const { page} =useParams()

    console.log(page)

    const redirectPage = (page) => {
        let urlElements = 'http://127.0.0.1:4046';
        switch (page) {
            case "gestor-actividades":
                urlElements += `/initial/${tokenF1}/agenda/gestor-actividades/`
                break;
            case "planilla-actividades":
                urlElements += `/initial/${tokenF1}/planilla/planilla-actividades/`
                break;
                case "monitoreo":
                urlElements += `/initial/${tokenF1}/monitoreo/monitoreo/${type_user}`
                break;
                case "agenda":
                urlElements += `/initial/${tokenF1}/agenda/agenda-actividades/`
                break;
            default:
                urlElements
                break;
        }

        return urlElements
    }





    return {
        redirectPage,
        page

    }
}
