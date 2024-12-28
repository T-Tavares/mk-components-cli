// -------------------- CONFIG TYPES -------------------- //

type SXtype = 'jsx' | 'tsx';
type CSStype = 'scss' | 'css';

export type FileType = SXtype & CSStype;

type FunctionType = 'arrow' | 'function';
type ExportType = 'es6' | 'commonjs';
type CSS = boolean;
type CSSModular = boolean;
type CSSType = 'scss' | 'css';
type CSSAlias = string;

interface _Config {
    functionType: FunctionType;
    exportType: ExportType;
    css: CSS;
    cssModular: CSSModular;
    cssType: CSSType;
}

export type Config = _Config & {cssAlias: CSSAlias};

export type ConfigOptions = {
    [K in keyof _Config]: _Config[K][];
};

// ----------------- CONFIG UPDATE TYPES ---------------- //

export interface ConfigUserInput {
    key: string;
    value: string;
}

export interface ValidKeyVal {
    SetOption: string[];
}

// --------------------- CORE TYPES --------------------- //

export interface CreateFileOptions {
    filename: string;
    language: 'css' | 'scss' | 'jsx' | 'tsx';
    content?: string;
}

export type WriteComponent = {
    filename: string;
    filetype: 'jsx' | 'tsx';
};
