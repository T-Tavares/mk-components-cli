#!/usr/bin/env node

import {Command} from 'commander';
import {updateConfig, getConfigPath, getConfig} from '../lib/config.options';

const program = new Command();

const description = 'Edit Configuration file for mk components CLI';
const configGuideMsg =
    'To see current configuration use -c or --current.\nTo set a configuration option use -set-option <key> <value>, keys and values have to match the object of Current Config\nTo see path of configuration file use -p or --path';

program
    .name('mk-config')
    .description(description)
    .version('1.0.0')
    .option('-c, --current', 'Show current configuration')
    .option('-set-option <keyValue...>', 'Set a configuration option')
    .option('-p, --path', 'Show path of configuration file')
    .action(options => {
        if (!options.current && !options.SetOption && !options.path) console.log(configGuideMsg);
        if (options.current) console.log('Current Config: ', getConfig());
        if (options.SetOption) updateConfig(options);
        if (options.path) console.log('Path of Config file: ', getConfigPath());
    });

program.parse();
