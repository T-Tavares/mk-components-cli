import path from 'path';
import fs from 'fs';
import {firstCharUpperCase} from '../func/stringFunctions';
import {mkconfig} from '../config/mkcli.config';
import type {CreateFileOptions, Config, ConfigUserInput, ConfigOptions} from '../types/types';

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
    if (language === 'css' || language === 'scss') fs.writeFileSync(cssPath, content, 'utf8');
}

// ------------------------------------------------------ //
// ----------------- UPDATE CONFIG FILE ----------------- //
// ------------------------------------------------------ //

const writeConfig = (configObj: Config): string => {
    console.log(configObj);

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

const checkForNumOfArgs = (keyValObjInput: {SetOption: string[]}) => {
    if (keyValObjInput.SetOption!.length !== 2) {
        console.log('Incorrect number of arguments, That should be a key and a value');
        return false;
    }

    return true;
};
interface ValidKeyVal {
    SetOption: string[];
}

const checkForValidKeyValue = (keyValObjInput: ValidKeyVal) => {
    console.log(keyValObjInput.SetOption);

    const inputedKey = keyValObjInput.SetOption[0];
    const inputedValue = keyValObjInput.SetOption[1];

    // ---------------- CHECK KEYS VALIDATION --------------- //

    const configKeys = Object.keys(mkconfig);
    if (!configKeys.includes(inputedKey)) {
        console.log(inputedKey, configKeys);

        console.log(`Key does not exist in config
        Available Options (keys): ${configKeys.join(', ')}`);
        return false;
    }

    // --------------- CHECK VALUES VALIDATION -------------- //

    const mkConfigOptions = {
        functionType: ['arrow', 'function'],
        exportType: ['modular', 'commonjs'],
        css: ['true', 'false'],
        cssModular: ['true', 'false'],
        cssType: ['css', 'scss'],
    };

    const validValues = mkConfigOptions[inputedKey as keyof ConfigOptions];
    if (!validValues.includes(inputedValue as never)) {
        console.log(`Invalid value for ${inputedKey}. Available options: ${validValues.join(', ')}`);
        return false;
    }

    // --------------- RETURN TRUE IS ALL PASS -------------- //

    return true;
};

// prettier-ignore
export function updateConfig(keyValObjInput: ConfigUserInput){
    const configPath = path.join(process.cwd(), '/dist/config/mkcli.config.js');
    const doesConfigExist = fs.existsSync(configPath);

    // ------------ SAFE GUARD AND ERROR HANDLERS ----------- //
    
    if (!doesConfigExist) {
        console.log('Config file does not exist')
        return 
    };

    const isValidNumOfArgs = checkForNumOfArgs(keyValObjInput as never);
    if (!isValidNumOfArgs) return ;

    const isValidKeyVal = checkForValidKeyValue(keyValObjInput as never);
    if (!isValidKeyVal) return ;

    // ------------------- UPDATING CONFIG ------------------ //

    const configObj: Config = {...mkconfig, [keyValObjInput.key]: keyValObjInput.value};
    fs.writeFileSync(configPath, writeConfig(configObj), 'utf8');
    console.log('Config Updated', `${JSON.stringify(configObj, null, 4)}`);

}
