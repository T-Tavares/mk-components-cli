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
    .action(options => {
    if (!options.current && !options.SetOption)
        return console.log('To see current configuration use -c or --current.\nTo set a configuration option use -set-option <key> <value>, keys and values have to match the object of Current Config');
    if (options.current)
        console.log('Current Config', mkcli_config_1.mkconfig);
    if (options.SetOption)
        (0, core_1.updateConfig)(options);
});
program.parse();
