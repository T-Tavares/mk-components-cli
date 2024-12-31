import path from 'path';
import fs from 'fs';

import {firstCharUpperCase} from '../func/stringFunctions';
import {getConfig} from './config.options';

import type {CreateFileOptions, Config, ValidKeyVal} from '../types/types';

/* 
    Core functionalities where everything comes together.
*/

// ------------------------------------------------------ //
// -------------------- CREATE FOLDER ------------------- //
// ------------------------------------------------------ //

export function createFolder(componentName: string): void {
    const folderName = firstCharUpperCase(componentName);
    const folderPath = path.join(process.cwd(), folderName);

    const doesFolderExist = fs.existsSync(folderPath);

    if (doesFolderExist) return console.log('Folder already exists');
    fs.mkdirSync(folderPath);
}

// ------------------------------------------------------ //
// -------------------- CREATE FILES -------------------- //
// ------------------------------------------------------ //

export function createFile({filename, language, content = ''}: CreateFileOptions): void {
    const mkconfig = getConfig();

    // ----------- RESOLVING PATHS AND FILE NAMES ----------- //
    const folderName = firstCharUpperCase(filename);
    const fileName = firstCharUpperCase(filename);

    const fileJSX = `${fileName}.${language}`;
    const fileCSS = `${fileName}.${mkconfig.cssModular ? 'module.' : ''}${mkconfig.cssType}`;

    const jsxPath = path.join(process.cwd(), folderName, fileJSX);
    const cssPath = path.join(process.cwd(), folderName, fileCSS);

    // --------------------- SAFE GUARD --------------------- //

    const doesFileExist = fs.existsSync(jsxPath) || fs.existsSync(cssPath);
    if (doesFileExist) return console.log('File already exists');

    // ------------------- CREATING FILES ------------------- //

    if (language === 'jsx' || language === 'tsx') fs.writeFileSync(jsxPath, content, 'utf8');

    if (!mkconfig.css) return; // Safe Guard -> If css is false, it wont create css file.
    if (language === 'css' || language === 'scss') fs.writeFileSync(cssPath, content, 'utf8');
}
