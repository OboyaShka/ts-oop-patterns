import { ServiceProvider } from '../core/interfaces';

export type IoCHandlerCallback = (
    ctx: {
        instance: any,
        ioc: IoC
    }
) => any

export default class IoC {
    private _resolvers: { [key in any]: (ioc: IoC) => any };
    private _isSingleton: { [key in any]: boolean };
    private _resolvingHandlers: { [key in any]: IoCHandlerCallback[] };
    private _resolvedInstances: { [key in any]: any };

    constructor() {
        this._resolvers = {};
        this._isSingleton = {};
        this._resolvingHandlers = {};
        this._resolvedInstances = {};
    }

    public use<T>(token: any): T {
        if (!this._resolvers[token]) {
            throw new Error('Not found error. Resolver for token ' + token + ' doesn\'t exist');
        }

        if (this._resolvedInstances[token]) return this._resolvedInstances[token];

        let instance = this._resolvers[token](this);

        const handlers = this._resolvingHandlers[token] || [];

        for (let handler of handlers) {
            instance = handler({ instance, ioc: this });
        }

        if (this._isSingleton[token]) {
            this._resolvedInstances[token] = instance;
        }

        return instance;
    }

    public bind(token: any, resolver: () => {}): void {
        this._resolvers[token] = resolver;
    }

    public singleton(token: any, resolver: () => {}): void {
        this._isSingleton[token] = true;
        this.bind(token, resolver);
    }

    public resolving(token: any, handler: IoCHandlerCallback): void {
        this._resolvingHandlers[token] = this._resolvingHandlers[token]
            ? [...this._resolvingHandlers[token], handler]
            : [handler];
    }

    public register(serviceProvider: ServiceProvider): void {
        serviceProvider.register(this);
    }
}