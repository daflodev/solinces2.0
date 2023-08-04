import { useRef } from 'react';
import { Col, Divider, Row, Select, Space, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TransferComponent } from "./transferComponent/transferComponent";

import { xIcon } from '@/assets/icon/iconManager';

import "./tfuncionario_tpermitidos.css";
import { TFuncionarioTPermissionGetDataHook } from './tfuncionarioTpermitidosHook';
interface funcionarioPermissionProps {
    onClick: () => void;
    firstData: any,
    rollOptionsToAddFirst: any,
    userID: any
}

const FuncionarioPermissionComponent = (props: funcionarioPermissionProps)=>{

    const {firstData, rollOptionsToAddFirst, userID, onClick} = props

    const {
            items, 
            rollOptions, 
            mainSelectStatus, 
            setMainSelectStatus,
            mainSelectCampusStatus, 
            setMainSelectCampusStatus,
            campusSelectedToAddValue, 
            setCampusSelectedToAddValue,
            isCampusSelectedToAddValueAvailable, 
            //setIsCampusSelectedToAddValueAvailable,
            addItemCampus,
            nameCampus, 
            setNameCampus,
            rolSelectedToAddValue, 
            setRolSelectedToAddValue,
            isRolSelectedToAddValueAvailable,
            selectedRol, setSelectedRol,
            allowedMenuOptions,
            notAllowedMenuOptions,
            addItem,
            name,
            allCampus,
            //currentCampus,
            selectedCampus,
            userCampus,
            onChange,
            setName} = TFuncionarioTPermissionGetDataHook(firstData, rollOptionsToAddFirst, userID);

    const inputRef = useRef<any>(null);

    const onChangeOptionRolSelected = (_, rolSelected) => {
        setSelectedRol(rolSelected);
    }

    const onNameChange = (_, selectedOption) => {
        setRolSelectedToAddValue(selectedOption?.label)
        setName(selectedOption);
    }

    const onCampusChange = (_,selectedOption) => {
        setCampusSelectedToAddValue(selectedOption?.label)
        setNameCampus(selectedOption)
    }

    const currentTableCampusSelected = localStorage.getItem("campus");

    return(
        <div className='funcionario_permission_container'>
            <Row>
                <Col span={4}>
                    <span className='funcionario_permission_container_title'>
                        tpermitidos
                    </span>
                </Col>
                <Col span={2} offset={18}>
                    <div className='funcionario_permission_container_x_close_icon' onClick={onClick}>
                        {xIcon}
                    </div>
                </Col>
            </Row>
            <Row className='tpermitidos'>
            <span className='funcionario_permission_container_title'>
                    Sede
                </span>
                {currentTableCampusSelected == "usuario" ? 
                    (
                    userCampus != null ?
                    <Col span={8}>
                    <Select
                        className='funcionario_permission_Select'
                        style={{ width: '256px'}}
                        showSearch
                        placeholder="Sede"
                        optionFilterProp="children"
                        onChange={onChange}
                        options={userCampus?.map((item) => ({ label: item?.label, value: item?.value }))}
                        open={mainSelectCampusStatus}
                        onFocus={()=>{
                            setMainSelectCampusStatus(true);
                        }}
                        onSelect={()=>{
                            setMainSelectCampusStatus(false);
                        }}
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider style={{ margin: '8px 0', borderColor: 'rgb(233, 231, 248)' }} />
                                <Space style={{ padding: '0 8px 4px' }}>
                                    <Select
                                        style={{ width: '200px'}}
                                        showSearch
                                        placeholder="Agregar Sede"
                                        optionFilterProp="children"
                                        onChange={onCampusChange}
                                        ref={inputRef}
                                        filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input?.toLowerCase())
                                        }
                                        value={campusSelectedToAddValue}
                                        options={allCampus ? allCampus : []}
                                        onClick={()=>{
                                            setMainSelectCampusStatus(true);
                                        }}
                                        disabled={isCampusSelectedToAddValueAvailable}
                                    />
                                        {
                                            !isCampusSelectedToAddValueAvailable
                                            ?
                                            <span onClick={nameCampus != null ? addItemCampus : ()=> null} style={nameCampus != null ? {cursor: 'pointer'} : {cursor: 'not-allowed'}}>
                                                <PlusOutlined />
                                            </span>
                                            :
                                            <Spin tip="" size="small" />
                                        }
                                </Space>
                            </>
                            )}
                        />
                    </Col>
                    :
                    <Spin tip="" size="small" />
                    )
                    : null}
                    <span className='funcionario_permission_container_title'>
                    Rol
                </span>
                <Col span={8} offset={currentTableCampusSelected == "usuario" ? 2 : 0}>
                    <Select
                        className='funcionario_permission_Select'
                        style={{ width: '256px'}}
                        placeholder="Rol"
                        disabled = {selectedCampus == null ? true : false}
                        onChange={onChangeOptionRolSelected}
                        showSearch
                        open={mainSelectStatus}
                        onFocus={()=>{
                            setMainSelectStatus(true);
                        }}
                        onSelect={()=>{
                            setMainSelectStatus(false);
                        }}
                        dropdownRender={(menu) => (
                        <>
                            {menu}
                            <Divider style={{ margin: '8px 0', borderColor: 'rgb(233, 231, 248)' }} />
                            <Space style={{ padding: '0 8px 4px' }}>
                                <Select
                                    style={{ width: '200px'}}
                                    showSearch
                                    placeholder="Agregar Rol"
                                    optionFilterProp="children"
                                    onChange={onNameChange}
                                    ref={inputRef}
                                    filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input?.toLowerCase())
                                    }
                                    value={rolSelectedToAddValue}
                                    options={rollOptions ? rollOptions : []}
                                    onClick={()=>{
                                        setMainSelectStatus(true);
                                    }}
                                    disabled={isRolSelectedToAddValueAvailable}
                                />
                                    {
                                        !isRolSelectedToAddValueAvailable
                                        ?
                                        <span onClick={name != null ? addItem : ()=> null} style={name != null ? {cursor: 'pointer'} : {cursor: 'not-allowed'}}>
                                            <PlusOutlined />
                                        </span>
                                        :
                                        <Spin tip="" size="small" />
                                    }
                            </Space>
                        </>
                        )}
                        options={items?.map((item) => ({ label: item?.label, value: item?.value }))}
                    />
                </Col>
            </Row>
            { selectedRol ?
                (allowedMenuOptions != null) && (notAllowedMenuOptions != null) 
                    ? 
                        <TransferComponent
                        treeData={allowedMenuOptions} 
                        testDataNoPermission={notAllowedMenuOptions}
                        selectedRol={selectedRol}
                        userID={userID}
                        valueCampus={selectedCampus}
                        />
                    :
                        <div style={{
                            display:'flex', 
                            justifyContent:'center', 
                            alignItems:'center',
                            height: '300px'
                            }}>
                            <Spin tip="" size="large" />
                        </div>
                :
                null
            }
        </div>
    )
}

export {
    FuncionarioPermissionComponent
}