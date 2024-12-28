import {mkconfig} from '../config/mkcli.config';

type WriteComponent = {
    filename: string;
    filetype: 'jsx' | 'tsx';
};

export const writeComponent = ({filename, filetype = 'jsx'}: WriteComponent) => {
    const {css, cssModular, cssType, cssAlias, exportType, functionType} = mkconfig;

    // -------------------- EXPORTS TYPES ------------------- //

    const exportModular = exportType === 'modular' ? 'export' : '';
    const exportDefault = exportType === 'modular' ? '' : 'export default ' + filename + ';';

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
