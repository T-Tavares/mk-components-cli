import path from 'path';
import fs from 'fs';

import {mkconfig} from '../config/mkcli.config';

import {writeConfig} from './write.options';
import {checkForNumOfArgs, checkForValidKeyValue} from './error.options';
import {firstCharUpperCase} from '../func/stringFunctions';

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

// ------------------------------------------------------ //
// ----------------- UPDATE CONFIG FILE ----------------- //
// ------------------------------------------------------ //

// prettier-ignore
export function updateConfig(keyValObjInput: ValidKeyVal){
    const inputedKey = keyValObjInput.SetOption[0];
    const inputedValue = keyValObjInput.SetOption[1];

    const configPath = path.join(process.cwd(), '/dist/config/mkcli.config.js');
    const doesConfigExist = fs.existsSync(configPath);

    // ------------ SAFE GUARD AND ERROR HANDLERS ----------- //
    
    if (!doesConfigExist) {
        console.log('Config file does not exist: ', configPath)
        return 
    };

    if (!checkForNumOfArgs(keyValObjInput as never)) return;
    if(!checkForValidKeyValue(keyValObjInput as never)) return 

    // ------------------- UPDATING CONFIG ------------------ //

    const configObj: Config = {...mkconfig, [inputedKey]: inputedValue};
    fs.writeFileSync(configPath, writeConfig(configObj), 'utf8');
    console.log('Config Updated', `${inputedKey}: ${inputedValue}`);

}
