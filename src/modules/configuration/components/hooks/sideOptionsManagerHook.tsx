import { useState } from "react";
import { useJournySede } from "./useSedeJornada";
import { Card, Col } from "antd";

import MyForm from "../../../../utils/components/tableCheckbox/tableChecBox";
import SedeInfraEstructuraFisica from "../../../../utils/components/formSedeInfra";

export const sideOptionsManagerHook  = () =>{
    const [isSecondaryTableOpen, setIsSecondaryTableOpen] = useState(false);

    const [tableGridWidth, setTableGridWidth] = useState(14);

    const [secondaryTableComponentRender, setSecondaryTableComponentRender] = useState(<></>);

    const {  dataSede,
            journySedeGetData, } : any =  useJournySede()

    const handleCloseSecondaryTable = () => {
        setIsSecondaryTableOpen(false);
        setSecondaryTableComponentRender(<></>)
    };
    

const handleOpenSecondaryTable = async (record, nameSideOption) => {
    setIsSecondaryTableOpen(true);

    switch (nameSideOption) {
        case 'useSedeJornada':

            setTableGridWidth(14)

            journySedeGetData(record)

            const useSedeJornadaComponent = (
                <Col md={6}>
                    <Card className="justify-content-center align-items-center ">
                        <MyForm onClick={handleCloseSecondaryTable} title={"tsede_jornada"} data={dataSede}/>
                    </Card>
                </Col>
            );

            setSecondaryTableComponentRender(useSedeJornadaComponent);

            break;

        case 'useSedeInfra':

        setTableGridWidth(14)

        journySedeGetData(record)

        const useSedeInfraComponent = (
            <Col md={6}>
                <Card className="justify-content-center align-items-center ">
                    <SedeInfraEstructuraFisica onClick={ handleCloseSecondaryTable} />
                </Card>
            </Col>

        );

        setSecondaryTableComponentRender(useSedeInfraComponent);

        break;
    
        default:
            setIsSecondaryTableOpen(false);
            break;
    }

};

    return {
        isSecondaryTableOpen,
        handleOpenSecondaryTable,
        setIsSecondaryTableOpen,
        secondaryTableComponentRender,
        handleCloseSecondaryTable,
        tableGridWidth
    }
}