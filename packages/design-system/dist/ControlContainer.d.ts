import React, { ReactNode } from "react";
import { Icon } from "./icons";
export type ControlProps = {
    icon?: Icon;
    iconBlack?: boolean;
    controlSize?: any;
    iconOnly?: boolean;
    error?: boolean;
    withBorder?: boolean;
    hasError?: boolean;
    disabled?: boolean;
};
export declare const ControlContainer: React.FC<ControlProps & {
    children: ReactNode;
    className?: string;
}>;
export declare function getControlPadding(): import("styled-components").RuleSet<ControlProps>;
//# sourceMappingURL=ControlContainer.d.ts.map