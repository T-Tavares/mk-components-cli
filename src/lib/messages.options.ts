import chalk from 'chalk';

export const LOG = {
    createdSuccessfully: (component: string): void => {
        console.log(chalk.green(`${component} component created successfully.`));
    },

    alredyExists: (component: string): void => {
        console.log(chalk.yellow(`${component} component already exists.`));
    },

    success: (message: string): void => {
        console.log(chalk.green(message));
    },

    error: (err: string | Error): void => {
        console.log(chalk.red(err));
    },

    message: (message: string): void => {
        console.log(message);
    },
};
