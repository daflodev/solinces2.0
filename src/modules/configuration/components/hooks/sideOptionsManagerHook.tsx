import { useEffect, useState } from "react";
import { useJournySede } from "./useSedeJornada";
import { Card, Col } from "antd";

import MyForm from "../../../../utils/components/tableCheckbox/tableChecBox";

export const SideOptionsManagerHook  = () =>{
    const [isSecondaryTableOpen, setIsSecondaryTableOpen] = useState(false);

    const [tableGridWidth, setTableGridWidth] = useState(14);

    const [secondaryTableComponentRender, setSecondaryTableComponentRender] = useState(<></>);

    const {  dataSede, journySedeGetData, rowSelection,handleSendData, setDataSede } : any =  useJournySede()

    const handleCloseSecondaryTable = () => {
        setSecondaryTableComponentRender(<></>)
        setDataSede(null)
        setIsSecondaryTableOpen(false);
    };
    

const handleOpenSecondaryTable = async (record, nameSideOption) => {
    setIsSecondaryTableOpen(true);

    switch (nameSideOption) {
        case 'useSedeJornada':

            setTableGridWidth(14)

            journySedeGetData(record)

            
           

            break;
    
        default:
            setIsSecondaryTableOpen(false);
            break;
    }

};
useEffect(()=>{
    if(dataSede){
        const useSedeJornadaComponent = (
            <Col md={6}>
                <Card className="justify-content-center align-items-center ">
                    <MyForm 
                    onClick={handleCloseSecondaryTable}
                    title={"tsede_jornada"}
                    data={dataSede}
                    rowSelection={rowSelection}
                    handleSendData={handleSendData} 
                    rowKey="PK_TJORNADA"   />
                </Card>
            </Col>
        );

        setSecondaryTableComponentRender(useSedeJornadaComponent);
    }
}, [dataSede])
    return {
        isSecondaryTableOpen,
        handleOpenSecondaryTable,
        setIsSecondaryTableOpen,
        secondaryTableComponentRender,
        handleCloseSecondaryTable,
        tableGridWidth
    }
}