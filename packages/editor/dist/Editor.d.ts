import { Config, Document, FetchOutputResources, InlineTypeWidgetComponentProps, TokenTypeWidgetComponentProps, WidgetComponentProps } from "@redsun-vn/easyblocks-core";
import React, { ComponentType } from "react";
import { ExternalDataChangeHandler } from "./EasyblocksEditorProps";
import { TemplatePicker } from "./TemplatePicker";
type EditorProps = {
    config: Config;
    locale?: string;
    readOnly: boolean;
    documentId: string | null;
    rootComponentId: string | null;
    rootTemplateId: string | null;
    save?: (document: Document) => Promise<void>;
    onClose?: () => void;
    externalData: FetchOutputResources;
    onExternalDataChange: ExternalDataChangeHandler;
    widgets?: Record<string, ComponentType<WidgetComponentProps<any>> | ComponentType<InlineTypeWidgetComponentProps<any>> | ComponentType<TokenTypeWidgetComponentProps<any>>>;
    components?: Record<string, ComponentType<any>>;
    pickers?: Record<string, TemplatePicker>;
};
export declare const Editor: typeof EditorBackendInitializer;
declare function EditorBackendInitializer(props: EditorProps): React.JSX.Element;
export {};
//# sourceMappingURL=Editor.d.ts.map