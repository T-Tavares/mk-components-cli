import {getConfig} from './config.options.js';
import {LOG} from './messages.options.js';

import type {ValidKeyVal, ConfigOptions} from '../types/types';

// ------------------------------------------------------ //
// ---------- USER INPUT CHECKS FOR SET-OPTIONS --------- //
// ------------------------------------------------------ //

/* 
    Error Handlers / Checkers are resolved in single functions.
    It should show a message to the user of what's wrong and return false.
    I'm not throwing errors because I want to keep the core functionality running.
    Those are essentially a way to help the user if they have a typo or need to know
    the correct options.

    If everything is correct, it should return true and core functionality 
    will just continue. 
*/

// ------------------------------------------------------ //
// ------------------ NUM OF ARGUMENTS ------------------ //
// ------------------------------------------------------ //

export const checkForNumOfArgs = (keyValObjInput: {SetOption: string[]}) => {
    if (keyValObjInput.SetOption!.length !== 2) {
        LOG.error('Incorrect number of arguments, That should be a key and a value');
        return false;
    }
    return true;
};

// ------------------------------------------------------ //
// -------------- VALID INPUT FOR EACH KEY -------------- //
// ------------------------------------------------------ //

export const checkForValidKeyValue = (keyValObjInput: ValidKeyVal) => {
    const inputedKey = keyValObjInput.SetOption[0];
    const inputedValue = keyValObjInput.SetOption[1];

    // ---------------- CHECK KEYS VALIDATION --------------- //

    const configKeys = Object.keys(getConfig());

    if (!configKeys.includes(inputedKey)) {
        LOG.error(`Key does not exist in config`);
        LOG.message(`Available Options (keys): ${configKeys.join(', ')}`);
        return false;
    }

    // --------------- CHECK VALUES VALIDATION -------------- //

    const mkConfigOptions = {
        functionType: ['arrow', 'function'],
        exportType: ['named', 'default'],
        css: ['true', 'false'],
        cssModular: ['true', 'false'],
        cssType: ['css', 'scss'],
    };

    const validValues = mkConfigOptions[inputedKey as keyof ConfigOptions];

    if (inputedKey !== 'cssAlias' && !validValues.includes(inputedValue as never)) {
        LOG.error(`Invalid value for ${inputedKey}.`);
        LOG.message(`Available options: ${validValues.join(', ')}`);
        return false;
    }

    // --------------- RETURN TRUE IS ALL PASS -------------- //

    return true;
};
