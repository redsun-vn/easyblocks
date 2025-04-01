declare function pick<Prop extends string>(prop: Prop): <Value extends Record<string, unknown>>(value: Value) => Value[Prop];
export { pick };
