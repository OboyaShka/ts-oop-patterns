export interface GetParams {
    key: string;
    value: string;
}

export class ApiBuilder {
    protected apiPrefix = "api";
    protected protocol = "https://";
    protected baseDomain = "google.com";

    protected getParams: GetParams[] = [];
    protected module = "";
    protected controller = "index";
    protected action = "index";

    // module/controller/action

    addGetParam(newParam: GetParams): ApiBuilder {
        this.getParams = [
            ...this.getParams.filter((param) => param.key !== newParam.key),
            newParam
        ];
        return this;
    }

    setGetPararms(params: GetParams[]): ApiBuilder {
        this.getParams = params;
        return this;
    }

    getGetPararms(): GetParams[] {
        return this.getParams;
    }

    setModule(module: string): ApiBuilder {
        this.module = module;
        return this;
    }

    getModule(): string {
        return this.module;
    }

    setController(controller: string): ApiBuilder {
        this.controller = controller;
        return this;
    }

    getController(): string {
        return this.controller;
    }

    setAction(action: string): ApiBuilder {
        this.action = action;
        return this;
    }

    getAction(): string {
        return this.action;
    }

    setApiPrefix(apiPrefix: string): ApiBuilder {
        this.apiPrefix = apiPrefix;
        return this;
    }

    getApiPrefix(): string {
        return this.apiPrefix;
    }

    setBaseDomain(baseDomain: string): ApiBuilder {
        this.baseDomain = baseDomain;
        return this;
    }

    getBaseDomain(): string {
        return this.baseDomain;
    }

    create(): string {
        const baseUrl = `${this.protocol + this.baseDomain}/${this.apiPrefix}/`;

        if (!this.module) {
            throw new Error("module name is required");
        }

        const apiUrl =
            baseUrl + [this.module, this.controller, this.action].join("/");

        if (this.getParams.length === 0) {
            return apiUrl;
        }

        return (
            apiUrl +
            "?" +
            this.getParams.map((param) => param.key + "=" + param.value).join("&")
        );
    }
}
