import { useEffect, useState } from "react";
import { useJournySede } from "./useSedeJornada";
import { TFuncionarioTPermissionGetDataHook } from '../optionsRender/tfuncionario_tpermitidos/tfuncionarioTpermitidosHook';
import { FuncionarioPermissionComponent } from "../optionsRender/tfuncionario_tpermitidos/tfuncionario_tpermitidos"

import MyForm from "@/utils/components/tableCheckbox/tableChecBox";
import { Card, Col, Spin } from "antd";
import { equisIcon } from "../../../../utils/assets/icon/iconManager";
import { useNivelSede } from "./useSedeNivel";
import SedeInfraEstructuraFisica from "../../../../utils/components/formSedeInfra";

export const SideOptionsManagerHook = () => {

  const [optionTableSelected, setOptionTableSelected] = useState('')

  const [isSecondaryTableOpen, setIsSecondaryTableOpen] = useState(false);

  const [tableGridWidth, setTableGridWidth] = useState(12);

  const [currentRowInformation, setCurrentRowInformation] = useState<any>(null)

    const {
        getUserRoles,
        items, setItems,
        rollOptions, setRollOptions,
    } : any = TFuncionarioTPermissionGetDataHook();

  const [secondaryTableComponentRender, setSecondaryTableComponentRender] =
    useState(<></>);

  const {
    dataSede,
    journySedeGetData,
    handleSendData,
    setDataSede,
    selectedValues,
    contextHolder,
  }: // handleCheckboxChange,
  any = useJournySede();
  const {
    nivelSedeGetData,
    handleSendDataNivel,
    dataSedeNivel,
    setDataSedeNivel,
    selectedValuesNivel,
  }:any = useNivelSede();

  // const {onFieldChange, onFinish}=useSedeInfra()

  const handleCloseSecondaryTable = () => {
    setSecondaryTableComponentRender(
      <Col
        span={2}
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <Spin tip="" size="large" />
      </Col>
    );

    setOptionTableSelected('')

    setDataSede(null);
    setDataSedeNivel(null)
    setIsSecondaryTableOpen(false);

    //permission view close status
    setItems(null)
    setRollOptions(null)

  };


  const useSedeInfraComponente= (
    <>
    {/* {contextHolder} */}
          <Col md={8}>
            <Card style={{width: "100%"}} className="cardInfra"
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >
              <SedeInfraEstructuraFisica/>
            </Card>
          </Col>
    </>
  )

  const handleOpenSecondaryTable = async (record, nameSideOption) => {
    handleCloseSecondaryTable();
    setIsSecondaryTableOpen(true);

    switch (nameSideOption) {
      case "useSedeJornada":
        setTableGridWidth(12);
        journySedeGetData(record);

        break;
      case "useSedeNivel":
        setTableGridWidth(12);
        nivelSedeGetData(record);
        break;
      case "useSedeInfra":
        setSecondaryTableComponentRender(useSedeInfraComponente);
        
        setTableGridWidth(12);
        setIsSecondaryTableOpen(true);
        break;

      case 'useFuncionarioPermission':
          setOptionTableSelected('useFuncionarioPermission');
          setCurrentRowInformation(record)
          setTableGridWidth(10);
          getUserRoles(record?.FK_TUSUARIO);
          break
    
        default:
            setIsSecondaryTableOpen(false);
            break;
    }
};

  useEffect(() => {
    if (dataSede) {
      const useSedeJornadaComponent = (
        <>
          {contextHolder}
          <Col md={8}>
            <Card
            style={{width: "100%"}}
              title="Tsede_jornada"
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >
              <MyForm
                data={dataSede}
                setData={setDataSede}
                handleSendData={handleSendData}
                selectedValues={selectedValues}
                // onChange={handleCheckboxChange}
                onClick={handleCloseSecondaryTable}
                rowKey="PK_TJORNADA"               
              />
            </Card>
          </Col>
        </>
      );

      setSecondaryTableComponentRender(useSedeJornadaComponent);
    } else if (dataSedeNivel) {
      const useSedeNivelComponent = (
        <>
          {contextHolder}
          <Col md={8}>
            <Card
            style={{width: "100%"}}
              title="Tsede_nivel"
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >
              <MyForm
                data={dataSedeNivel}
                setData={setDataSedeNivel}
                handleSendData={handleSendDataNivel}
                selectedValues={selectedValuesNivel}
                // onChange={handleCheckboxChange}
                onClick={handleCloseSecondaryTable}
                rowKey="PK_TNIVEL_ENSENANZA"
                
              />
            </Card>
          </Col>
        </>
      );
      setSecondaryTableComponentRender(useSedeNivelComponent);
    }

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
  }, [dataSede, dataSedeNivel, rollOptions]);

  return {
    isSecondaryTableOpen,
    handleOpenSecondaryTable,
    setIsSecondaryTableOpen,
    secondaryTableComponentRender,
    handleCloseSecondaryTable,
    tableGridWidth,
  };
};