declare module "@redsun-vn/easyblocks-reduce-css-calc" {
  export function reduceCSSCalc(
    value: string,
    precision?: number,
    map?: { vw?: number; percent?: number }
  ): string;
}
