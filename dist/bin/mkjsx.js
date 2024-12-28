#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const core_1 = require("../lib/core");
const file_options_1 = require("../lib/file.options");
const stringFunctions_1 = require("../func/stringFunctions");
const mkcli_config_1 = require("config/mkcli.config");
const program = new commander_1.Command();
const description = 'CLI to create React JSX + modular CSS SASS, Fill them with a basic component structure. From a given name or list (For multiple Files)';
program
    .name('mkjsx')
    .description(description)
    .version('1.0.0')
    .argument('<filenames...>', 'Core name of the file/component')
    .action((filenames) => {
    filenames.forEach(file => {
        const filename = (0, stringFunctions_1.firstCharUpperCase)(file);
        const content = (0, file_options_1.writeComponent)({ filename, filetype: 'jsx' });
        (0, core_1.createFolder)(filename);
        (0, core_1.createFile)({ filename, language: 'jsx', content });
        (0, core_1.createFile)({ filename, language: mkcli_config_1.mkconfig.cssType });
    });
});
program.parse();
