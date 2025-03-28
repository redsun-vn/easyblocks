import React, { ReactNode } from "react";
declare function ToggleGroup(props: {
    children: ReactNode;
    value: string;
    onChange: (value: string) => void;
}): React.JSX.Element;
declare const ToggleGroupItem: React.ForwardRefExoticComponent<{
    value: string;
    children: ReactNode;
} & React.RefAttributes<HTMLButtonElement>>;
export { ToggleGroup, ToggleGroupItem };
//# sourceMappingURL=ToggleGroup.d.ts.map