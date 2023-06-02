import React from "react";
import { Drawer } from 'antd';
import HeaderComponent from "../../../config/shared/header";

import { DrawerRender } from "./drawerRender";

import shallow from "zustand/shallow";
import { mainDrawerStore } from "../../../store/mainDrawerStore";


const ContentComponents = ({ children }: {children: any}) => {

    const { isOpen, withDrawer } = mainDrawerStore(
        (state) => ({
            isOpen: state.isOpen,
            withDrawer: state.withDrawer
        }),
        shallow
    );

    const { close } = mainDrawerStore()

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        overflow: 'auto',
    };

    return (
        <>
            <nav>
                <HeaderComponent/>
            </nav>

            <main>
                <div style={containerStyle}>
                    {children}
                    <Drawer
                        placement="right"
                        open={isOpen}
                        getContainer={false}
                        width={`${withDrawer}%`}
                        destroyOnClose={true}
                        closable={false}
                    >
                        {DrawerRender()}
                    </Drawer>
                </div>
            </main>
        </>
    );
};

export const withPrincipal = (component: any) => {
    const Component = component;

    return (): React.ReactElement => {
        return (
            <ContentComponents >
                <Component />
            </ContentComponents>
        );
    };
};

export default ContentComponents;
