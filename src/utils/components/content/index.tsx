import React from "react";
import { Drawer } from 'antd';
import HeaderComponent from "../../../config/shared/header";

import { DrawerRender } from "./drawerRender";

import shallow from "zustand/shallow";
import { mainDrawerStore } from "../../../store/mainDrawerStore";


const ContentComponents = ({ children }: {children: any}) => {

    const { isOpen } = mainDrawerStore(
        (state) => ({
            isOpen: state.isOpen,
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
                        title="Basic Drawer"
                        placement="right"
                        closable={true}
                        onClose={close}
                        open={isOpen}
                        getContainer={false}
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
