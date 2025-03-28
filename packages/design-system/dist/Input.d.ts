import React from "react";
import { ControlProps } from "./ControlContainer";
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & ControlProps & {
    placeholder?: string;
    type?: string;
    debounce?: boolean;
    align?: "left" | "right";
};
export declare const Input: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & ControlProps & {
    placeholder?: string;
    type?: string;
    debounce?: boolean;
    align?: "left" | "right";
} & React.RefAttributes<HTMLInputElement>>;
export declare const InputRaw: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & ControlProps & {
    placeholder?: string;
    type?: string;
    debounce?: boolean;
    align?: "left" | "right";
} & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Input.d.ts.map