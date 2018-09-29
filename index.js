const fs = require('fs');
const Path = require('path');
const minify = require('html-minifier').minify;

module.exports = function MyPlugin(ref) {
    var t = ref.types;
    return {
        visitor: {
            CallExpression: {
                enter: function (path) {
                    if (t.isCallExpression(path.node) && path.node.callee.name === 'include_html') {
                        let file_name = this.file.hub.file.opts.filename;
                        let fpath = Path.join(Path.dirname(file_name), path.node.arguments[0].value);
                        let html = fs.readFileSync(fpath, 'UTF-8');
                        let content = minify(html, {
                            removeAttributeQuotes: true,
                            collapseWhitespace: true,
                            removeComments: true
                        });
                        path.replaceWith(t.stringLiteral(content));
                    }
                }
            }
        }
    };
};