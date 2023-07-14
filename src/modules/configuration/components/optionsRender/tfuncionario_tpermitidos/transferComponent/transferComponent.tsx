/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import React from 'react';

import { Checkbox, Col, Row, Divider, Collapse, Input } from 'antd';

import { RightSquareTwoTone, LeftSquareTwoTone, SearchOutlined } from '@ant-design/icons';

import { TransferComponentHook } from './transferComponentHook';

import {
    saveIcon
} from "@/utils/assets/icon/iconManager";

import "./transferComponent.css";

interface InterfaceToGenerateTransferComponent {
    treeData: any, 
    testDataNoPermission: any, 
    selectedRol: any,
    userID: any,
    valueCampus : any,
}

const TransferComponent: React.FC = (props: InterfaceToGenerateTransferComponent ) => {

    const {treeData, testDataNoPermission, selectedRol, userID, valueCampus} = props;

    const { Panel } = Collapse;

    const {
        checkedList, setCheckedList,
        indeterminate, setIndeterminate,
        checkAll,
        checkedListNoPermission, setCheckedListNoPermission,
        indeterminateNoPermission, setIndeterminateNoPermission,
        checkAllNoPermission,
        onChange,
        onCheckAllChange,
        onChangeNoPermission,
        onCheckAllChangeNoPermission,
        optionsColumnData,
        noPermissionColumnData,
        transferElementFunction,
        setOptionsColumnData,
        setNoPermissionColumnData,
        rightSearchBarValue, setRightSearchBarValue,
        leftSearchBarValue, setLeftSearchBarValue,
        filterProcess,
        updatePermissions,
        contextHolder
    } = TransferComponentHook(treeData, testDataNoPermission, valueCampus);

    const onChangeRightSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        setIndeterminate(false)
        setCheckedList([])
        setRightSearchBarValue(e.target.value);
    };

    const onChangeLeftSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        setIndeterminateNoPermission(false)
        setCheckedListNoPermission([])
        setLeftSearchBarValue(e.target.value);
    };

    const extractChildrenElements = (fullData, parentKey) =>{
        const answer = fullData.filter(element => element?.parent == parentKey);

        return answer;
    };

    const checkBoxColumnGenerator = (data, value, onChangeFunction, filterValue) => {

        const filteredData = filterProcess(filterValue, data);

        const defaultKeysActive = filteredData?.map((item)=>{
            if(!item?.parent){
                return(item.key + '_panel')
            }});

        const answer = (
            <Checkbox.Group style={{'width': '100%'}} value={value} onChange={onChangeFunction}>
                <Collapse defaultActiveKey={defaultKeysActive} collapsible='icon' style={{'width': '100%'}} ghost>
                    {
                        filteredData?.map((item)=>{
                            if(!item?.parent){
                                const childrenElements = extractChildrenElements(filteredData, item.key);

                                const collapseElement = (
                                            <>
                                                <Panel header={
                                                    <Checkbox style={
                                                        {fontSize: '1rem', fontWeight: 'bold'}} 
                                                        value={item.key}>{item.title}
                                                    </Checkbox>
                                                    } 
                                                    key={item.key + '_panel'}
                                                >
                                                    <Row>
                                                        {childrenElements.map((i) => {
                                                            return(
                                                                <>                                              
                                                                    <Col span={24}>
                                                                        <Checkbox value={i.key}>{i.title}</Checkbox>
                                                                    </Col>
                                                                    <Divider style={{ margin: '10px 0', borderColor: 'rgb(233, 231, 248)' }}/>
                                                                </>
                                                            )
                                                        })}
                                                    </Row>
                                                </Panel>
                                            </>
                                )
                                return collapseElement;
                            }
                    })}
                </Collapse>
            </Checkbox.Group>
        );

        return answer
    };

    return(
        <>
            {contextHolder}
            <Divider style={{ borderColor: 'rgb(233, 231, 248)' }}/>
            <Row className='transfer_component'>
                <Col span={11}>
                    <div className='transfer_component_table_container' >
                        <Row>
                            <Col span={24} style={
                                {paddingBottom: '10px', fontSize: '1rem', fontWeight: 'bold'}}>
                                Opciones de Menu
                            </Col>
                            <Col span={24} style={
                                {fontSize: '0.5rem', fontWeight: 'bold'}}>
                                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                    Todos
                                </Checkbox>
                            </Col>
                                <Divider style={{ margin: '15px 0', borderColor: 'rgb(233, 231, 248)' }}/>
                            <Col span={24}>
                                <Input addonBefore={<SearchOutlined />} placeholder="large size" onChange={onChangeRightSearch}
                                />
                            </Col>
                            {checkBoxColumnGenerator(optionsColumnData, checkedList, onChange, rightSearchBarValue)}
                        </Row>
                    </div>
                </Col>
                <Col span={2}>
                    <div className='transfer_component_icons_transfer_container'>
                        <span 
                            className='transfer_component_icons_transfer'
                            onClick={()=>{
                                    if(checkedList.length > 0){
                                        transferElementFunction(checkedList, setCheckedList, noPermissionColumnData, optionsColumnData, setNoPermissionColumnData, setOptionsColumnData);
                                        setIndeterminate(false);
                                    }
                                }}
                        >
                            <RightSquareTwoTone twoToneColor={ checkedList.length == 0 ? "#C0C0C0": undefined}/>
                        </span>
                        <br/>
                        <span 
                            className='transfer_component_icons_transfer'
                            onClick={()=>{
                                    if(checkedListNoPermission.length > 0){
                                        transferElementFunction(checkedListNoPermission, setCheckedListNoPermission, optionsColumnData, noPermissionColumnData, setOptionsColumnData, setNoPermissionColumnData);
                                        setIndeterminateNoPermission(false);
                                    }
                                }}
                        >
                            <LeftSquareTwoTone twoToneColor={ checkedListNoPermission.length == 0 ? "#C0C0C0": undefined}/>
                        </span>
                    </div>
                </Col>
                <Col span={11}>
                    <div className='transfer_component_table_container' >
                        <Row>
                            <Col span={24} style={
                                {paddingBottom: '10px', fontSize: '1rem', fontWeight: 'bold'}}>
                                Acciones no permitidas
                            </Col>
                            <Col span={24} style={
                                {fontSize: '0.5rem', fontWeight: 'bold'}}>
                                <Checkbox indeterminate={indeterminateNoPermission} onChange={onCheckAllChangeNoPermission} checked={checkAllNoPermission}>
                                    Todos
                                </Checkbox>
                            </Col>
                            <Divider style={{ margin: '15px 0', borderColor: 'rgb(233, 231, 248)' }}/>
                            <Col span={24}>
                                <Input addonBefore={<SearchOutlined />} placeholder="large size" onChange={onChangeLeftSearch}/>
                            </Col>
                            {checkBoxColumnGenerator(noPermissionColumnData, checkedListNoPermission, onChangeNoPermission, leftSearchBarValue)}
                        </Row>  
                    </div>
                </Col>
                <Col span={24}>
                    <div style={{display:'flex', justifyContent:'flex-end', paddingTop:'0.5rem', paddingRight: '1rem'}}>
                        <span onClick={()=>{updatePermissions(optionsColumnData, noPermissionColumnData, userID, selectedRol)}}>
                            {saveIcon}
                        </span>
                    </div>
                </Col>
                
            </Row>
        </>
    );
};

export {TransferComponent};