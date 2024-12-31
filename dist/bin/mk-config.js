#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const core_1 = require("../lib/core");
const mkcli_config_1 = require("../config/mkcli.config");
const program = new commander_1.Command();
const description = 'Edit Configuration file for mk components CLI';
program
    .name('mk-config')
    .description(description)
    .version('1.0.0')
    .option('-c, --current', 'Show current configuration')
    .option('-set-option <keyValue...>', 'Set a configuration option')
    .option('-p, --path', 'Show path of configuration file')
    .action(options => {
    if (!options.current && !options.SetOption && !options.path)
        return console.log('To see current configuration use -c or --current.\nTo set a configuration option use -set-option <key> <value>, keys and values have to match the object of Current Config\nTo see path of configuration file use -p or --path');
    if (options.current)
        console.log('Current Config', mkcli_config_1.mkconfig);
    if (options.SetOption)
        (0, core_1.updateConfig)(options);
    if (options.path) {
        console.log('Path of Config file', (0, core_1.getConfigPath)());
        (0, core_1.getConfig)();
    }
});
program.parse();
