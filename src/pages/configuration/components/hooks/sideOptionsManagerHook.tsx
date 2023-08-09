import { useEffect, useState } from "react";

import { TFuncionarioTPermissionGetDataHook } from "../optionsRender/tfuncionario_tpermitidos/tfuncionarioTpermitidosHook";
import { FuncionarioPermissionComponent } from "../optionsRender/tfuncionario_tpermitidos/tfuncionario_tpermitidos";
import {TPeriodoPermissionGetDataHook} from "../optionsRender/tperiodo_permisos/tperiodo_permisosHook";
import TPeriodoPermisos from "../optionsRender/tperiodo_permisos/TPeriodoPermisos";

import MyForm from "@/components/tableCheckbox/tableChecBox";
import { Card, Col, Spin } from "antd";
import { equisIcon } from "@/assets/icon/iconManager";
import { useNivelSede } from "./useSedeNivel";
import { useSedeInfra } from "./useSedeInfra";
import { useSedeTecnology } from "./useSedeInformatica";
import { useSedePerifericos } from "./usePerifericosMedios";
import { useFormTperiodo } from "./useTperiodoAcademico";
import SedeInfraEstructuraFisica from "@/components/formSedeInfra";
import { useJournySede } from "./useSedeJornada";
import useTransferData from "./useTRansferMatricula";
import TransferMatri from "@/components/transferMatricula/transferMatricula";

import { shallow } from "zustand/shallow";

import { sessionInformationStore } from "@/store/userInformationStore";

