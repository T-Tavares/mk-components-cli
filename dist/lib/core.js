"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolder = createFolder;
exports.createFile = createFile;
exports.updateConfig = updateConfig;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const stringFunctions_1 = require("../func/stringFunctions");
const mkcli_config_1 = require("../config/mkcli.config");
// ------------------------------------------------------ //
// -------------------- CREATE FOLDER ------------------- //
// ------------------------------------------------------ //
function createFolder(componentName) {
    const folderName = (0, stringFunctions_1.firstCharUpperCase)(componentName);
    const folderPath = path_1.default.join(process.cwd(), folderName);
    const doesFolderExist = fs_1.default.existsSync(folderPath);
    if (doesFolderExist)
        return console.log('Folder already exists');
    fs_1.default.mkdirSync(folderPath);
}
// ------------------------------------------------------ //
// -------------------- CREATE FILES -------------------- //
// ------------------------------------------------------ //
function createFile({ filename, language, content = '' }) {
    // ----------- RESOLVING PATHS AND FILE NAMES ----------- //
    const folderName = (0, stringFunctions_1.firstCharUpperCase)(filename);
    const fileName = (0, stringFunctions_1.firstCharUpperCase)(filename);
    const fileJSX = `${fileName}.${language}`;
    const fileCSS = `${fileName}.${mkcli_config_1.mkconfig.cssModular ? 'module.' : ''}${mkcli_config_1.mkconfig.cssType}`;
    const jsxPath = path_1.default.join(process.cwd(), folderName, fileJSX);
    const cssPath = path_1.default.join(process.cwd(), folderName, fileCSS);
    // --------------------- SAFE GUARD --------------------- //
    const doesFileExist = fs_1.default.existsSync(jsxPath) || fs_1.default.existsSync(cssPath);
    if (doesFileExist)
        return console.log('File already exists');
    // ------------------- CREATING FILES ------------------- //
    if (language === 'jsx' || language === 'tsx')
        fs_1.default.writeFileSync(jsxPath, content, 'utf8');
    if (language === 'css' || language === 'scss')
        fs_1.default.writeFileSync(cssPath, content, 'utf8');
}
// ------------------------------------------------------ //
// ----------------- UPDATE CONFIG FILE ----------------- //
// ------------------------------------------------------ //
const writeConfig = (configObj) => {
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
const checkForNumOfArgs = (keyValObjInput) => {
    if (keyValObjInput.SetOption.length !== 2) {
        console.log('Incorrect number of arguments, That should be a key and a value');
        return false;
    }
    return true;
};
const checkForValidKeyValue = (keyValObjInput) => {
    console.log(keyValObjInput.SetOption);
    const inputedKey = keyValObjInput.SetOption[0];
    const inputedValue = keyValObjInput.SetOption[1];
    // ---------------- CHECK KEYS VALIDATION --------------- //
    const configKeys = Object.keys(mkcli_config_1.mkconfig);
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
    const validValues = mkConfigOptions[inputedKey];
    if (!validValues.includes(inputedValue)) {
        console.log(`Invalid value for ${inputedKey}. Available options: ${validValues.join(', ')}`);
        return false;
    }
    // --------------- RETURN TRUE IS ALL PASS -------------- //
    return true;
};
// prettier-ignore
function updateConfig(keyValObjInput) {
    const configPath = path_1.default.join(process.cwd(), '/dist/config/mkcli.config.js');
    const doesConfigExist = fs_1.default.existsSync(configPath);
    // ------------ SAFE GUARD AND ERROR HANDLERS ----------- //
    if (!doesConfigExist) {
        console.log('Config file does not exist');
        return;
    }
    ;
    const isValidNumOfArgs = checkForNumOfArgs(keyValObjInput);
    if (!isValidNumOfArgs)
        return;
    const isValidKeyVal = checkForValidKeyValue(keyValObjInput);
    if (!isValidKeyVal)
        return;
    // ------------------- UPDATING CONFIG ------------------ //
    const configObj = Object.assign(Object.assign({}, mkcli_config_1.mkconfig), { [keyValObjInput.key]: keyValObjInput.value });
    fs_1.default.writeFileSync(configPath, writeConfig(configObj), 'utf8');
    console.log('Config Updated', `${JSON.stringify(configObj, null, 4)}`);
}
