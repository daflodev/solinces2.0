import { QueryBuilders } from "@/utils/orm/queryBuilders";
import { useEffect, useState } from "react";

  
export const UseSelectCalification = () => {

    const [options, setOptions] = useState<any>(null);

    const onChange = (value: (string | number)[], selectedOptions: any) => {
      console.log(value, selectedOptions);
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
        .select('DISTINCT grupo."NOMBRE" AS label, grupo."PK_TGRUPO" AS value, 3 as position')
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
            targetOption.children = data
            setOptions([...options]);
        });
      }else if(targetOption.position == '2'){
        await getGroup(targetOption.value)
        .then((data) => {
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
        .where('area."FK_TPERIODO_ACADEMICO"', '=', '1729')
        .orderBy('area."PK_TAREA"', 'asc')
        // .limit(10)
        .schema('ACADEMICO_COL0')
        .get();
        setOptions(asignature)
    }

    useEffect(() => {
        getDataAsignature()
    }, [])

    return {
        options,
        onChange,
        loadData
    }
}