#!/usr/bin/env node

import {Command} from 'commander';
import {updateConfig, getConfigPath, getConfig} from '../lib/core';
import {mkconfig} from '../config/mkcli.config';

const program = new Command();

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
            return console.log(
                'To see current configuration use -c or --current.\nTo set a configuration option use -set-option <key> <value>, keys and values have to match the object of Current Config\nTo see path of configuration file use -p or --path'
            );

        if (options.current) console.log('Current Config', mkconfig);
        if (options.SetOption) updateConfig(options);
        if (options.path) {
            console.log('Path of Config file', getConfigPath());
            getConfig();
        }
    });

program.parse();
