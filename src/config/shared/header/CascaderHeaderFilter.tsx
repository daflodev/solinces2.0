import React from 'react';
import { Cascader } from 'antd';

import shallow from "zustand/shallow";
import { downDirectionVector } from "./menu/menu-icons";

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
    <div className="btn3-j68">
      <div>
        <Cascader
          options={options}
          expandTrigger="hover"
          displayRender={displayRender}
          onChange={onChange}
          // @ts-ignore
          value={currentCampus?.label}
          suffixIcon={downDirectionVector}
        />
      </div>
    </div>
  )
};

export{CascaderHeaderFilter};