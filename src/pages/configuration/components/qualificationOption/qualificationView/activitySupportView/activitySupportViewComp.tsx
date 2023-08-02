import { Input, Table, Tooltip, Col, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import "./activitySupportViewStyles.css";
import { assignedActivitySupportIcon, qualificationActivitySupportIcon, receivedActivitySupportIcon, searchIcon } from '@/assets/icon/iconManager';

import ActivitySupportDetails from './activitySupportDetails/activitySupportDetails';

const ActivitySupportViewComp: React.FC = () => {

    const columns: ColumnsType<any> = [
        {
          title: <div className="search_input_header">
                    <Input size="large" placeholder="Apellidos y nombres" prefix={searchIcon} />
                  </div>,
          dataIndex: 'name',
          key: 'name',
          width: '150',
          className:'activity_support_search_name_style',
          render: (text) => text?.toUpperCase(),
        },{
              title: <Tooltip color='var(--dark-blue)' placement="top" title={'Asignadas'}><div className='activity_support_header_icon'>{assignedActivitySupportIcon}</div></Tooltip>,
              key: 'assigned',
              dataIndex: 'assigned',
              width: '150',
              render: (_, { assigned }) => {

                //TODO: agreagr condicion para exclamacion con marca
                return(
                    <div className='column_value_container'>
                        {assigned}
                    </div>
                )
                },
            },{
                title: <Tooltip color='var(--dark-blue)' placement="top" title={'Recibidas'}><div className='activity_support_header_icon'>{receivedActivitySupportIcon}</div></Tooltip>,
                key: 'received',
                dataIndex: 'received',
                width: '150',
                render: (_, { received }) => {
  
                  //TODO: agreagr condicion para exclamacion con marca
                  return(
                      <div className='column_value_container'>
                          {received}
                      </div>
                  )
                  },
            }, {
                title: <Tooltip color='var(--dark-blue)' placement="top" title={'Calificadas'}><div className='activity_support_header_icon'>{qualificationActivitySupportIcon}</div></Tooltip>,
                key: 'qualified',
                dataIndex: 'qualified',
                width: '150',
                render: (_, { qualified }) => {
  
                  //TODO: agreagr condicion para exclamacion con marca
                  return(
                      <div className='column_value_container'>
                          {qualified}
                      </div>
                  )
                  },
            },{
                title: '',
                key: 'score',
                dataIndex: 'score',
                width: '150',
                render: (_, { score }) => {
  
                  //TODO: agreagr condicion para exclamacion con marca
                  //TODO: agregar condiciones para cambio de color en la nota
                  return(
                      <div className='column_value_container'>
                        <div className='column_value_container_score'>
                            {score}
                        </div>
                      </div>
                  )
                  },
            }
    ];

    const data: any[] = [
        {
          key: '1',
          name: 'Arenas Suarez Ruby',
          assigned: '4',
          received: '1',
          qualified: '1/2',
          score: '4,4'
        },{
            key: '1',
            name: 'Arenas Suarez Ruby',
            assigned: '4',
            received: '1',
            qualified: '1/2',
            score: '4,4'
          },{
            key: '1',
            name: 'Arenas Suarez Ruby',
            assigned: '4',
            received: '1',
            qualified: '1/2',
            score: '4,4'
          },{
            key: '1',
            name: 'Arenas Suarez Ruby',
            assigned: '4',
            received: '1',
            qualified: '1/2',
            score: '4,4'
          },{
            key: '1',
            name: 'Arenas Suarez Ruby',
            assigned: '4',
            received: '1',
            qualified: '1/2',
            score: '4,4'
          },
    ]

    return (
        <>
            <div className='activity_support_container'>
                <span className='activity_support_title'>
                    tsoporte de actividades
                </span>
                <br/>
                <br/>
                <Row>
                <Col className='activity_support_table_name' span={10}>  
                    <Table 
                        columns={columns} 
                        dataSource={data} 
                        pagination={false}
                    />
                </Col>
                <Col span={1}>
                </Col>
                <Col span={13}>
                    <ActivitySupportDetails/>
                </Col>  
                </Row>
            </div>
        </>
    )
};

export default ActivitySupportViewComp;