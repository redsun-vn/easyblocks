declare function objectMap(o: object, callback: (entry: [PropertyKey, unknown]) => [PropertyKey, unknown]): {
    [k: string]: unknown;
};
export { objectMap };
