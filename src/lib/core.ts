import path from 'path';
import fs from 'fs';

import {LOG} from './messages.options.js';
import {firstCharUpperCase} from '../func/stringFunctions.js';
import {getConfig} from './config.options.js';

import type {CreateFileComponent, CreateFile, HasFileWrite} from '../types/types';

/* 
    Core functionalities where everything comes together.
*/

// ------------------------------------------------------ //
// -------------------- CREATE FOLDER ------------------- //
// ------------------------------------------------------ //

export function createFolder(componentName: string): void {
    const folderName = firstCharUpperCase(componentName);
    const folderPath = path.join(process.cwd(), folderName);
    fs.mkdirSync(folderPath);
}

// ------------------------------------------------------ //
// ------------------ CREATE COMPONENT ------------------ //
// ------------------------------------------------------ //

export function createComponentFile({filename, language, content = ''}: CreateFileComponent): HasFileWrite {
    // ------------ RESOLVING PATH AND FILE NAMES ----------- //

    const componentName = firstCharUpperCase(filename);
    const fileName = `${componentName}.${language}`;
    const filePath = path.join(process.cwd(), componentName, fileName);

    // --------------------- SAFE GUARD --------------------- //

    const doesFileExist = fs.existsSync(filePath);
    if (doesFileExist) {
        LOG.alredyExists(fileName);
        return 'fail';
    }

    // -------------------- CREATING FILE ------------------- //

    fs.writeFileSync(filePath, content, 'utf8');
    return 'pass';
}

// ------------------------------------------------------ //
// ------------------ CREATE CSS / SCSS ----------------- //
// ------------------------------------------------------ //

export function createStyleFile({filename, content = ''}: CreateFile): HasFileWrite {
    const config = getConfig();

    // ------------ RESOLVING PATH AND FILE NAMES ----------- //

    const styleName = firstCharUpperCase(filename);
    const fileName = `${styleName}.${config.cssModular ? 'module.' : ''}${config.cssType}`;
    const filePath = path.join(process.cwd(), styleName, fileName);

    // --------------------- SAFE GUARD --------------------- //

    const doesFileExist = fs.existsSync(filePath);
    if (doesFileExist) {
        LOG.alredyExists(fileName);
        return 'fail';
    }

    // -------------------- CREATING FILE ------------------- //

    fs.writeFileSync(filePath, content, 'utf8');
    return 'pass';
}

// export function createFile({filename, language, content = ''}: CreateFileOptions): void {
//     const mkconfig = getConfig();

//     // ----------- RESOLVING PATHS AND FILE NAMES ----------- //
//     const folderName = firstCharUpperCase(filename);
//     const fileName = firstCharUpperCase(filename);

//     const fileJSX = `${fileName}.${language}`;
//     const fileCSS = `${fileName}.${mkconfig.cssModular ? 'module.' : ''}${mkconfig.cssType}`;

//     const jsxPath = path.join(process.cwd(), folderName, fileJSX);
//     const cssPath = path.join(process.cwd(), folderName, fileCSS);

//     // --------------------- SAFE GUARD --------------------- //

//     const doesFileExist = fs.existsSync(jsxPath) || fs.existsSync(cssPath);
//     if (doesFileExist) return LOG.alredyExists('Component', fileName);

//     // ------------------- CREATING FILES ------------------- //

//     // Create JSX/TSX file
//     if (language === 'jsx' || language === 'tsx') fs.writeFileSync(jsxPath, content, 'utf8');

//     if (mkconfig.css) fs.writeFileSync(cssPath, content, 'utf8');

//     // Create CSS/SCSS file
//     LOG.createdSuccessfully('Component', fileName);
// }
