import React, { ReactNode } from "react";
import { Icon } from "./icons";
type CustomButtonProps = {
    component?: React.ElementType;
    children?: ReactNode;
    className?: string;
    onClick?: any;
    hideLabel?: boolean;
    icon?: Icon;
    enhancer?: React.ReactElement;
    variant?: "standard" | "large" | "tiny";
    height?: string;
    isLoading?: boolean;
};
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & CustomButtonProps;
export declare const ButtonPrimary: React.FC<ButtonProps>;
export declare const ButtonDanger: React.FC<ButtonProps>;
export declare const ButtonSecondary: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & CustomButtonProps & React.RefAttributes<HTMLButtonElement>>;
export type GhostButtonProps = ButtonProps & {
    noPadding?: boolean;
};
export declare const ButtonGhost: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & CustomButtonProps & {
    noPadding?: boolean;
} & React.RefAttributes<HTMLButtonElement>>;
export declare const ButtonGhostColor: React.FC<GhostButtonProps>;
export declare const IconButtonPrimary: React.FC<Omit<ButtonProps, "children" | "hideLabel">>;
export {};
//# sourceMappingURL=buttons.d.ts.map