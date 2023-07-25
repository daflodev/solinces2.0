import { useEffect, useState } from "react";
import { optionTableSelectedStore } from "../../../../store/optionTableSelectedStore";
import { shallow } from "zustand/shallow";

interface QualificationOptionComponentInterface{
    optionToRender: string;
}

export const QualificationOptionComponent: React.FC<QualificationOptionComponentInterface> = (props) => {

    const { optionToRender } = props;

     // @ts-ignore
  const { optionSelectedName } =
  optionTableSelectedStore(
    (state) => ({
        optionSelectedName: state.optionSelectedName,
    }),
    shallow
  );

  console.log('from the principal: ', optionToRender)

    const [currentOptionSelectedRender, setCurrentOptionSelectedRender] = useState(<span>{optionToRender}...</span>);


    useEffect(() => {

        //TODO: switch case para controlar el elemento a renderizar.

    }, [optionSelectedName])


    return (
        <div>
            <span>Asignatura, gardo, grupo y jornada selectro</span>
            <br/>
            <span>Periodo de evaluacion</span>

            <div>
                {currentOptionSelectedRender}
            </div>
        </div>
    );
};
