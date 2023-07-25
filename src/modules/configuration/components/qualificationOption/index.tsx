import { useEffect, useState } from "react";
import { SelectCalificationComponent } from '@/utils/components/selectCalification';
import TActivityView from './qualificationView/activityView/tActivityView';

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