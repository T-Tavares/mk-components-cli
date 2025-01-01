import {getConfig} from './config.options.js';

import type {WriteComponent} from '../types/types';

/* 
    All functions related to writing files are resolved here.
*/

// ------------------------------------------------------ //
// ---------------- WRITE COMPONENT FILE ---------------- //
// ------------------------------------------------------ //

export const writeComponent = ({filename, filetype = 'jsx'}: WriteComponent) => {
    const {css, cssModular, cssType, cssAlias, exportType, functionType} = getConfig();

    // -------------------- EXPORTS TYPES ------------------- //

    const exportModular = exportType === 'named' ? 'export ' : '';
    const exportDefault = exportType === 'default' ? 'export default ' + filename + ';' : '';

    // -------------------- FUNCTION TYPE ------------------- //

    /* 
        If creating a tsx and function type is arrow it'll add the React.FC type.
        That's the whole point of using tsx, right?
        This won't work with default functions.
    */

    const tsReactType = filetype === 'tsx' ? ': React.FC' : '';

    let functionTypeStr = '';
    if (functionType === 'arrow') functionTypeStr = `const ${filename}${tsReactType} = () =>`;
    if (functionType === 'function') functionTypeStr = `function ${filename}()`;

    // ---------------------- CSS IMPORT -------------------- //

    let cssImport = '';
    if (css && cssModular) cssImport = `import ${cssAlias} from "./${filename}.module.${cssType}";\n`;
    if (css && !cssModular) cssImport = `import "./${filename}.${cssType}";\n`;

    let className = '';
    if (css && cssModular) className = `className={${cssAlias}.container}`;
    if (css && !cssModular) className = `className=""`;

    // ------------------- FINAL COMPONENT ------------------ //

    const component = `${cssImport}
${exportModular}${functionTypeStr} {
    return (
        <div ${className}>
            ${filename}
        </div>
    );
};

${exportDefault}
`;

    return component;
};
