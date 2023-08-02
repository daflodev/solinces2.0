import { Input, Table, Tooltip, Col, Row, Select } from 'antd';
import "./activitySupportDetailsStyles.css";
import { assignedActivitySupportIcon, qualificationActivitySupportIcon, receivedActivitySupportIcon, searchIcon } from '@/assets/icon/iconManager';

import { ActivitySupportDetailsHooks } from './activitySupportDetailsHooks';

import icon_four from "@/utils/assets/nav/images/rectangle-25.png";
const ActivitySupportDetails: React.FC = () => {

    const { cardActivityGenerator } = ActivitySupportDetailsHooks();

    //TODO: Ejemplo base para arreglo de objetos de actividad
    const exampleData = [
        {
            activityTitle: {
                name: 'Taller de lineamientos',
                date: 'Jueves, Agosto 3, 12:00 PM',
                score: null,
                alert: 2,
            },
            assignedSupportActivities: [
                {
                    fileID: 5,
                    fileName: 'Taller lineamientos para',
                    fileType: 'pdf',
                    date: 'Miercoles, Jul 18 del 2023 / 10:00am',
                    urlFile: 'www.aurlFile'
                },
                {
                    fileID: 5,
                    fileName: 'Taller xml file',
                    fileType: 'xml',
                    date: 'Miercoles, Jul 18 del 2023 / 10:00am',
                    urlFile: 'www.aurlFile'
                },
            ],
            supportReceivedActivities: [
                {
                    fileID: 5,
                    fileName: 'Taller lineamientos para',
                    fileType: 'pdf',
                    date: 'Miercoles, Jul 18 del 2023 / 10:00am',
                    urlFile: 'www.aurlFile'
                },
            ],
            qualifyingActivitySupport: [
                {
                    fileID: 5,
                    fileName: 'Taller lineamientos para',
                    fileType: 'pdf',
                    date: 'Miercoles, Jul 18 del 2023 / 10:00am',
                    urlFile: 'www.aurlFile'
                },
            ]
        },
        {
            activityTitle: {
                name: 'Taller de lineamientos',
                date: 'Jueves, Agosto 3, 12:00 PM',
                score: null,
                alert: 2,
            },
            assignedSupportActivities: [
                {
                    fileID: 5,
                    fileName: 'Taller lineamientos para',
                    fileType: 'pdf',
                    date: 'Miercoles, Jul 18 del 2023 / 10:00am',
                    urlFile: 'www.aurlFile'
                },
                {
                    fileID: 5,
                    fileName: 'Taller xml file',
                    fileType: 'xml',
                    date: 'Miercoles, Jul 18 del 2023 / 10:00am',
                    urlFile: 'www.aurlFile'
                },
            ],
            supportReceivedActivities: [
                {
                    fileID: 5,
                    fileName: 'Taller lineamientos para',
                    fileType: 'pdf',
                    date: 'Miercoles, Jul 18 del 2023 / 10:00am',
                    urlFile: 'www.aurlFile'
                },
            ],
            qualifyingActivitySupport: [
                {
                    fileID: 5,
                    fileName: 'Taller lineamientos para',
                    fileType: 'pdf',
                    date: 'Miercoles, Jul 18 del 2023 / 10:00am',
                    urlFile: 'www.aurlFile'
                },
            ]
        }
    ]

    //TODO: Gestionar las opciones en un hook posteriormente    
    const options: any = [];
    for (let i = 10; i < 36; i++) {
      options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
      });
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
      };

    return (
        <div className='activity_support_details_container'>
            <div className='activity_support_details_header'>
                <Row>
                    <Col xxl={{span: 2}} xl={{span: 2}} lg={{span: 3}}>
                        <img
                            className="activity_support_details_header_photo"
                            src={icon_four}
                        />
                    </Col>
                    <Col xxl={{span: 4}} xl={{span: 6}} lg={{span: 7}} className='activity_support_details_header_name'>
                        ARENAS SUAREZ RUBY ISABEL
                    </Col>
                    <Col xxl={{span: 7}} xl={{span: 2}} lg={{span: 0}}>
                    </Col>
                    <Col xxl={{span: 8}} xl={{span: 8}} lg={{span: 8}} className='activity_support_details_header_select'>
                    <Select
                          mode="multiple"
                          allowClear
                          maxTagCount= 'responsive'
                          style={{
                            width: '100%',
                          }}
                          placeholder="Actividades"
                          onChange={handleChange}
                          options={options}
                        />
                    </Col>
                    <Col xxl={{span: 1}} xl={{span: 2}} lg={{span: 2}} className='activity_support_details_header_icons'>
                        <Tooltip color='var(--dark-blue)' placement="top" title={'Asignadas'}>
                            <div className='activity_support_header_icon'>
                                {assignedActivitySupportIcon}
                            </div>
                        </Tooltip>
                    </Col>
                    
                    <Col xxl={{span: 1}} xl={{span: 2}} lg={{span: 2}} className='activity_support_details_header_icons'>
                        <Tooltip color='var(--dark-blue)' placement="top" title={'Recibidas'}>
                            <div className='activity_support_header_icon'>
                                {receivedActivitySupportIcon}
                            </div>
                        </Tooltip>
                    </Col>

                    <Col xxl={{span: 1}} xl={{span: 2}} lg={{span: 2}} className='activity_support_details_header_icons'>
                        <Tooltip color='var(--dark-blue)' placement="top" title={'Calificadas'}>
                            <div className='activity_support_header_icon'>
                                {qualificationActivitySupportIcon}
                            </div>
                        </Tooltip>
                    </Col>
                </Row>
            </div>
            <div className='activity_support_details_activity_cards'>
                <Row justify="space-between">
                    { exampleData.map((item) =>{
                        const generatedActivityCard = cardActivityGenerator(item);

                        return generatedActivityCard;
                    }) }
                </Row>
            </div>
        </div>
    )
};

export default ActivitySupportDetails;