const fs = require('fs');

class Logger {
    static async isProd() {
        return process.env.NODE_ENV === "prod";
    }

    static async error(message) {
        const chalk = await import('chalk');
        if (await this.isProd()) {
            fs.appendFile("logs.txt", message.toString() + "\n", () => { });
            return;
        }
        console.error(chalk.default.red(message));
    }

    static async log(message) {
        const chalk = await import('chalk');
        if (await this.isProd()) {
            fs.appendFile("logs.txt", message.toString() + "\n", () => { });
            return;
        }
        console.log(chalk.default.green(message));
    }

    static verbose(message) {

    }
}

module.exports = Logger;
