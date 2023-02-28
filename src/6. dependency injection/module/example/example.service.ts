import IoC from "../../ioc";

export class ExampleService {
    constructor(ioc: IoC) {
    }

    run(): void {
        console.log('Example service run!')
    }
}