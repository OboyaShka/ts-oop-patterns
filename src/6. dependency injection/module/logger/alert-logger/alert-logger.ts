import { Logger } from '../logger';

// Реазлизация контракта логера
export class AlertLogger extends Logger {

    debug(...msg: any[]) {
        console.log('Вывод сообщения в окно алерта', ...msg);
    }

    info(...msg: any[]) {
        console.log('Вывод сообщения в окно алерта', ...msg);
    }

    error(...msg: any[]) {
        console.log('Вывод сообщения в окно алерта', ...msg);
    }
}