function pick(prop) {
    return function pickPropFromValue(value) {
        return value[prop];
    };
}
export { pick };
//# sourceMappingURL=pick.js.map