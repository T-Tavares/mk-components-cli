import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';

import {checkForNumOfArgs, checkForValidKeyValue} from './error.options.js';

import type {Config, ValidKeyVal} from '../types/types';
import {LOG} from './messages.options.js';

// ------------------------------------------------------ //
// ---------------- GET CONFIG FILE PATH ---------------- //
// --------------------- GET CONFIG --------------------- //
// ------------------------------------------------------ //

export function getConfigPath(): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

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
        LOG.error(`Config file does not exist: \n${configPath}`)
        return 
    };

    if (!checkForNumOfArgs(keyValObjInput as never)) return;
    if(!checkForValidKeyValue(keyValObjInput as never)) return 

    // ------------------- UPDATING CONFIG ------------------ //

    const configObj: Config = {...getConfig(), [inputedKey]: inputedValue};
    fs.writeFileSync(configPath, writeConfig(configObj), 'utf8');
    LOG.success(`Config Updated ${inputedKey}: ${inputedValue}`);

}
