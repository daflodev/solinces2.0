import { useEffect, useState } from "react";
import { useJournySede } from "./useSedeJornada";
import { TFuncionarioTPermissionGetDataHook } from '../optionsRender/tfuncionario_tpermitidos/tfuncionarioTpermitidosHook';
import { Card, Col } from "antd";
import { FuncionarioPermissionComponent } from "../optionsRender/tfuncionario_tpermitidos/tfuncionario_tpermitidos"

import MyForm from "@/utils/components/tableCheckbox/tableChecBox";

export const sideOptionsManagerHook  = () =>{
    const [isSecondaryTableOpen, setIsSecondaryTableOpen] = useState(false);

    const [optionTableSelected, setOptionTableSelected] = useState('')

    const [tableGridWidth, setTableGridWidth] = useState(14);

    const [secondaryTableComponentRender, setSecondaryTableComponentRender] = useState(<></>);

    const [currentRowInformation, setCurrentRowInformation] = useState(null)

    const {  dataSede,
            setDataSede,
            journySedeGetData, } : any =  useJournySede();

    const {
        items,
        rollOptions,
        getUserRoles,
    } : any = TFuncionarioTPermissionGetDataHook();

    const handleCloseSecondaryTable = () => {
        setSecondaryTableComponentRender(<></>)
        setDataSede(null)
        setIsSecondaryTableOpen(false);
    };
    

const handleOpenSecondaryTable = async (record, nameSideOption) => {

    setOptionTableSelected(nameSideOption)
    setCurrentRowInformation(record)
    setIsSecondaryTableOpen(true);

    switch (nameSideOption) {
        case 'useSedeJornada':

            setTableGridWidth(14);

            journySedeGetData(record)

            break;

        case 'useFuncionarioPermission':

            setTableGridWidth(10);

            getUserRoles(record?.FK_TUSUARIO);

            break
    
        default:
            setIsSecondaryTableOpen(false);
            break;
    }
};

    useEffect(() => {
        if(dataSede){
        
            const useSedeJornadaComponent = (
                <Col md={6}>
                    <Card className="justify-content-center align-items-center ">
                        <MyForm onClick={handleCloseSecondaryTable} title={"tsede_jornada"} data={dataSede}/>
                    </Card>
                </Col>
            );
            setSecondaryTableComponentRender(useSedeJornadaComponent);
        }
    }, [dataSede])

    useEffect(() => {

        console.log('item first val: ', items);
        console.log('first rollOptions: ', rollOptions);

        if(items && rollOptions && (optionTableSelected == 'useFuncionarioPermission')){
        
            const useFuncionarioPermissionComponent = (
                <Col md={10}>
                    <Card className="justify-content-center align-items-center " style={{background: 'var(--bg-color)', border: '0'}}>
                        <FuncionarioPermissionComponent
                            firstData={items}
                            rollOptionsToAddFirst={rollOptions}
                            userID={currentRowInformation?.FK_TUSUARIO}
                            onClick={handleCloseSecondaryTable}
                        />
                    </Card>
                </Col>
            );

            setSecondaryTableComponentRender(useFuncionarioPermissionComponent);
        }
    }, [rollOptions])

    return {
        isSecondaryTableOpen,
        handleOpenSecondaryTable,
        setIsSecondaryTableOpen,
        secondaryTableComponentRender,
        handleCloseSecondaryTable,
        tableGridWidth
    }
}