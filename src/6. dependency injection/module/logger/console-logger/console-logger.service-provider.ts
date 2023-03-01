import { ServiceProvider } from "../../core/interfaces";
import IoC from "../../framework/ioc";
import { ConsoleLogger } from "./console-logger";
import { Logger } from "../logger";

class ConsoleLoggerServiceProvider implements ServiceProvider {
    register(ioc: IoC): void {
        ioc.singleton(
            Logger,
            () => new ConsoleLogger(ioc)
        )
    }
}

export default new ConsoleLoggerServiceProvider()