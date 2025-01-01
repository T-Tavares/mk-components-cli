#!/usr/bin/env node

import {Command} from 'commander';
import {createFolder, createComponentFile, createStyleFile} from '../lib/core.js';
import {writeComponent} from '../lib/write.options.js';
import {firstCharUpperCase} from '../func/stringFunctions.js';
import {LOG} from '../lib/messages.options.js';

const program = new Command();

const description = `CLI to create React JSX + modular CSS SASS, Fill them with a basic component structure. From a given name or list (For multiple Files)
    Try:
        mkjsx Home Nav Footer`;
program
    .name('mkjsx')
    .description(description)
    .version('1.0.0')
    .argument('<filenames...>', 'Core name of the file/component (can be a list separated by space)')
    .action((filenames: []) => {
        filenames.forEach(file => {
            // --------- RESOLVE COMPONENT NAME AND CONTENT --------- //

            const filename = firstCharUpperCase(file);
            const content = writeComponent({filename, filetype: 'jsx'});

            // -------------- CREATING FOLDER AND FILES ------------- //

            createFolder(filename);
            const wasJSXCreated = createComponentFile({filename, language: 'jsx', content});
            const wasStyleCreated = createStyleFile({filename, content: ''});

            // ----------- CHECK IF COMPONENT WAS CREATED ----------- //

            const wasComponentCreated = wasJSXCreated === 'pass' && wasStyleCreated === 'pass';
            if (wasComponentCreated) LOG.createdSuccessfully(filename);
            else LOG.error(`Something went wrong while creating ${filename}`);
        });
    });

program.parse();
