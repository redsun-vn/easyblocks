import React, { ReactNode } from "react";
type ModalBodyProps = {
    children: ReactNode;
    title?: string;
    headerSymbol?: string;
    headerLine?: boolean;
    searchProps?: object;
    onRequestClose?: () => void;
    width?: string;
    height?: string;
    maxHeight?: string;
    maxWidth?: string;
    noPadding?: boolean;
};
export declare const ModalBody: React.FC<ModalBodyProps>;
type ModalProps = ModalBodyProps & {
    isOpen: boolean;
    mode: "center-small" | "center-huge";
};
export declare const ModalContext: React.Context<any>;
export declare const Modal: React.FC<ModalProps>;
export declare const GlobalModalStyles: React.NamedExoticComponent<import("styled-components").ExecutionProps & object>;
export {};
//# sourceMappingURL=Modal.d.ts.map