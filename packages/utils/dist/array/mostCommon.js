function mostCommon(collection) {
    const repetitionsCount = new Map();
    collection.forEach((value) => {
        const currentItemKey = getKeyForValue(value);
        const currentItemRepetitionsCount = repetitionsCount.get(currentItemKey);
        if (currentItemRepetitionsCount === undefined) {
            repetitionsCount.set(currentItemKey, 0);
            return;
        }
        repetitionsCount.set(currentItemKey, currentItemRepetitionsCount + 1);
    });
    const repetitionsCountEntries = Array.from(repetitionsCount);
    const [mostCommonValue] = repetitionsCountEntries.reduce((currentMostCommonEntry, currentEntry) => {
        if (currentEntry[1] > currentMostCommonEntry[1]) {
            return currentEntry;
        }
        return currentMostCommonEntry;
    });
    if (typeof mostCommonValue === "string") {
        try {
            const unwrappedValue = JSON.parse(mostCommonValue);
            if (typeof unwrappedValue === "object") {
                return unwrappedValue;
            }
        }
        catch (_a) {
            return mostCommonValue;
        }
    }
    return mostCommonValue;
}
function getKeyForValue(value) {
    if (typeof value === "object") {
        return JSON.stringify(value);
    }
    return value;
}
export { mostCommon };
//# sourceMappingURL=mostCommon.js.map