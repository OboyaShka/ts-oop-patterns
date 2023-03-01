import IoC from "../framework/ioc";

export class ExampleService {
    constructor(ioc: IoC) {
    }

    run(): void {
        console.log('Example service run!')
    }
}