import { Toaster } from "react-hot-toast";
export { Toaster };
export declare function useToaster(): {
    notify: (message: string) => void;
    success: (message: string, options?: {
        duration?: number;
    }) => void;
    error: (message: string) => void;
};
//# sourceMappingURL=Toaster.d.ts.map