import { calificationStore } from "@/store/calificationStore";
import { sessionInformationStore } from "@/store/userInformationStore";
import { QueryBuilders } from "@/utils/orm/queryBuilders";
import { useEffect, useState } from "react";
import {shallow} from "zustand/shallow";

  
export const UseSelectCalification = () => {


  const [options, setOptions] = useState<any>(null);
  const [evaluacion, setEvaluacion] = useState<any>(null);

  // @ts-ignore
  const { currentAsignature,currentGrade,currentGroup, currentEvaluationPeriod } =
  calificationStore(
      (state) => ({
      currentAsignature: state.currentAsignature,
      currentGrade: state.currentGrade,
      currentGroup: state.currentGroup,
      currentEvaluationPeriod: state.currentEvaluationPeriod,
      }),
      shallow
  );

    // @ts-ignore
  const { currentAcademicYear} =
  sessionInformationStore(
    (state) => ({
      currentAcademicYear: state.currentAcademicYear,
    }),
    shallow
  );

  let currentAcademicYearLocal = currentAcademicYear ?? localStorage.getItem('currentAcademicYear');

  const { updateValueCalification } = calificationStore();

  const onChange = (value: (string | number)[], selectedOptions: any) => {
    if(selectedOptions.length == 3){
      console.log(selectedOptions[2].value,'currentGroup')
      updateValueCalification({ element: 'currentGroup', value: selectedOptions[2].value})
    }
  };

  const onChangeSelect = (value: any) => {
    updateValueCalification({ element: 'currentEvaluationPeriod', value: value})
  };

  const getGrades = async (pk_asignature) => {
      const query = new QueryBuilders('grado');
      const grades = await query
      .select('DISTINCT grado."NOMBRE" AS label, grado."PK_TGRADO" AS value, false AS "isLeaf", 2 as position')
      .join('grupo', '"FK_TGRADO"', 'grado."PK_TGRADO"')
      .join('ASIGNATURA_PLAN', '"FK_TPLAN"', 'grupo."FK_TPLAN"')
      .where('ASIGNATURA_PLAN."FK_TASIGNATURA"', '=', pk_asignature)
      .schema('ACADEMICO_COL0')
      .get();
      return grades
  }


  const getGroup = async (pk_grades) => {
      const query = new QueryBuilders('grupo');
      const group = await query
      .select(`DISTINCT CONCAT(grupo."NOMBRE",' ',jornada."NOMBRE") AS label, grupo."PK_TGRUPO" AS value, 3 as position`)
      .join('jornada', '"PK_TJORNADA"', 'grupo."FK_TJORNADA"')
      .where('grupo."FK_TGRADO"', '=', pk_grades)
      .schema('ACADEMICO_COL0')
      .get();
      return group
  }

  const loadData = async (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    if(targetOption.position == '1'){
      await getGrades(targetOption.value)
      .then((data) => {
          updateValueCalification({ element: 'currentAsignature', value: targetOption.value})
          console.log(targetOption.value,'currentAsignature')

          targetOption.children = data
          setOptions([...options]);
      });
    }else if(targetOption.position == '2'){
      await getGroup(targetOption.value)
      .then((data) => {
          console.log(targetOption.value,'currentGrade')
          updateValueCalification({ element: 'currentGrade', value: targetOption.value})
          targetOption.children = data
          setOptions([...options]);
      });
    }else {
      
    }
    
    
    
  };

  const getDataAsignature = async () => {

      const query = new QueryBuilders('asignatura');
      const asignature = await query
      .select('DISTINCT area."NOMBRE" AS label, area."PK_TAREA" AS value, false AS "isLeaf", 1 as position')
      .join('area', '"PK_TAREA"', 'asignatura."FK_TAREA"')
      .where('area."FK_TPERIODO_ACADEMICO"', '=', currentAcademicYearLocal)
      .orderBy('area."PK_TAREA"', 'asc')
      // .limit(10)
      .schema('ACADEMICO_COL0')
      .get();
      setOptions(asignature)
  }

  const getDataEvaluationPeriod = async () => {

    const query = new QueryBuilders('periodo_evaluacion');
    const periodo_evaluacion = await query
    .select('"PK_TPERIODO_EVALUACION" AS value, "NOMBRE" as label')
    .where('"FK_TPERIODO_ACADEMICO"', '=', currentAcademicYearLocal)
    .orderBy('"PK_TPERIODO_EVALUACION"', 'asc')
    .schema('ACADEMICO_COL0')
    .get();

    setEvaluacion(periodo_evaluacion)
  }

  useEffect(() => {
      getDataAsignature()
      getDataEvaluationPeriod()
  }, [currentAcademicYearLocal])

  return {
      options,
      onChange,
      loadData,
      currentAsignature,
      currentGrade,
      currentGroup,
      evaluacion,
      currentEvaluationPeriod,
      onChangeSelect,
  }
}