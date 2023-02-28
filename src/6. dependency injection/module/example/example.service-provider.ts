import { appConfig, GlobalConfig, ServiceProvider } from "../../index";
import IoC from "../../ioc";
import { APP_CONFIG_TOKEN, APP_TITLE_TOKEN, ROUTERS_TOKENS } from "./contracts";
import { ExampleService } from "./example.service";

class ExampleServiceProvider implements ServiceProvider {
    register(ioc: IoC): void {
        ioc.singleton(
            APP_TITLE_TOKEN,
            (): string => 'WBB App'
        )

        ioc.resolving(APP_TITLE_TOKEN, (ctx): string => `<h1>${ctx.instance}</h1>`)

        ioc.singleton(
            APP_CONFIG_TOKEN,
            (): GlobalConfig => {
                const { providers, ...config } = appConfig
                return config
            }
        )

        ioc.resolving(APP_CONFIG_TOKEN, (ctx): GlobalConfig => {
            return {
                ...ctx.instance,
                appTitle: ctx.ioc.use(APP_TITLE_TOKEN)
            }
        })

        ioc.singleton(
            ExampleService,
            () => new ExampleService(ioc),
        )

        ioc.singleton(
            ROUTERS_TOKENS,
            () => []
        )

        ioc.resolving(
            ROUTERS_TOKENS,
            ctx => {
                ctx.instance.push({
                    path: '/',
                    title: 'Home'
                })

                ctx.instance.push({
                    path: '/news',
                    title: 'News'
                })
                return ctx.instance
            }
        )
    }
}

export default new ExampleServiceProvider()