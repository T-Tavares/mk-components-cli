#!/usr/bin/env node

import {Command} from 'commander';
import {createFolder, createFile} from '../lib/core';
import {writeComponent} from '../lib/write.options';
import {firstCharUpperCase} from '../func/stringFunctions';
import {getConfig} from '../lib/config.options';

const program = new Command();

const description =
    'CLI to create React JSX + modular CSS SASS, Fill them with a basic component structure. From a given name or list (For multiple Files)';

program
    .name('mkjsx')
    .description(description)
    .version('1.0.0')
    .argument('<filenames...>', 'Core name of the file/component')
    .action((filenames: []) => {
        const mkconfig = getConfig();

        filenames.forEach(file => {
            const filename = firstCharUpperCase(file);
            const content = writeComponent({filename, filetype: 'jsx'});

            createFolder(filename);
            createFile({filename, language: 'jsx', content});
            createFile({filename, language: mkconfig.cssType});
        });
    });

program.parse();
