export default class IoC {
    private _resolvers: any
    private _isSingleton: any
    private _resolvingHandlers: any
    private _resolvedInstances: any

    constructor() {
        this._resolvers = {}
        this._isSingleton = {}
        this._resolvingHandlers = {}
        this._resolvedInstances = {}
    }

    public use(token) {
        if (!this._resolvers[token]) {
            throw new Error('Not found error. Resolver for token ' + token + ' doesn\'t exist')
        }

        if (this._resolvedInstances[token]) return this._resolvedInstances[token]

        let instance = this._resolvers[token](this)

        const handlers = this._resolvingHandlers[token] || []

        for (let handler of handlers) {
            instance = handler({ instance, ioc: this })
        }

        if (this._isSingleton[token]) {
            this._resolvedInstances[token] = instance
        }

        return instance
    }

    public bind(token, resolver) {
        this._resolvers[token] = resolver
    }

    public singleton(token, resolver) {
        this._isSingleton[token] = true
        this.bind(token, resolver)
    }

    public resolving(token, handler) {
        this._resolvingHandlers[token] = this._resolvingHandlers[token]
            ? [...this._resolvingHandlers[token], handler]
            : [handler]
    }

    public register(serviceProvider) {
        serviceProvider.register(this)
    }
}