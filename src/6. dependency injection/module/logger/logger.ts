import IoC from "../framework/ioc";

// Контракт, по которму мы отдаём нашему фрейморку
export abstract class Logger {
    constructor(ioc: IoC) {
    }

    debug(...msg: any): void {
        console.log(...msg)
    }

    info(...msg: any): void {
        console.log(...msg)
    }

    error(...msg: any): void {
        console.log(...msg)
    }
}