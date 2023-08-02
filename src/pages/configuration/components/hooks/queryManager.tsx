import { QueryBuilders } from "@/services/orm/queryBuilders";

// @ts-ignore
export async function QueryManager(table: string, currentRol: any, currentAcademicYear: any, currentCampus: any, currentInstitution: any, schema?: any){

    let answerQuery: any;
    const query = new QueryBuilders(table);
    // const currentAcademicYear = localStorage.getItem('currentAcademicYear')
    currentAcademicYear = currentAcademicYear ?? localStorage.getItem('currentAcademicYear');
    let columnInfoData: any;

    if(table){
        const querycolumn = new QueryBuilders(table);
        columnInfoData = await querycolumn
                        .schema(schema)
                        .columninfo()
    }    

    if(currentRol != "SUPER_ADMINISTRADOR"){
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
                    .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                    .where('lista_valor."NOMBRE"', '=', 'Matricula')
                    .limit(20)
                    .orderBy(`"PK_T${table.toUpperCase()}"`)
                    .get()

                break;

            case 'TRASLADOS':
                //TODO: consult TRASLADOS
                const traslados = new QueryBuilders('matricula');
                answerQuery = await traslados
                    .select('matricula.*')
                    .schema(schema)
                    .join('grupo', '"PK_TGRUPO"', 'matricula."FK_TGRUPO"')
                    .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                    .join('lista_valor', '"PK_TLISTA_VALOR"', 'matricula."FK_TLV_TIPO_MATRICULA"')
                    .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                    .where('lista_valor."NOMBRE"', '=', 'Traslado')
                    .limit(20)
                    .orderBy(`"PK_T${table.toUpperCase()}"`)
                    .get()

                break;

            case 'PREMATRICULAS':
                //TODO: consult PREMATRICULAS
                
                const queryPrematricula = new QueryBuilders('matricula');
                answerQuery = await queryPrematricula
                    .select('matricula.*')
                    .schema(schema)
                    .join('grupo', '"PK_TGRUPO"', 'matricula."FK_TGRUPO"')
                    .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                    .join('lista_valor', '"PK_TLISTA_VALOR"', 'matricula."FK_TLV_TIPO_MATRICULA"')
                    .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                    .where('lista_valor."NOMBRE"', '=', 'Prematricula')
                    .limit(20)
                    .orderBy(`"PK_TMATRICULA"`)
                    .get()
    
                break;

            case 'acta_grado':
                //TODO: consult acta_grado
                answerQuery = await query
                    .select('acta_grado.*')
                    .schema(schema)
                    .join('grado', '"PK_TGRADO"', 'acta_grado."FK_TGRADO"')
                    .join('lista_valor', '"PK_TLISTA_VALOR"', 'matricula."FK_TLV_TIPO_MATRICULA"')
                    .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                    .limit(20)
                    .orderBy(`"PK_T${table.toUpperCase()}"`)
                    .get()
    
                break;

            case 'grado':
                    //TODO: consult grado
                    answerQuery = await query
                        .select('*')
                        .schema(schema)
                        .where('"FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                        .limit(20)
                        .orderBy(`"PK_T${table?.toUpperCase()}"`)
                        .get()
        
                    break;

            case 'periodo_academico':
                    //TODO: consult periodo_academico
                    answerQuery = await query
                        .select('*')
                        .schema(schema)
                        .where('"PK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                        .limit(20)
                        .orderBy(`"PK_T${table.toUpperCase()}"`)
                        .get()
        
                    break;

            case 'periodo_evaluacion':
                    //TODO: consult periodo_evaluacion
                    answerQuery = await query
                        .select('*')
                        .schema(schema)
                        .where('"FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                        .limit(20)
                        .orderBy(`"PK_T${table.toUpperCase()}"`)
                        .get()
        
                    break;
            
            case 'ano_lectivo':
                //TODO: consult ano_lectivo
                answerQuery = await query
                    .select('*')
                    .schema(schema)
                    .where('"FK_TESTABLECIMIENTO"', '=', currentInstitution?.value)
                    .limit(20)
                    .orderBy(`"PK_T${table.toUpperCase()}"`)
                    .get()
    
                break;

            case 'grupo':
                //TODO: consult grupo
                answerQuery = await query
                    .select('grupo.*')
                    .schema(schema)
                    .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                    .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                    .limit(20)
                    .orderBy(`"PK_T${table.toUpperCase()}"`)
                    .get()
    
                break;

            case 'sesion':
                //TODO: consult sesion
                answerQuery = await query
                    .select('sesion.*')
                    .schema(schema)
                    .join('sede_usuario', '"FK_TUSUARIO"', 'sesion."FK_TUSUARIO"')
                    .where('sede_usuario."FK_TSEDE"', '=', currentCampus?.value)
                    .limit(20)
                    .get()
                break;

            // ESTABLECIMIENTO
            case 'configuracion_reporte':
                //TODO: consult configuracion_reporte
                answerQuery = await query
                    .select('configuracion_reporte.*')
                    .schema(schema)
                    .where('"FK_TESTABLECIMIENTO"', '=', currentInstitution?.value)
                    .limit(20)
                    .get()
                break;

            case 'configuracion_membrete':
                //TODO: consult configuracion_membrete
                answerQuery = await query
                    .select('configuracion_membrete.*')
                    .schema(schema)
                    .where('"FK_TESTABLECIMIENTO"', '=', currentInstitution?.value)
                    .limit(20)
                    .get()
                break;

            case 'enfasis':
                //TODO: consult enfasis
                answerQuery = await query
                    .select('enfasis.*')
                    .schema(schema)
                    .where('"FK_TESTABLECIMIENTO"', '=', currentInstitution?.value)
                    .limit(20)
                    .get()
                break;

            case 'mensaje_promocion':
                //TODO: consult mensaje_promocion
                answerQuery = await query
                    .select('mensaje_promocion.*')
                    .schema(schema)
                    .where('"FK_TESTABLECIMIENTO"', '=', currentInstitution?.value)
                    .limit(20)
                    .get()
                break;

            // SEDE
            case 'funcionario':
                //TODO: consult funcionario
                answerQuery = await query
                    .select('funcionario.*')
                    .schema(schema)
                    .join('sede_usuario', '"FK_TUSUARIO"', 'funcionario."FK_TUSUARIO"')
                    .where('sede_usuario."FK_TSEDE"', '=', currentCampus?.value)
                    .limit(20)
                    .get()
                break;

            case 'calendario_detalle':
                //TODO: consult calendario_detalle
                answerQuery = await query
                    .select('calendario_detalle.*')
                    .schema(schema)
                    .join('calendario', '"PK_TCALENDARIO"', 'calendario_detalle."PK_TCALENDARIO_DETALLE"')
                    .where('calendario."FK_TSEDE"', '=', currentCampus?.value)
                    .limit(20)
                    .get()
                break;

            // PERIODO ACADEMICO

            case 'asignatura_plan':
                //TODO: consult asignatura_plan
                answerQuery = await query
                    .select('asignatura_plan.*')
                    .schema(schema)
                    .join('plan', '"PK_TPLAN"', 'asignatura_plan."FK_PLAN"')
                    .where('plan."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                    .limit(20)
                    .get()
                break;

            case 'area_asignatura_obligatoria':
                //TODO: consult area_asignatura_plan
                answerQuery = await query
                    .select('area_asignatura_obligatoria.*')
                    .schema(schema)
                    .join('area', '"PK_TAREA"', 'area_asignatura_obligatoria."FK_TAREA"')
                    .where('area."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                    .limit(20)
                    .get()
                break;

            case 'criterio_promocion':
                //TODO: consult criterio_promocion
                answerQuery = await query
                    .select('criterio_promocion.*')
                    .schema(schema)
                    .where('"FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                    .limit(20)
                    .get()
                break;

            case 'area':
                //TODO: consult area
                answerQuery = await query
                    .select('area.*')
                    .schema(schema)
                    .where('"FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                    .limit(20)
                    .get()
                break;

            case 'asignatura':
                //TODO: consult asignatura
                answerQuery = await query
                    .select('asignatura.*')
                    .schema(schema)
                    .join('area', '"PK_TAREA"', 'asignatura."FK_TAREA"')
                    .where('area."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                    .limit(20)
                    .get()
                break;

            case 'horario':
                //TODO: consult horario
                answerQuery = await query
                    .select('horario.*')
                    .schema(schema)
                    .join('asignatura', '"PK_TASIGNATURA"', 'horario."PK_THORARIO"')
                    .join('area', '"PK_TAREA"', 'asignatura."FK_TAREA"')
                    .where('area."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                    .limit(20)
                    .get()
                break;

            case 'valoracion':
                //TODO: consult valoracion
                answerQuery = await query
                    .select('valoracion.*')
                    .schema(schema)
                    .join('escala', '"PK_TESCALA"', 'valoracion."PK_TVALORACION"')
                    .where('escala."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                    .limit(20)
                    .get()
                break;

            case 'docente_asignatura':
                //TODO: consult docente_asignatura
                answerQuery = await query
                    .select('docente_asignatura.*')
                    .schema(schema)
                    .join('grupo', '"PK_TGRUPO"', 'docente_asignatura."PK_TDOCENTE_ASIGNATURA"')
                    .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                    .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                    .limit(20)
                    .get()
                break;

            case 'docente_asignatura':
                //TODO: consult docente_asignatura
                answerQuery = await query
                    .select('docente_asignatura.*')
                    .schema(schema)
                    .join('grupo', '"PK_TGRUPO"', 'docente_asignatura."PK_TDOCENTE_ASIGNATURA"')
                    .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                    .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                    .limit(20)
                    .get()
                break;

                case 'matricula':
                    //TODO: consult matricula
                    answerQuery = await query
                        .select('matricula.*')
                        .schema(schema)
                        .join('grupo', '"PK_TGRUPO"', 'matricula."PK_TMATRICULA"')
                        .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                        .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                        .limit(20)
                        .get()
                    break;

                case 'acta_grado_detalle':
                    //TODO: consult acta_grado_detalle
                    answerQuery = await query
                        .select('acta_grado_detalle.*')
                        .schema(schema)
                        .join('matricula', '"PK_TMATRICULA"', 'acta_grado_detalle."FK_TMATRICULA"')
                        .join('grupo', '"PK_TGRUPO"', 'matricula."PK_TMATRICULA"')
                        .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                        .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                        .limit(20)
                        .get()
                    break;

                case 'acta_grado':
                    //TODO: consult acta_grado
                    answerQuery = await query
                        .select('acta_grado.*')
                        .schema(schema)
                        .where('"FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                        .limit(20)
                        .get()
                    break;

                case 'retiro_matricula':
                    //TODO: consult retiro_matricula
                    answerQuery = await query
                        .select('retiro_matricula.*')
                        .schema(schema)
                        .join('matricula', '"PK_TMATRICULA"', 'retiro_matricula."FK_TMATRICULA"')
                        .join('grupo', '"PK_TGRUPO"', 'matricula."PK_TMATRICULA"')
                        .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                        .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                        .limit(20)
                        .get()
                    break;

                case 'sede_convenio_matricula':
                    //TODO: consult sede_convenio_matricula
                    answerQuery = await query
                        .select('sede_convenio_matricula.*')
                        .schema(schema)
                        .join('matricula', '"PK_TMATRICULA"', 'sede_convenio_matricula."FK_TMATRICULA"')
                        .join('grupo', '"PK_TGRUPO"', 'matricula."PK_TMATRICULA"')
                        .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                        .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                        .limit(20)
                        .get()
                    break;

                case 'actividad_soporte':
                    //TODO: consult sede_convenio_matricula
                    answerQuery = await query
                        .select('actividad_soporte.*')
                        .schema(schema)
                        .join('matricula', '"PK_TMATRICULA"', 'actividad_soporte."FK_TMATRICULA"')
                        .join('grupo', '"PK_TGRUPO"', 'matricula."PK_TMATRICULA"')
                        .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                        .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                        .limit(20)
                        .get()
                    break;

                case 'recurso_compartido':
                    //TODO: consult recurso_compartido
                    answerQuery = await query
                        .select('recurso_compartido.*')
                        .schema(schema)
                        .join('grupo', '"PK_TGRUPO"', 'recurso_compartido."FK_TGRUPO"')
                        .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                        .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                        .limit(20)
                        .get()
                    break;

                case 'logro':
                    //TODO: consult logro
                    answerQuery = await query
                        .select('logro.*')
                        .schema(schema)
                        .join('periodo_evaluacion', '"PK_TPERIODO_EVALUACION"', 'logro."FK_TPERIODO_EVALUACION"')
                        .where('periodo_evaluacion."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                        .limit(20)
                        .get()
                    break;

                case 'asistencia':
                    //TODO: consult asistencia
                    answerQuery = await query
                        .select('asistencia.*')
                        .schema(schema)
                        .join('periodo_evaluacion', '"PK_TPERIODO_EVALUACION"', 'asistencia."FK_TPERIODO_EVALUACION"')
                        .where('periodo_evaluacion."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                        .limit(20)
                        .get()
                    break;

                case 'actividad':
                    //TODO: consult actividad
                    answerQuery = await query
                        .select('actividad.*')
                        .schema(schema)
                        .join('periodo_evaluacion', '"PK_TPERIODO_EVALUACION"', 'actividad."FK_TPERIODO_EVALUACION"')
                        .where('periodo_evaluacion."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                        .limit(20)
                        .get()
                    break;

                case 'sede_convenio':
                    //TODO: consult sede_convenio
                    answerQuery = await query
                        .select('sede_convenio.*')
                        .schema(schema)
                        .where('"FK_TPERIODO_ORIGEN"', '=', currentAcademicYear)
                        .limit(20)
                        .get()
                    break;

                case 'traslado_estudiante':
                    //TODO: consult traslado_estudiante
                    answerQuery = await query
                        .select('traslado_estudiante.*')
                        .schema(schema)
                        .where('"FK_TGRUPO_ORIGEN"', '=', currentAcademicYear)
                        .limit(20)
                        .get()
                    break;

                // case 'INSCRIPCIONES':
                //     //TODO: consult Inscripcion
                //     answerQuery = await query
                //         .select('matricula.*')
                //         .schema(schema)
                //         .join('lista_valor', '"PK_TLISTA_VALOR"', 'matricula."FK_TLV_TIPO_MATRICULA"')
                //         .join('grupo', '"PK_TGRUPO"', 'matricula."FK_TGRUPO"')
                //         .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                //         .where('lista_valor."NOMBRE"', '=', 'Inscripcion')
                        // .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                //         .limit(20)
                //         .get()
                //     break;

                // case 'INSCRIPCIONES':
                //     //TODO: consult Traslado
                //     answerQuery = await query
                //         .select('matricula.*')
                //         .schema(schema)
                //         .join('lista_valor', '"PK_TLISTA_VALOR"', 'matricula."FK_TLV_TIPO_MATRICULA"')
                //         .join('grupo', '"PK_TGRUPO"', 'matricula."FK_TGRUPO"')
                //         .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                //         .where('lista_valor."NOMBRE"', '=', 'Traslado')
                        // .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                //         .limit(20)
                //         .get()
                //     break;

                // case 'INSCRIPCIONES':
                //     //TODO: consult Prematricula
                //     answerQuery = await query
                //         .select('matricula.*')
                //         .schema(schema)
                //         .join('lista_valor', '"PK_TLISTA_VALOR"', 'matricula."FK_TLV_TIPO_MATRICULA"')
                //         .join('grupo', '"PK_TGRUPO"', 'matricula."FK_TGRUPO"')
                //         .join('grado', '"PK_TGRADO"', 'grupo."FK_TGRADO"')
                //         .where('lista_valor."NOMBRE"', '=', 'Prematricula')
                //         // .where('grado."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYear)
                //         .limit(20)
                //         .get()
                //     break;

            default:

                    if(table){
                        answerQuery = await query
                        .schema(schema)
                        .limit(20)
                        .orderBy(`"PK_T${table.toUpperCase()}"`)
                        .get()
                    }else{
                        answerQuery = []
                    }

                break;
        }
    }else{
        if(table){
            answerQuery = await query
            .schema(schema)
            .limit(20)
            .orderBy(`"PK_T${table.toUpperCase()}"`)
            .get()
        }else{
            answerQuery = []
        }
        
    }

    const data: object = {
        data: answerQuery,
        column: columnInfoData
    }

    return data
}