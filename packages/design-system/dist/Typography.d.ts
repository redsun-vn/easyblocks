import type { ElementType, ReactNode } from "react";
import { ComponentPropsWithRef } from "react";
import { Colors } from "./colors";
type TypographyVariant = "body" | "body4" | "label" | "label2" | "label3";
type TypographyColor = keyof typeof Colors;
type TypographyAlignment = "left" | "center" | "right" | "justify";
interface TypographyProps {
    component?: ElementType;
    color?: TypographyColor;
    children: ReactNode | ReactNode[];
    variant?: TypographyVariant;
    className?: string;
    align?: TypographyAlignment;
    isTruncated?: boolean;
}
interface TypographyComponent {
    <Component extends ElementType>(props: {
        component: Component;
    } & TypographyProps & Omit<ComponentPropsWithRef<Component>, keyof TypographyProps>): JSX.Element;
    (props: TypographyProps & Omit<ComponentPropsWithRef<"div">, keyof TypographyProps>): JSX.Element;
}
declare const Typography: TypographyComponent;
export { Typography };
//# sourceMappingURL=Typography.d.ts.map