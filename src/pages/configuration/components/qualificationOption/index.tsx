import { useEffect, useState } from "react";
import { SelectCalificationComponent } from '@/components/selectCalification';
import TActivityView from './qualificationView/activityView/tActivityView';
import { RecursosCompartidos } from "@/components/recursosCompartidos";
import ActivitySupportViewComp from './qualificationView/activitySupportView/activitySupportViewComp';

interface QualificationOptionComponentInterface{
    optionToRender: string;
}

export const QualificationOptionComponent: React.FC<QualificationOptionComponentInterface> = (props) => {

    const { optionToRender } = props;
    console.log('from the principal: ', optionToRender)

    const [currentOptionSelectedRender, setCurrentOptionSelectedRender] = useState(<span>{optionToRender}...</span>);

    useEffect(() => {

        //TODO: switch case para controlar el elemento a renderizar.
        console.log('a change: ', optionToRender)

        switch (optionToRender) {
            case 'TACTIVIDAD':
                setCurrentOptionSelectedRender(<TActivityView/>)
                break;
            
            case 'TRECURSO_COMPARTIDO':
                setCurrentOptionSelectedRender(<RecursosCompartidos/>)
                break;

            case 'TACTIVIDAD_SOPORTE':
                setCurrentOptionSelectedRender(<ActivitySupportViewComp/>)
                break;
        
            default:
                setCurrentOptionSelectedRender(<span>nothing to show...</span>)
                break;
        }

    }, [optionToRender])
    
    return (
        <div>
            <br/>
            <br/>
            <SelectCalificationComponent/>
            <br/>

            <div>
                {currentOptionSelectedRender}
            </div>
        </div>
    );
};