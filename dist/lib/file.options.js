"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeComponent = void 0;
const mkcli_config_1 = require("../config/mkcli.config");
const writeComponent = ({ filename, filetype = 'jsx' }) => {
    const { css, cssModular, cssType, cssAlias, exportType, functionType } = mkcli_config_1.mkconfig;
    // -------------------- EXPORTS TYPES ------------------- //
    const exportModular = exportType === 'modular' ? 'export' : '';
    const exportDefault = exportType === 'modular' ? '' : 'export default ' + filename + ';';
    // -------------------- FUNCTION TYPE ------------------- //
    const tsReactType = filetype === 'tsx' ? ': React.FC' : '';
    const funtionTypeStr = functionType === 'arrow'
        ? `const ${filename}${filetype === 'tsx' ? tsReactType : ''} = () =>`
        : `function ${filename}()`;
    // ---------------------- CSS IMPORT -------------------- //
    let cssImport = '';
    if (css) {
        cssImport = mkcli_config_1.mkconfig.css
            ? `import ${cssAlias} from './${filename}.${cssModular ? 'modular.' : ''}${cssType}';`
            : '';
    }
    // ------------------------------------------------------ //
    // ------------------- FINAL COMPONENT ------------------ //
    // ------------------------------------------------------ //
    const component = `${css ? cssImport : ''}

${exportModular} ${funtionTypeStr} {
    return (
        <div>
            Component
        </div>
    );
};

${css ? exportDefault : ''}
`;
    return component;
};
exports.writeComponent = writeComponent;
