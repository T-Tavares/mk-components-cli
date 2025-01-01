import path from 'path';
import fs from 'fs';
import { LOG } from './messages.options.js';
import { firstCharUpperCase } from '../func/stringFunctions.js';
import { getConfig } from './config.options.js';
export function createFolder(componentName) {
    const folderName = firstCharUpperCase(componentName);
    const folderPath = path.join(process.cwd(), folderName);
    fs.mkdirSync(folderPath);
}
export function createComponentFile({ filename, language, content = '' }) {
    const componentName = firstCharUpperCase(filename);
    const fileName = `${componentName}.${language}`;
    const filePath = path.join(process.cwd(), componentName, fileName);
    const doesFileExist = fs.existsSync(filePath);
    if (doesFileExist) {
        LOG.alredyExists(fileName);
        return 'fail';
    }
    fs.writeFileSync(filePath, content, 'utf8');
    return 'pass';
}
export function createStyleFile({ filename, content = '' }) {
    const config = getConfig();
    const styleName = firstCharUpperCase(filename);
    const fileName = `${styleName}.${config.cssModular ? 'module.' : ''}${config.cssType}`;
    const filePath = path.join(process.cwd(), styleName, fileName);
    const doesFileExist = fs.existsSync(filePath);
    if (doesFileExist) {
        LOG.alredyExists(fileName);
        return 'fail';
    }
    fs.writeFileSync(filePath, content, 'utf8');
    return 'pass';
}
