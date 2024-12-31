"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolder = createFolder;
exports.createFile = createFile;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const stringFunctions_1 = require("../func/stringFunctions");
const config_options_1 = require("./config.options");
function createFolder(componentName) {
    const folderName = (0, stringFunctions_1.firstCharUpperCase)(componentName);
    const folderPath = path_1.default.join(process.cwd(), folderName);
    const doesFolderExist = fs_1.default.existsSync(folderPath);
    if (doesFolderExist)
        return console.log('Folder already exists');
    fs_1.default.mkdirSync(folderPath);
}
function createFile({ filename, language, content = '' }) {
    const mkconfig = (0, config_options_1.getConfig)();
    const folderName = (0, stringFunctions_1.firstCharUpperCase)(filename);
    const fileName = (0, stringFunctions_1.firstCharUpperCase)(filename);
    const fileJSX = `${fileName}.${language}`;
    const fileCSS = `${fileName}.${mkconfig.cssModular ? 'module.' : ''}${mkconfig.cssType}`;
    const jsxPath = path_1.default.join(process.cwd(), folderName, fileJSX);
    const cssPath = path_1.default.join(process.cwd(), folderName, fileCSS);
    const doesFileExist = fs_1.default.existsSync(jsxPath) || fs_1.default.existsSync(cssPath);
    if (doesFileExist)
        return console.log('File already exists');
    if (language === 'jsx' || language === 'tsx')
        fs_1.default.writeFileSync(jsxPath, content, 'utf8');
    if (!mkconfig.css)
        return;
    if (language === 'css' || language === 'scss')
        fs_1.default.writeFileSync(cssPath, content, 'utf8');
}
