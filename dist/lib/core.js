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
const mkcli_config_1 = require("../config/mkcli.config");
const write_options_1 = require("./write.options");
const error_options_1 = require("./error.options");
const stringFunctions_1 = require("../func/stringFunctions");
function createFolder(componentName) {
    const folderName = (0, stringFunctions_1.firstCharUpperCase)(componentName);
    const folderPath = path_1.default.join(process.cwd(), folderName);
    const doesFolderExist = fs_1.default.existsSync(folderPath);
    if (doesFolderExist)
        return console.log('Folder already exists');
    fs_1.default.mkdirSync(folderPath);
}
function createFile({ filename, language, content = '' }) {
    const folderName = (0, stringFunctions_1.firstCharUpperCase)(filename);
    const fileName = (0, stringFunctions_1.firstCharUpperCase)(filename);
    const fileJSX = `${fileName}.${language}`;
    const fileCSS = `${fileName}.${mkcli_config_1.mkconfig.cssModular ? 'module.' : ''}${mkcli_config_1.mkconfig.cssType}`;
    const jsxPath = path_1.default.join(process.cwd(), folderName, fileJSX);
    const cssPath = path_1.default.join(process.cwd(), folderName, fileCSS);
    const doesFileExist = fs_1.default.existsSync(jsxPath) || fs_1.default.existsSync(cssPath);
    if (doesFileExist)
        return console.log('File already exists');
    if (language === 'jsx' || language === 'tsx')
        fs_1.default.writeFileSync(jsxPath, content, 'utf8');
    if (!mkcli_config_1.mkconfig.css)
        return;
    if (language === 'css' || language === 'scss')
        fs_1.default.writeFileSync(cssPath, content, 'utf8');
}
function updateConfig(keyValObjInput) {
    const inputedKey = keyValObjInput.SetOption[0];
    const inputedValue = keyValObjInput.SetOption[1];
    const configPath = path_1.default.join(process.cwd(), '/dist/config/mkcli.config.js');
    const doesConfigExist = fs_1.default.existsSync(configPath);
    if (!doesConfigExist) {
        console.log('Config file does not exist: ', configPath);
        return;
    }
    ;
    if (!(0, error_options_1.checkForNumOfArgs)(keyValObjInput))
        return;
    if (!(0, error_options_1.checkForValidKeyValue)(keyValObjInput))
        return;
    const configObj = Object.assign(Object.assign({}, mkcli_config_1.mkconfig), { [inputedKey]: inputedValue });
    fs_1.default.writeFileSync(configPath, (0, write_options_1.writeConfig)(configObj), 'utf8');
    console.log('Config Updated', `${inputedKey}: ${inputedValue}`);
}