export const SideOptionsManagerHook = () => {
  const [optionTableSelected, setOptionTableSelected] = useState("");

  const [isSecondaryTableOpen, setIsSecondaryTableOpen] = useState(false);

  const [tableGridWidth, setTableGridWidth] = useState(12);

  const [currentRowInformation, setCurrentRowInformation] = useState<any>(null);

  const { getUserRoles, items, setItems, rollOptions, setRollOptions }: any =
    TFuncionarioTPermissionGetDataHook();

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

  const {
    dataSedeInfra,
    initialValues,
    resultado,
    infraFKData,
    handleFormSubmit,
    contextHolderInfra,
    colunmField,
    dataSeelect,
    newApiget,
    setDataSedeInfra,
    columnInfoINFRA,
  } = useSedeInfra();

  const {
    // form,
    dataSedeTecnology,
    dataSeelectTec,
    sedeTecnologyGet,
    initialValuesTec,
    setDataSedeTecnology,
    resultadoInformatifca,
    TecnologyFKData,
    // handleFormSubmitTec,
    contextHolderTecnology,
    columInfoPeriodoTecnology,
    colunmFieldTecnology,
    onSubmitTecnology,
  } = useSedeTecnology();

  const {
    dataSedePerifericos,
    perifericosSedeGetData,
    initialValuesPerifericos,
    handleFormSubmitPerifericos,
    resultadoPerifericos,
    FKDataPerifericos,
    setDataSedePerifericos,
    contextHolderPerifericos,
    columInfoPerifericos,
    colunmFieldPerifericos,
    dataSelectPerifericos,
  } = useSedePerifericos();

  const {
    apiGet,
    initialValuesPeriodo,
    periodoFKData,
    resultadoPeriodo,
    dataTperiodo,
    handleSubmitPeriodo,
    dataSeelectPeriodo,
    columInfoPeriodo,
    colunmFieldPeriodo,
    FKConsultManager,
    fkGroup,
    fkGroupTFormatoACT,
    // combinedObject,
    FKConsultManagerFKTFormatoACT, contextHolderPeriodo,
  } = useFormTperiodo();

  const {
    functionPeriodoPermisos,
    dataPeriodoPermisos,
    setdataPeriodoPermisos
  }  = TPeriodoPermissionGetDataHook()

  const { mockData, targetKeys, handleChange, setMockData } = useTransferData();
  // const { handleTransferChange,
  //   subjectsData,
  //   enrolledSubjects, } = useTransferMatricula()
  const { currentCampus } = sessionInformationStore(
    (state) => ({
      currentCampus: state.currentCampus,
    }), shallow);

  // const {PostData} = useTperiodo
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

    setOptionTableSelected("");

    setDataSede(null);
    setDataSedeNivel(null);
    setDataSedeInfra(null);
    setDataSedeTecnology(null);
    setDataSedePerifericos(null);
    setIsSecondaryTableOpen(false);
    setMockData([])
    //permission view close status
    setItems(null);
    setRollOptions(null);
  };

  const handleOpenSecondaryTable = async (record, nameSideOption) => {
    // console.log(record)
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
        setTableGridWidth(12);
        newApiget(record);
        infraFKData();
        columnInfoINFRA(record);
        setOptionTableSelected("useSedeInfra");
        setCurrentRowInformation(record);
        break;

      case "useSedeTecnology":
        setTableGridWidth(12);
        sedeTecnologyGet(record);
        TecnologyFKData();
        columInfoPeriodoTecnology(record);
        setOptionTableSelected("useSedeTecnology");
        setCurrentRowInformation(record)
        break;

      case "useSedePerifericos":
        setTableGridWidth(12);
        perifericosSedeGetData(record);
        FKDataPerifericos()
        columInfoPerifericos(record)
        setOptionTableSelected("useSedePerifericos")
        setCurrentRowInformation(record)

        break;
      case "useTperiodo":
        setTableGridWidth(12);
        apiGet(record);
        columInfoPeriodo(record);
        setOptionTableSelected("useTperiodo");
        setCurrentRowInformation(record);
        periodoFKData()
        FKConsultManager(['FK_TESCALA', 'FK_TFORMATO_CALIFICACION'], record)
        FKConsultManagerFKTFormatoACT(['FK_TFORMATO_CALIFICACION'])


        break;
      case "useFuncionarioPermission":
        setOptionTableSelected("useFuncionarioPermission");
        setCurrentRowInformation(record);
        setTableGridWidth(10);
        getUserRoles(record.FK_TUSUARIO ? record?.FK_TUSUARIO : record?.PK_TUSUARIO, currentCampus?.value);
        break;

      case "useTransferMatricula":
        setOptionTableSelected("useTransferMatricula");
        // setCurrentRowInformation(record.PK_TMATRICULA);
        setTableGridWidth(10);

        break;

      case "TPeriodoPermisos":
        setTableGridWidth(12);
        functionPeriodoPermisos(record)
        setOptionTableSelected("TPeriodoPermisos");
        setdataPeriodoPermisos(["periodo"])
      
      break;


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
    }
    if (
      dataSedeInfra &&
      optionTableSelected === "useSedeInfra" &&
      colunmField && dataSeelect
    ) {

      const useSedeInfraComponente = (
        <>
          {contextHolderInfra}

          <Col md={8}>
            <Card
              style={{ width: "100%" }}
              title="Tsede_infraestructura_fisica"
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >
              <SedeInfraEstructuraFisica
                initialValues={initialValues}
                dataselect={resultado}
                handleFormSubmit={handleFormSubmit}
                onClick={handleCloseSecondaryTable}
                columnInfo={colunmField}
                record={currentRowInformation.PK_TSEDE}
              />
            </Card>
          </Col>
        </>
      );

      setSecondaryTableComponentRender(useSedeInfraComponente);
    }
    if (
      dataSedeTecnology &&
      optionTableSelected === "useSedeTecnology" &&
      colunmFieldTecnology && dataSeelectTec
    ) {

      const useSedeTecnologyComponente = (
        <>
          {contextHolderTecnology}

          <Col md={8}>
            <Card
              style={{ width: "100%" }}
              title="Tsede_informatica"
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >
              <SedeInfraEstructuraFisica
                initialValues={initialValuesTec}
                dataselect={resultadoInformatifca}
                handleFormSubmit={onSubmitTecnology}
                onClick={handleCloseSecondaryTable}
                columnInfo={colunmFieldTecnology}
                record={currentRowInformation.PK_TSEDE}
              />
            </Card>
          </Col>
        </>
      );

      setSecondaryTableComponentRender(useSedeTecnologyComponente);
    }
    if (dataSedePerifericos && optionTableSelected === "useSedePerifericos" && colunmFieldPerifericos && dataSelectPerifericos) {

      const useSedePerifericos = (
        <>
          {contextHolderPerifericos}
          <Col md={8}>
            <Card
              style={{ width: "100%" }}
              title="Tperifericos_medios"
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >
              <SedeInfraEstructuraFisica
                initialValues={initialValuesPerifericos}
                dataselect={resultadoPerifericos}
                handleFormSubmit={handleFormSubmitPerifericos}
                onClick={handleCloseSecondaryTable}
                columnInfo={colunmFieldPerifericos}
                record={currentRowInformation.PK_TSEDE}
              />
            </Card>
          </Col>
        </>
      );
      setSecondaryTableComponentRender(useSedePerifericos);
    }

    if (dataPeriodoPermisos && optionTableSelected === "TPeriodoPermisos") {

      const componentePeriodoPermisos = (
        <TPeriodoPermisos/>
      )
      setSecondaryTableComponentRender(componentePeriodoPermisos)

    }
    // console.log(dataTperiodo);
    // console.log(colunmFieldPeriodo);
    // console.log(resultadoPeriodo);
    // console.log(dataSeelectPeriodo);
    if (
      dataTperiodo &&
      optionTableSelected === "useTperiodo" &&
      colunmFieldPeriodo && fkGroup && fkGroupTFormatoACT
    ) {

      const tPerido = (
        <>
          {contextHolderPeriodo}
          <Col md={8}>
            <Card
              style={{ width: "100%" }}
              title="Periodo_academico_config"
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >
              <SedeInfraEstructuraFisica
                initialValues={initialValuesPeriodo}
                dataselect={resultadoPeriodo}
                onClick={handleCloseSecondaryTable}
                handleFormSubmit={handleSubmitPeriodo}
                columnInfo={colunmFieldPeriodo}
                record={currentRowInformation.PK_TPERIODO_ACADEMICO}
                dataSelectFormatoTE={fkGroup}
              />
            </Card>
          </Col>
        </>
      );
      setSecondaryTableComponentRender(tPerido);
    }

    if (
      items &&
      rollOptions &&
      optionTableSelected == "useFuncionarioPermission"
    ) {
      const useFuncionarioPermissionComponent = (
        <Col md={10}>
          <Card
            className="justify-content-center align-items-center "
            style={{ background: "var(--bg-color)", border: "0" }}
          >
            <FuncionarioPermissionComponent
              firstData={items}
              rollOptionsToAddFirst={rollOptions}
              userID={
                currentRowInformation.FK_TUSUARIO
                  ? currentRowInformation?.FK_TUSUARIO
                  : currentRowInformation?.PK_TUSUARIO
              }
              onClick={handleCloseSecondaryTable}
            />
          </Card>
        </Col>
      );

      setSecondaryTableComponentRender(useFuncionarioPermissionComponent);
    }

    if (mockData && optionTableSelected === "useTransferMatricula") {

      const useTransferMatricula = (
        <>
          {/* {contextHolderPerifericos} */}
          <Col md={8}>
            <Card
              style={{ width: "100%" }}
              // title={["Asignaturas matriculas"]}
              extra={<div onClick={handleCloseSecondaryTable}>{equisIcon}</div>}
            >


              <TransferMatri
                dataSource={mockData}
                targetKeys={targetKeys}
                handleChange={(newTargetKeys, direction) => handleChange(newTargetKeys, direction)} />

            </Card>
          </Col>
        </>
      );
      setSecondaryTableComponentRender(useTransferMatricula);
    }
  }, [
    dataSede,
    dataSedeNivel,
    rollOptions,
    dataSedeInfra,
    colunmField,
    dataSeelect,
    dataSedeTecnology,
    colunmFieldTecnology,
    dataSeelectTec,
    dataSedePerifericos,
    dataSelectPerifericos,
    colunmFieldPerifericos,
    dataTperiodo,
    colunmFieldPeriodo,
    dataSeelectPeriodo,
    dataPeriodoPermisos
  ]);

  return {
    isSecondaryTableOpen,
    handleOpenSecondaryTable,
    setIsSecondaryTableOpen,
    secondaryTableComponentRender,
    handleCloseSecondaryTable,
    tableGridWidth,
  };
};
