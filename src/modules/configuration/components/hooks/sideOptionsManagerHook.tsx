import { useEffect, useState } from "react";
import { useJournySede } from "./useSedeJornada";
import { TFuncionarioTPermissionGetDataHook } from '../optionsRender/tfuncionario_tpermitidos/tfuncionarioTpermitidosHook';
import { FuncionarioPermissionComponent } from "../optionsRender/tfuncionario_tpermitidos/tfuncionario_tpermitidos"

import MyForm from "@/utils/components/tableCheckbox/tableChecBox";
import { Card, Col, Spin } from "antd";
import { equisIcon } from "../../../../utils/assets/icon/iconManager";
import { useNivelSede } from "./useSedeNivel";
import SedeInfraEstructuraFisica from "../../../../utils/components/formSedeInfra";
import { useSedeInfra } from "./useSedeInfra";
import { useSedeTecnology } from "./useSedeInformatica";

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
    useState(<Spin tip="" size="large" />);

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
  }: any = useNivelSede();


  const { dataSedeInfra, infraSedeGetData, initialValues, resultado, infraFKData, handleFormSubmit, contextHolderInfra } = useSedeInfra()

  const {
    form,
    dataSedeTecnology,
    TecnologySedeGetData,
    initialValuesTec,


    TecnologyFKData,
  } = useSedeTecnology()

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



  const handleOpenSecondaryTable = async (record, nameSideOption) => {
    handleCloseSecondaryTable();
    setIsSecondaryTableOpen(true);

    switch (nameSideOption) {
      case "useSedeJornada":
        setTableGridWidth(12);
        journySedeGetData(record);

        break;
      case "useSedeNivel":
        setTableGridWidth(16);
        nivelSedeGetData(record);

        break;
      case "useSedeInfra":

        setTableGridWidth(16);
        infraSedeGetData(record)

        break;

      case "useSedeTecnology":
        setTableGridWidth(16);
        TecnologySedeGetData(record)
        break;

      default:
        setIsSecondaryTableOpen(false);
        break;

      case 'useFuncionarioPermission':
          setOptionTableSelected('useFuncionarioPermission');
          setCurrentRowInformation(record)
          setTableGridWidth(10);
          getUserRoles(record.FK_TUSUARIO ? record?.FK_TUSUARIO : record?.PK_TUSUARIO);
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
              style={{ width: "100%" }}
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
              style={{ width: "100%" }}
              title="Tsede_nivel"
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >
              <MyForm
                data={dataSedeNivel}
                setData={setDataSedeNivel}
                selectedValues={selectedValuesNivel}
                // onChange={handleCheckboxChange}
                handleSendData={handleSendDataNivel}
                onClick={handleCloseSecondaryTable}
                rowKey="PK_TNIVEL_ENSENANZA"

              />
            </Card>
          </Col>
        </>
      );
      setSecondaryTableComponentRender(useSedeNivelComponent);
    } else if (dataSedeInfra) {
      infraFKData()

      const useSedeInfraComponente = (
        <>
          {contextHolderInfra}

          <Col md={8}>
            <Card style={{ width: "100%" }}
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >
              <SedeInfraEstructuraFisica initialValues={initialValues} dataselect={resultado} handleFormSubmit={handleFormSubmit} onClick={handleCloseSecondaryTable} />
            </Card>
          </Col>
        </>
      )

      setSecondaryTableComponentRender(useSedeInfraComponente);
    } else if (dataSedeTecnology ) {

      const useSedeTecnologyComponente = (
        <>
          {/* {contextHolder} */}

          <Col md={8}>
            <Card style={{ width: "100%" }}
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >
              <SedeInfraEstructuraFisica initialValues={initialValuesTec} />
            </Card>
          </Col>
        </>
      )

      setSecondaryTableComponentRender(useSedeTecnologyComponente);
    }

    if(items && rollOptions && (optionTableSelected == 'useFuncionarioPermission')){
    
        const useFuncionarioPermissionComponent = (
            <Col md={10}>
                <Card className="justify-content-center align-items-center " style={{background: 'var(--bg-color)', border: '0'}}>
                    <FuncionarioPermissionComponent
                        firstData={items}
                        rollOptionsToAddFirst={rollOptions}
                        userID={currentRowInformation.FK_TUSUARIO ? currentRowInformation?.FK_TUSUARIO : currentRowInformation?.PK_TUSUARIO}
                        onClick={handleCloseSecondaryTable}
                    />
                </Card>
            </Col>
        );

        setSecondaryTableComponentRender(useFuncionarioPermissionComponent);
    }
  }, [dataSede, dataSedeNivel, rollOptions, dataSedeInfra]);

  return {
    isSecondaryTableOpen,
    handleOpenSecondaryTable,
    setIsSecondaryTableOpen,
    secondaryTableComponentRender,
    handleCloseSecondaryTable,
    tableGridWidth,
  };
};