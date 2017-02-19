const j = require("jscodeshift");
const jImport = require("jscodeshift-imports");

module.exports = function(source) {
    const loaderContext = this;
    const ast = j(source);

    return source;
}