import IoC from '../framework/ioc';
import { APP_CONFIG_TOKEN, APP_TITLE_TOKEN, ROUTERS_TOKENS } from './contracts';
import { ExampleService } from './example.service';
import { appConfig, GlobalConfig, ServiceProvider } from '../core/interfaces';
import { RouteCollection } from '../routing/route-collection';
import { HomeRoute } from './home-route';
import { AboutRoute } from './ about-route';

class ExampleServiceProvider implements ServiceProvider {
    register(ioc: IoC): void {
        ioc.singleton(
            APP_TITLE_TOKEN,
            (): string => 'WBB App'
        );

        ioc.resolving(APP_TITLE_TOKEN, (ctx): string => `<h1>${ctx.instance}</h1>`);

        ioc.singleton(
            APP_CONFIG_TOKEN,
            (): GlobalConfig => {
                const { providers, ...config } = appConfig;
                return config;
            }
        );

        ioc.resolving(APP_CONFIG_TOKEN, (ctx): GlobalConfig => {
            return {
                ...ctx.instance,
                appTitle: ctx.ioc.use(APP_TITLE_TOKEN)
            };
        });

        ioc.singleton(
            ExampleService,
            () => new ExampleService(ioc)
        );

        ioc.singleton(
            ROUTERS_TOKENS,
            () => []
        );

        ioc.resolving(
            ROUTERS_TOKENS,
            ctx => {
                ctx.instance.push({
                    path: '/',
                    title: 'Home'
                });

                ctx.instance.push({
                    path: '/news',
                    title: 'News'
                });
                return ctx.instance;
            }
        );

        ioc.resolving(
            RouteCollection,
            ctx => {
                const routeCollection = ctx.instance;
                routeCollection.addRoute(new HomeRoute());
                routeCollection.addRoute(new AboutRoute());
                return routeCollection;
            }
        );
    }
}

export default new ExampleServiceProvider();