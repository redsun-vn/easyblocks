import React from "react";
declare function Menu(props: {
    children: React.ReactNode;
}): React.JSX.Element;
declare function MenuTrigger(props: {
    children: React.ReactNode;
}): React.JSX.Element;
declare function MenuContent(props: {
    children: React.ReactNode;
    container?: HTMLElement | null;
}): React.JSX.Element;
declare function MenuItem(props: {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    isDisabled?: boolean;
}): React.JSX.Element;
declare function MenuSeparator(): React.JSX.Element;
export { Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator };
//# sourceMappingURL=Menu.d.ts.map