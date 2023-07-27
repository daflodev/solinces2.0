import { UserSettings } from "../mainDrawersComponents/userSettings"

import { mainDrawerStore } from '../../../store/mainDrawerStore';
import { shallow } from 'zustand/shallow';
import './drawerRender.css'


const DrawerRender: React.FC = () => {
    
    const { renderContent } = mainDrawerStore(
        (state) => ({
          renderContent: state.renderContent,
        }),
        shallow
    );

    const renderContentDigestor = (componentName) => {

      let renderComponent = <></>;

      switch (componentName) {
        case "userSettings":

          renderComponent = <UserSettings/>

          break;
      
        default:

          console.warn("The render element is not register")

          break;
      }

      return renderComponent
    }

    return(
        <>
          {renderContentDigestor(renderContent)}
        </>
    )
};

export{DrawerRender};