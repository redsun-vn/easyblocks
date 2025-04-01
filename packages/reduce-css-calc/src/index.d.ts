declare module "@redsun-vn/easyblocks-reduce-css-calc" {
  export interface ReduceCSSCalcOptions {
    precision?: number;
    map?: {
      vw?: number;
      percent?: number;
    };
  }

  export function reduceCSSCalc(
    value: string,
    options?: ReduceCSSCalcOptions
  ): string;
}
