import { Col, Row, List } from 'antd';
import { useState } from "react";

import {
    CalendarTwoTone
  } from '@ant-design/icons';
import { alertExclamationIcon, downloadIcon, testFileIcon, unknownIcon } from '@/assets/icon/iconManager';

export const ActivitySupportDetailsHooks = () => {

    //TODO: crear version modificada dependiendo de la categoria del archivo
    //TODO: crear mensaje en al saldia en caso que el arreglo de archivos este vacio
    //TODO: ajustar asignacion de icono segun el tipo de archivo
    const listFiles = (filesArrays) =>{

        const answer = (
            <List
            itemLayout="horizontal"
            dataSource={filesArrays}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  avatar={testFileIcon}
                  title={<div style={{fontSize:'1rem', fontWeight:'400'}}>{item?.fileName}</div>}
                  description={<div style={{fontSize:'.8rem', fontWeight:'400', color:'var(--high-gray)'}}>{item?.date}</div>}
                />
              </List.Item>
            )}
          />
        )

        return answer;
    }

    //TODO: funsion demo para creacon de activitycards
    const cardActivityGenerator = (fullData)=>{

        const { 
                activityTitle, 
                assignedSupportActivities, 
                supportReceivedActivities, 
                qualifyingActivitySupport
        } = fullData;

        const answer = (
            <Col span={12} xxl={12} xl={11} lg={24} className='activity_cards'>
            <div style={{border: '1px solid var(--mid-gray)', borderRadius: '8px'}}>
            <Row>
                <Col span={24} style={{backgroundColor: 'var(--low-gray)', padding:'10px'}}>
                    <Row>
                        <Col span={2} xxl={2} xl={4} className='activity_cards_exclamation_icon'>
                            {alertExclamationIcon}
                        </Col>  
                        <Col span={20} xxl={20} xl={17} className='activity_cards_activity_name'>
                            {activityTitle?.name}
                        </Col>
                        <Col span={2} xxl={2} xl={3}>
                            <div className='activity_cards_activity_name_alert'>
                                {activityTitle?.alert}
                            </div>
                        </Col>
                        <Col span={18} offset={2} xxl={18} xl={16}>
                            <div className='activity_cards_date_information'>
                                {<CalendarTwoTone twoToneColor='var(--high-gray)'/>} Fecha limite de entrega:
                                <span></span>   
                                {activityTitle?.date}
                            </div>
                        </Col>
                        <Col span={2} xxl={2} xl={3}>
                            {unknownIcon}
                        </Col>
                        <Col span={2} xxl={2} xl={3}>
                            <div className='activity_cards_score'>
                                SC
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} style={{padding:'10px'}}>
                    <Row>
                        <Col span={22} className='activity_cards_file_category'>
                            Soporte de actividades asigandas
                        </Col>
                        <Col span={2}>
                            {downloadIcon}
                        </Col>
                        <Col span={24}>
                            <div className='activity_cards_file_list'>
                                {listFiles(assignedSupportActivities)}
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} style={{padding:'10px'}}>
                    <Row>
                        <Col span={24} className='activity_cards_file_category'>
                            Soporte de actividades recibidas
                        </Col>
                        <Col span={24}>
                            <div className='activity_cards_file_list'>
                                {listFiles(supportReceivedActivities)}
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} style={{padding:'10px'}}>
                    <Row>
                        <Col span={22} className='activity_cards_file_category'>
                            Soporte de actividades calificadas
                        </Col>
                        <Col span={2}>
                            {downloadIcon}
                        </Col>
                        <Col span={24}>
                            <div className='activity_cards_file_list'>
                                {listFiles(qualifyingActivitySupport)}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </div>
            </Col>)

        return answer;
    }

    return {
        cardActivityGenerator
    };
};
