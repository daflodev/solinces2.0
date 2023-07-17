import { QueryBuilders } from "../../../../utils/orm/queryBuilders";

// @ts-ignore
export async function QueryManager(table: string, currentRol: any, currentAcademicPeriod: any, currentCampus: any, currentInstitution: any, schema?: any){

    console.log(table, 'query_manage')
    let answerQuery: any;
    const query = new QueryBuilders(table);
    const currentAcademicPeriodLocal = localStorage.getItem('currentAcademicYear')


    const querycolumn = new QueryBuilders(table);
    const columnInfoData: any = await querycolumn
                        .schema(schema)
                        .columninfo()

    if(currentRol == 'RECTOR'){
        switch (table) {
            case 'estudiante':

                answerQuery = await query
                    .select('estudiante.*')
                    .schema(schema)
                    .join('sede_usuario', '"FK_TUSUARIO"', 'estudiante."FK_TUSUARIO"')
                    .join('rol', '"PK_TROL"', 'sede_usuario."FK_TROL"')
                    .where('sede_usuario."FK_TSEDE"', '=', currentCampus?.value)
                    .where('rol."NOMBRE"', '=', 'Estudiante')
                    .limit(20)
                    .orderBy(`"PK_T${table.toUpperCase()}"`)
                    .get()
                break;

            case 'padre':

                answerQuery = await query
                    .select('padre.*')
                    .schema(schema)
                    .join('sede_usuario', '"FK_TUSUARIO"', 'padre."FK_TUSUARIO"')
                    .join('rol', '"PK_TROL"', 'sede_usuario."FK_TROL"')
                    .where('sede_usuario."FK_TSEDE"', '=', currentCampus?.value)
                    .where('rol."NOMBRE"', '=', 'Acudiente')
                    .limit(20)
                    .orderBy(`"PK_T${table.toUpperCase()}"`)
                    .get()

                break;

            case 'matricula':

                answerQuery = await query
                    .select('matricula.*')
                    .schema(schema)
                    .join('grupo', '"PK_TGRUPO"', 'matricula."FK_TGRUPO"')
                    .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                    .join('lista_valor', '"PK_TLISTA_VALOR"', 'matricula."FK_TLV_TIPO_MATRICULA"')
                    .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicPeriodLocal)
                    .where('lista_valor."NOMBRE"', '=', 'Matricula')
                    .limit(20)
                    .orderBy(`"PK_T${table.toUpperCase()}"`)
                    .get()

                break;

            case 'TRASLADOS':
                //TODO: consult periodo_academico
                const traslados = new QueryBuilders('matricula');
                answerQuery = await traslados
                    .select('matricula.*')
                    .schema(schema)
                    .join('grupo', '"PK_TGRUPO"', 'matricula."FK_TGRUPO"')
                    .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                    .join('lista_valor', '"PK_TLISTA_VALOR"', 'matricula."FK_TLV_TIPO_MATRICULA"')
                    .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicPeriodLocal)
                    .where('lista_valor."NOMBRE"', '=', 'Traslado')
                    .limit(20)
                    .orderBy(`"PK_T${table.toUpperCase()}"`)
                    .get()

                break;

            case 'PREMATRICULAS':
                //TODO: consult periodo_academico
                
                const queryPrematricula = new QueryBuilders('matricula');
                answerQuery = await queryPrematricula
                    .select('matricula.*')
                    .schema(schema)
                    .join('grupo', '"PK_TGRUPO"', 'matricula."FK_TGRUPO"')
                    .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                    .join('lista_valor', '"PK_TLISTA_VALOR"', 'matricula."FK_TLV_TIPO_MATRICULA"')
                    .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicPeriodLocal)
                    .where('lista_valor."NOMBRE"', '=', 'Prematricula')
                    .limit(20)
                    .orderBy(`"PK_TMATRICULA"`)
                    .get()
    
                break;

            case 'acta_grado':
                //TODO: consult periodo_academico
                answerQuery = await query
                    .select('acta_grado.*')
                    .schema(schema)
                    .join('grado', '"PK_TGRADO"', 'acta_grado."FK_TGRADO"')
                    .join('lista_valor', '"PK_TLISTA_VALOR"', 'matricula."FK_TLV_TIPO_MATRICULA"')
                    .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicPeriodLocal)
                    .limit(20)
                    .orderBy(`"PK_T${table.toUpperCase()}"`)
                    .get()
    
                break;

            case 'grado':
                    //TODO: consult periodo_academico
                    answerQuery = await query
                        .select('*')
                        .schema(schema)
                        .where('"FK_TPERIODO_ACADEMICO"', '=', currentAcademicPeriodLocal)
                        .limit(20)
                        .orderBy(`"PK_T${table.toUpperCase()}"`)
                        .get()
        
                    break;

            case 'periodo_academico':
                    //TODO: consult periodo_academico
                    answerQuery = await query
                        .select('*')
                        .schema(schema)
                        .where('"PK_TPERIODO_ACADEMICO"', '=', currentAcademicPeriodLocal)
                        .limit(20)
                        .orderBy(`"PK_T${table.toUpperCase()}"`)
                        .get()
        
                    break;

            case 'periodo_evaluacion':
                    //TODO: consult periodo_academico
                    answerQuery = await query
                        .select('*')
                        .schema(schema)
                        .where('"FK_TPERIODO_ACADEMICO"', '=', currentAcademicPeriodLocal)
                        .limit(20)
                        .orderBy(`"PK_T${table.toUpperCase()}"`)
                        .get()
        
                    break;
            
            case 'ano_lectivo':
                //TODO: consult periodo_academico
                answerQuery = await query
                    .select('*')
                    .schema(schema)
                    .where('"FK_TESTABLECIMIENTO"', '=', currentInstitution?.value)
                    .limit(20)
                    .orderBy(`"PK_T${table.toUpperCase()}"`)
                    .get()
    
                break;

            case 'grupo':
                //TODO: consult periodo_academico
                answerQuery = await query
                    .select('grupo.*')
                    .schema(schema)
                    .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                    .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicPeriodLocal)
                    .limit(20)
                    .orderBy(`"PK_T${table.toUpperCase()}"`)
                    .get()
    
                break;

            default:

                answerQuery = await query
                    .schema(schema)
                    .limit(20)
                    .orderBy(`"PK_T${table.toUpperCase()}"`)
                    .get()
                break;
        }
    }else{
        answerQuery = await query
        .schema(schema)
        .limit(20)
        .orderBy(`"PK_T${table.toUpperCase()}"`)
        .get()
    }

    const data: object = {
        data: answerQuery,
        column: columnInfoData
    }

    return data
}