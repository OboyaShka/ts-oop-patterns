import IoC from "../framework/ioc";
import { RouteCollection } from "./route-collection";

export class Router {
    private routeCollection: RouteCollection

    constructor(ioc: IoC) {
        this.routeCollection = ioc.use(RouteCollection)
    }

    init() {
        this.execute()

        window.onhashchange = () => {
            this.execute()
        }
    }

    execute() {
        const routes = this.routeCollection.routes
        routes.sort((a, b) => a.sortOrder() - b.sortOrder())

        const hash = window.location.hash
        console.log(hash)
        for (let route of routes) {
            if (route.isMatch(hash)) {
                route.render()
                return
            }
        }

        console.error('Router.execute! route not found')
    }
}