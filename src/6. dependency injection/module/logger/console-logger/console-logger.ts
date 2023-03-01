import { Logger } from '../logger';

export class ConsoleLogger extends Logger {

    debug(...msg: any[]) {
        console.log(...msg);
    }

    info(...msg: any[]) {
        console.log(...msg);
    }

    error(...msg: any[]) {
        console.log(...msg);
    }
}