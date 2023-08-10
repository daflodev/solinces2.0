import { Card, Row, Col } from "antd";

import { withPrincipal } from "@/components/content";

import "@/assets/noPermitionPage/noPermitionPage.css";
import TransferMatri from "@/components/transferMatricula/transferMatricula";
import useTransferMatricula from "../configuration/components/hooks/useTRansferMatricula";
// import Upload from "antd/es/upload/Upload";
import UploadDocument from "@/components/uploadDocument/uploadDocument";

const mainImageNoPermissionPage = (
    <svg width="172" height="149" viewBox="0 0 172 149" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="15" width="166" height="12" fill="#E9E7F8" />
        <path d="M169 63.5V5C169 3.89543 168.105 3 167 3H5C3.89543 3 3 3.89543 3 5L3 110.5M92.5 145H5C3.89543 145 3 144.105 3 143V133M3 124.5L3 119" stroke="var(--font-color)" stroke-width="5" stroke-linecap="round" />
        <path d="M3 27H169" stroke="var(--font-color)" stroke-width="5" />
        <path d="M63 44L146 44" stroke="var(--font-color)" stroke-width="5" stroke-linecap="round" />
        <path d="M63 56L128 56" stroke="var(--font-color)" stroke-width="5" stroke-linecap="round" />
        <path d="M26 50L32.5 56.5L44.5 44.5" stroke="#DB0000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M63 80.0003L104.5 80" stroke="var(--font-color)" stroke-width="5" stroke-linecap="round" />
        <path d="M63 92L98 92" stroke="var(--font-color)" stroke-width="5" stroke-linecap="round" />
        <path d="M26 86L32.5 92.5L44.5 80.5" stroke="#DB0000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M63 115L91.5 115" stroke="var(--font-color)" stroke-width="5" stroke-linecap="round" />
        <path d="M63 127L91.5 127" stroke="var(--font-color)" stroke-width="5" stroke-linecap="round" />
        <path d="M26 121L32.5 127.5L44.5 115.5" stroke="#DB0000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M116 86.5C116 73.5213 126.521 63 139.5 63V63C152.479 63 163 73.5213 163 86.5V104H116V86.5Z" stroke="var(--font-color)" stroke-width="5" />
        <path d="M128 86.5C128 80.1487 133.149 75 139.5 75V75C145.851 75 151 80.1487 151 86.5V103H128V86.5Z" stroke="var(--font-color)" stroke-width="5" />
        <rect x="107" y="96" width="65" height="53" rx="2" fill="#DB0000" />
        <path d="M139.5 129L139.5 136" stroke="white" stroke-width="5" stroke-linecap="round" />
        <circle cx="139.5" cy="119.5" r="9.5" stroke="white" stroke-width="5" />
        <path d="M14 15L27 15" stroke="var(--font-color)" stroke-width="5" stroke-linecap="round" />
        <path d="M146 15H145" stroke="var(--font-color)" stroke-width="5" stroke-linecap="round" />
        <path d="M158 15H157" stroke="var(--font-color)" stroke-width="5" stroke-linecap="round" />
    </svg>
)


// const query = new QueryBuilders('NAME_TABLE');
// const results = await query
// .select('*')
// .schema('SCHEMA_NAME')
// .get()

const NoPermissionPage: React.FC = () => {


    const { mockData, targetKeys, handleChange } = useTransferMatricula();    
    return (
        <>
          <div>
            <Card className="card-container">
                <div 
                    //className="no-permission-sub-container"
                    style={{height:'80vh', width:'100%', overflow: 'auto', display: 'flex', justifyContent:'center', alignItems:'center'}}
                    >
                    {/* <Row>
                        <Col span={24} offset={10}>
                            {mainImageNoPermissionPage}
                        </Col>
                        <Col span={12} offset={6}>
                            <p className="no-permission-text">
                                Lo sentimos, pero no está autorizado para acceder a esta página.
                            </p>
                        </Col>
                    </Row> */}
                <iframe style={{ border: '0px', width: '100%', height: '100%' }} src="http://localhost:4046/"></iframe>
                </div>

                <TransferMatri
                dataSource={mockData}
                targetKeys={targetKeys}
                handleChange={(newTargetKeys, direction) => handleChange(newTargetKeys, direction)} />


 <UploadDocument/>
            </Card>
        </div  >
       
        </>
    
    )
};

export default withPrincipal(NoPermissionPage);