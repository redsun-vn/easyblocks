import React from "react";
export type SimplePickerItem = {
    id: string;
    title: string;
    thumbnail?: string;
};
export type SimplePickerProps = {
    value: string | null;
    onChange: (id: string | null) => void;
    getItems: (query: string) => Promise<Array<SimplePickerItem>>;
    getItemById: (id: string) => Promise<SimplePickerItem>;
    placeholder?: string;
};
export declare function SimplePicker({ value, onChange, getItemById, getItems, placeholder, }: SimplePickerProps): React.JSX.Element;
//# sourceMappingURL=SimplePicker.d.ts.map