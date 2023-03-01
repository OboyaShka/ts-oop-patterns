import IoC from './ioc';
import { appConfig } from '../core/interfaces';
import { Logger } from '../logger/logger';
import { Router } from '../routing/router';

export class App {
    run(): IoC {
        const ioc = new IoC();

        if (appConfig.providers) {
            for (let serviceProvider of appConfig.providers) {
                serviceProvider.register(ioc);
            }
        }
        const router = ioc.use<Router>(Router);
        router.init();

        // Используем контракт логера без конкретной реализации, которую оставляем за выбором провайдера
        const logger = ioc.use<Logger>(Logger);
        logger.info('App successfully run');

        return ioc;
    }
}