import * as React from "react";
export type ColorThumbnail = {
    type: "color";
    color: string;
};
export type ImageThumbnail = {
    type: "image";
    src: string;
};
export type IconThumbnail = {
    type: "icon";
    icon: "link" | "grid_3x3";
};
export type ThumbnailType = ColorThumbnail | ImageThumbnail | IconThumbnail;
export type ThumbnailButtonProps = {
    onClick?: () => void;
    label: string;
    description?: string;
    thumbnail?: ThumbnailType;
    disabled?: boolean;
};
export declare function ThumbnailButton({ onClick, label, description, thumbnail, disabled, }: ThumbnailButtonProps): React.JSX.Element;
//# sourceMappingURL=ThumbnailButton.d.ts.map