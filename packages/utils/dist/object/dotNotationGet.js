export function dotNotationGet(obj, path) {
    if (path === "") {
        return obj;
    }
    return path.split(".").reduce((acc, curVal) => acc && acc[curVal], obj);
}
//# sourceMappingURL=dotNotationGet.js.map