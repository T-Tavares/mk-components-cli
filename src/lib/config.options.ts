import path from 'path';
import fs from 'fs';
import {checkForNumOfArgs, checkForValidKeyValue} from './error.options';

import type {Config, ValidKeyVal} from '../types/types';

// ------------------------------------------------------ //
// ---------------- GET CONFIG FILE PATH ---------------- //
// --------------------- GET CONFIG --------------------- //
// ------------------------------------------------------ //

export function getConfigPath(): string {
    return path.resolve(__dirname, '..', 'config', 'mkcli.config.json');
}

export function getConfig(): Config {
    const configPath = fs.existsSync(getConfigPath());
    if (!configPath) throw new Error('Config file does not exist');

    const configRAW = fs.readFileSync(getConfigPath(), 'utf8');
    const config = JSON.parse(configRAW) as Config;
    return config;
}

// ------------------------------------------------------ //
// ------------------ WRITE CONFIG FILE ----------------- //
// ------------------------------------------------------ //

export const writeConfig = (configObj: Config): string => {
    return `{
    "functionType": "${configObj.functionType}",
    "exportType": "${configObj.exportType}",
    "css": ${configObj.css},
    "cssModular": ${configObj.cssModular},
    "cssType": "${configObj.cssType}",
    "cssAlias": "${configObj.cssAlias}"
}`;
};

// ------------------------------------------------------ //
// ----------------- UPDATE CONFIG FILE ----------------- //
// ------------------------------------------------------ //

// prettier-ignore
export function updateConfig(keyValObjInput: ValidKeyVal){
    const inputedKey = keyValObjInput.SetOption[0];
    const inputedValue = keyValObjInput.SetOption[1];

    const configPath = getConfigPath();
    const doesConfigExist = fs.existsSync(configPath);

    // ------------ SAFE GUARD AND ERROR HANDLERS ----------- //
    
    if (!doesConfigExist) {
        console.log('Config file does not exist: ', configPath)
        return 
    };

    if (!checkForNumOfArgs(keyValObjInput as never)) return;
    if(!checkForValidKeyValue(keyValObjInput as never)) return 

    // ------------------- UPDATING CONFIG ------------------ //

    const configObj: Config = {...getConfig(), [inputedKey]: inputedValue};
    fs.writeFileSync(configPath, writeConfig(configObj), 'utf8');
    console.log('Config Updated', `${inputedKey}: ${inputedValue}`);

}
