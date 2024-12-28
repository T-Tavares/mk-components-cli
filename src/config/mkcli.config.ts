import type {Config} from '../types/types';

export const mkconfig: Config = {
    functionType: 'arrow', // 'arrow' | 'function'
    exportType: 'es6', // 'es6' | 'commonjs'
    css: true, // true | false
    cssModular: true, // true | false
    cssType: 'scss', // 'scss' | 'css'
    cssAlias: 'ss', // Any unique string for css alias
};
