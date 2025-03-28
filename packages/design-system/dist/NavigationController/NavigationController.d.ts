import React from "react";
export type NavigationControllerPanel = {
    id: string;
    title: string;
    element: React.ReactElement;
};
export type NavigationControllerProps = {
    panels: NavigationControllerPanel[];
};
export declare const NavigationController: React.FC<NavigationControllerProps>;
//# sourceMappingURL=NavigationController.d.ts.map