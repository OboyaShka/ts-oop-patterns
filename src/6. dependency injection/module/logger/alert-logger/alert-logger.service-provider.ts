import { ServiceProvider } from "../../core/interfaces";
import IoC from "../../framework/ioc";
import { Logger } from "../logger";
import { AlertLogger } from "./alert-logger";

class AlertLoggerServiceProvider implements ServiceProvider {
    register(ioc: IoC): void {
        ioc.singleton(
            Logger,
            () => new AlertLogger(ioc)
        )
    }
}

export default new AlertLoggerServiceProvider()