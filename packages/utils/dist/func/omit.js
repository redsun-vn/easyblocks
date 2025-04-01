import { entries } from "../object";
function omit(value, omittedKeys) {
    const filteredEntries = entries(value).filter((entry) => {
        return !omittedKeys.includes(entry[0]);
    });
    return Object.fromEntries(filteredEntries);
}
export { omit };
//# sourceMappingURL=omit.js.map