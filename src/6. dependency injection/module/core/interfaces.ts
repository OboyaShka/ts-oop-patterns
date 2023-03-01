import IoC from '../framework/ioc';
import ExampleServiceProvider from '../example/example.service-provider';
import AlertLoggerServiceProvider from '../logger/alert-logger/alert-logger.service-provider';
import RoutingServiceProvider from '../routing/routing.service-provider';

export interface ServiceProvider {
    register(ioc: IoC): void;
}

export interface GlobalConfig extends ProvidersConfig {
    foo: string;
    appTitle?: string;
}

export interface ProvidersConfig {
    providers?: ServiceProvider[];
}

// Выбор провайдера определяет реализацию контракта логера
export const appConfig: GlobalConfig = {
    providers: [
        ExampleServiceProvider,
        AlertLoggerServiceProvider,
        //ConsoleLoggerServiceProvider
        RoutingServiceProvider
    ],
    foo: 'FOO'
};

export interface Path {
    path: string,
    title: string
}