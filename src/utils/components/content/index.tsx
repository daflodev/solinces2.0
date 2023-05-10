import React from "react";
import HeaderComponent from "../../../config/shared/header";


const ContentComponents = ({ children }: {children: any}) => {


    return (
        <>
            <nav>
                <HeaderComponent/>
            </nav>

            <main>
                {children}
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
