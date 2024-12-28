import {mkconfig} from '../config/mkcli.config';
import type {Config, WriteComponent} from '../types/types';

/* 
    All functions related to writing files are resolved here.
*/

// ------------------------------------------------------ //
// ---------------- WRITE COMPONENT FILE ---------------- //
// ------------------------------------------------------ //

export const writeComponent = ({filename, filetype = 'jsx'}: WriteComponent) => {
    const {css, cssModular, cssType, cssAlias, exportType, functionType} = mkconfig;

    // -------------------- EXPORTS TYPES ------------------- //

    const exportModular = exportType === 'es6' ? 'export' : '';
    const exportDefault = exportType === 'es6' ? '' : 'export default ' + filename + ';';

    // -------------------- FUNCTION TYPE ------------------- //

    const tsReactType = filetype === 'tsx' ? ': React.FC' : '';

    const funtionTypeStr =
        functionType === 'arrow'
            ? `const ${filename}${filetype === 'tsx' ? tsReactType : ''} = () =>`
            : `function ${filename}()`;

    // ---------------------- CSS IMPORT -------------------- //

    let cssImport = '';
    if (css) {
        cssImport = mkconfig.css
            ? `import ${cssAlias} from './${filename}.${cssModular ? 'modular.' : ''}${cssType}';\n`
            : '';
    }

    let className = `${cssModular ? `classname={${cssAlias}.container}` : `className={}`}`;

    // ------------------- FINAL COMPONENT ------------------ //

    const component = `${css ? cssImport : ''}
${exportModular} ${funtionTypeStr} {
    return (
        <div ${css ? className : ''}>
            ${filename}
        </div>
    );
};

${css ? exportDefault : ''}
`;

    return component;
};

// ------------------------------------------------------ //
// ------------------ WRITE CONFIG FILE ----------------- //
// ------------------------------------------------------ //

export const writeConfig = (configObj: Config): string => {
    return `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkconfig = void 0;
exports.mkconfig = {
    functionType: '${configObj.functionType}',
    exportType: '${configObj.exportType}',
    css: ${configObj.css},
    cssModular: ${configObj.cssModular},
    cssType: '${configObj.cssType}',
    cssAlias: '${configObj.cssAlias}',
};`;
};
