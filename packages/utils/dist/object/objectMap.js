function objectMap(o, callback) {
    return Object.fromEntries(objectMapInternal(o, callback));
}
function objectMapInternal(o, callback) {
    return Object.entries(o).map((entry) => {
        if (typeof entry[1] === "object") {
            if (entry[1] === null) {
                return callback(entry);
            }
            if (Array.isArray(entry[1])) {
                return callback([
                    entry[0],
                    entry[1].map((value) => typeof value === "object"
                        ? Object.fromEntries(objectMapInternal(value, callback))
                        : value),
                ]);
            }
            return callback([
                entry[0],
                Object.fromEntries(objectMapInternal(entry[1], callback)),
            ]);
        }
        return callback(entry);
    });
}
export { objectMap };
//# sourceMappingURL=objectMap.js.map