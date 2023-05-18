import React, { useEffect } from 'react';
import { Cascader } from 'antd';

import shallow from "zustand/shallow";
import { sessionInformationStore } from "../../../store/userInformationStore";

interface CampusOptions {
    value: string;
    label: string;
    children?: CampusOptions[];
}

// Just show the latest item.
const displayRender = (labels: string[]) => labels[labels.length - 1];

const CascaderHeaderFilter: React.FC<CampusOptions[]> = (options, onChange) => {

  const { currentCampus } = sessionInformationStore(
    (state) => ({
      currentCampus: state.currentCampus,
    }), shallow);

  return(
    <Cascader
      options={options}
      expandTrigger="hover"
      displayRender={displayRender}
      onChange={onChange}
      value={currentCampus?.label}
    />
  )
};

export{CascaderHeaderFilter};