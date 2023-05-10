import React from 'react';
import { Cascader } from 'antd';

interface CampusOptions {
    value: string;
    label: string;
    children?: CampusOptions[];
}

const onChange = (value: any) => {
  console.log(value);
};

// Just show the latest item.
const displayRender = (labels: string[]) => labels[labels.length - 1];

const CascaderHeaderFilter: React.FC<CampusOptions[]> = (options) => (
  <Cascader
    options={options}
    expandTrigger="hover"
    displayRender={displayRender}
    onChange={onChange}
    //TODO: debe tomar el valor del primero con el que va a cargar
    //defaultValue=""
  />
);

export{CascaderHeaderFilter};