import IoC from "../framework/ioc";
import { Route } from "./route";

export class RouteCollection {
    private _routes: Route[] = []

    constructor(ioc: IoC) {
    }

    public get routes() {
        return [...this._routes];
    }

    public addRoute = (route: Route) => {
        this._routes.push(route)
    }
}