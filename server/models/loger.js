const fs = require('fs');
const figlet = require('figlet');

const logger = async (req, res, next) => {
    const chalk = await import('chalk');

    const timestamp = new Date().toISOString();
    const logMessage = `${req.method} ${req.url}`;
    const queryParams = JSON.stringify(req.query);

    figlet.text(req.method, (err, methodArt) => {
        if (err) {
            console.error(chalk.default.bgRed.bold('Error generating ASCII art'), err);
            return;
        }

        console.log(
            chalk.default.blueBright(methodArt),
            chalk.default.bgYellow.bold(req.url),
            chalk.default.bgGreen.bold('Timestamp:'),
            chalk.default.green(timestamp),
            chalk.default.bgCyan.bold('Query Params:'),
            chalk.default.cyan(queryParams)
        );

        fs.appendFile('logs.txt', `${timestamp} ${logMessage} Query Params: ${queryParams}\n`, (err) => {
            if (err) {
                console.error(chalk.default.bgRed.bold('Error writing to log file'), err);
            }
        });

        next();
    });
};

module.exports = logger;