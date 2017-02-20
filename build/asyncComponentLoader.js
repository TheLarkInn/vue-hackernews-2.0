const j = require("jscodeshift");
const jImport = require("jscodeshift-imports");

module.exports = function (source) {
    const loaderContext = this;
    const ast = j(source);
    return ast.find(j.ImportDeclaration)
        .replaceWith(p => replaceWithSystemImport(j, p))
        .toSource();
}

function replaceWithSystemImport(j, p) {
    const importDefaultSpecifierName = p.value.specifiers[0].local.name;
    const importSourcePath = p.value.source.value;
    const systemImportExpression = j.callExpression(
        j.memberExpression(
            j.identifier('System'),
            j.identifier('import'),
            false),
        [j.literal(importSourcePath)]
    );

    const convertedImport = j.variableDeclaration(
        'const',
        [j.variableDeclarator(
            j.identifier(importDefaultSpecifierName),
            j.functionExpression(
                null,
                [],
                j.blockStatement([
                    j.returnStatement(
                        systemImportExpression
                    )
                ]),
                false,
                false
            )
        )]
    )
    return convertedImport;
}