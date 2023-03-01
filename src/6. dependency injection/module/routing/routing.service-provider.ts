import { ServiceProvider } from "../core/interfaces";
import IoC from "../framework/ioc";
import { Router } from "./router";
import { RouteCollection } from "./route-collection";
import { NotFoundRoute } from "./not-found-route";

class RoutingServiceProvider implements ServiceProvider {
    register(ioc: IoC) {
        ioc.singleton(
            Router,
            () => new Router(ioc)
        )

        ioc.singleton(
            RouteCollection,
            () => new RouteCollection(ioc)
        )

        ioc.resolving(
            RouteCollection,
            ctx => {
                const routeCollection = ctx.instance
                routeCollection.addRoute(new NotFoundRoute())
                return routeCollection
            }
        )
    }
}

export default new RoutingServiceProvider()