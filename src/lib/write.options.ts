import type {WriteComponent} from '../types/types';
import {getConfig} from './config.options';

/* 
    All functions related to writing files are resolved here.
*/

// ------------------------------------------------------ //
// ---------------- WRITE COMPONENT FILE ---------------- //
// ------------------------------------------------------ //

export const writeComponent = ({filename, filetype = 'jsx'}: WriteComponent) => {
    const {css, cssModular, cssType, cssAlias, exportType, functionType} = getConfig();

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
        cssImport = css ? `import ${cssAlias} from "./${filename}.${cssModular ? 'module.' : ''}${cssType}";\n` : '';
    }

    let className = `${cssModular ? `className={${cssAlias}.container}` : `className={}`}`;

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
