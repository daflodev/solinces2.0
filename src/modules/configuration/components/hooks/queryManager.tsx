
export function QueryManager(queryBase: object, userRol: string, selectedTable: string, complementDataToQuery: object){

    let answerQuery = queryBase;

    if(userRol != 'SUPER_ADMINISTRADOR'){
        switch (selectedTable) {
            case 'sede':
                //TODO: consult sede

                break;

            case 'periodo_evaluacion':
                //TODO: consult periodo_evaluacion

                break;

            case 'periodo_academico':
                //TODO: consult periodo_academico

                break;

            case 'funcionario':
                //TODO: consult periodo_academico

                break;

            default:
                break;
        }
    }

    return answerQuery
};