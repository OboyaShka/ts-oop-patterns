// Пораждающий шаблон проектирования предоставляющий логику внедрения сервисовв клиентский код
// без понимания что нужно для создания сервисов. Позволяет инкапсулировать логику создания сервисов
// Client - Любой код, который хочет получить зависимость
// Service - Код, который может быть интересен для внедрения.
// Injector - Сущность, которая внедрит сервис в клиента наиболее удобным способом для ЯП
// Service может быть Client и также требовать другие сервисы как зависимости
// constructor injection (инъекция в констуктор)
// setter injection (инъекция в публичное свойство/сеттер)

// Приемущества
// + Делегирование создания сервиса (Освобождаем клиент от лишней логики)
// + Упрощаем тестирование
// + Делает композицию более эффективной
// + Гибкая конфигурация и подмена сервисов

// Недостатки
// - Усложнение приложения
// - Безопасность, в код могут быть влиты чужие зависимости
// - Появление неявных связей

// Injector - Inversion Of Control (IoC) Container
// Список методов
// use(token) - получение сервиса по токену
// bind(token, injector => type) Связь токена с фабрикой, создающей сервис
// singleton(token, injector => type) Создание singleton сервиса
// resolving(token, type => type) Логика после создания сервиса, но перед отдачей клиенту
// register(serviceProvider) Конфигурация контейнера.
// ServiceProvider место, где модуль будет регистрировать зависимости в контейнер

import IoC from "./ioc";
import ExampleServiceProvider from "./module/example/example.service-provider";
import { APP_CONFIG_TOKEN, APP_TITLE_TOKEN, ROUTERS_TOKENS } from "./module/example/contracts";
import { ExampleService } from "./module/example/example.service";

export interface ServiceProvider {
    register(ioc: IoC): void
}

export interface GlobalConfig extends ProvidersConfig {
    foo: string
    appTitle?: string
}

export interface ProvidersConfig {
    providers?: ServiceProvider[]
}

export const appConfig: GlobalConfig = {
    providers: [
        ExampleServiceProvider
    ],
    foo: 'FOO',
}

const ioc = new IoC()

if (appConfig.providers) {
    for (let serviceProvider of appConfig.providers) {
        serviceProvider.register(ioc)
    }
}

const appTitle = ioc.use(APP_TITLE_TOKEN)
console.log(appTitle)

const config = ioc.use(APP_CONFIG_TOKEN)
console.log(config)

const exampleService = ioc.use(ExampleService)
exampleService.run()

const routes = ioc.use(ROUTERS_TOKENS)
console.log(routes)
routes.forEach(route => console.log(route.path, route.title))