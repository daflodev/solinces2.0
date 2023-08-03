import { useEffect, useState } from "react";
import { SelectCalificationComponent } from '@/components/selectCalification';
import TActivityView from './qualificationView/activityView/tActivityView';
import ActivitySupportViewComp from './qualificationView/activitySupportView/activitySupportViewComp';
import RecursosCompartidoPage from "@/components/recursosCompartidos/recursos";

interface QualificationOptionComponentInterface{
    optionToRender: string;
    vanillaTable: any;
}

export const QualificationOptionComponent: React.FC<QualificationOptionComponentInterface> = (props) => {

    const { 
        optionToRender, 
        //vanillaTable 
    } = props;

    const [currentOptionSelectedRender, setCurrentOptionSelectedRender] = useState(<span>{optionToRender}...</span>);

    useEffect(() => {

        //TODO: switch case para controlar el elemento a renderizar.

        switch (optionToRender) {
            case 'TACTIVIDAD':
                setCurrentOptionSelectedRender(<TActivityView/>)
                break;
            
            case 'TRECURSO_COMPARTIDO':
                setCurrentOptionSelectedRender(<RecursosCompartidoPage/>)
                break;

            case 'TACTIVIDAD_SOPORTE':
                setCurrentOptionSelectedRender(<ActivitySupportViewComp/>)
                break;

            // case 'TLOGRO':
            //     setCurrentOptionSelectedRender(vanillaTable);
            //     break;
        
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