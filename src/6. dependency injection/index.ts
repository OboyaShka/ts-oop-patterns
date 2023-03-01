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

import IoC from './module/framework/ioc';
import { APP_CONFIG_TOKEN, APP_TITLE_TOKEN, ROUTERS_TOKENS } from './module/example/contracts';
import { ExampleService } from './module/example/example.service';
import { appConfig, Path } from './module/core/interfaces';
import { App } from './module/framework/app';

export const lesson6 = () => {
    /* Test IoC container */
    const ioc = new IoC();

    if (appConfig.providers) {
        for (let serviceProvider of appConfig.providers) {
            serviceProvider.register(ioc);
        }
    }

    const appTitle = ioc.use(APP_TITLE_TOKEN);
    console.log(appTitle);

    const config = ioc.use(APP_CONFIG_TOKEN);
    console.log(config);

    const exampleService = ioc.use<ExampleService>(ExampleService);
    exampleService.run();

    const routes = ioc.use<Path[]>(ROUTERS_TOKENS);
    console.log(routes);
    routes.forEach(route => console.log(route.path, route.title));

    /* Test Service Contract */

    const app = new App();
    const appIoC = app.run();
};

