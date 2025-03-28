import React, { ReactNode } from "react";
import { ControlProps } from "./ControlContainer";
/**
 * TODO: this toggle button doesn't make much sense from semantic perspective
 */
export type ToggleButtonProps = ControlProps & {
    value?: string;
    selected?: boolean;
    hideLabel?: boolean;
    onChange?: (val: boolean) => void;
};
export declare const ToggleButton: (props: ToggleButtonProps & {
    children: string;
}) => React.JSX.Element;
export type SelectInlineProps = {
    children: ReactNode;
    value: string | null | undefined;
    onChange: (value: string) => void;
};
export declare const SelectInline: React.FC<SelectInlineProps>;
//# sourceMappingURL=ToggleButton.d.ts.map