function Singleton() {
    console.log("Hello from example 2")
}

Singleton.prototype.foo = function () {
    // Логика
}

Singleton.instance = null

Singleton.getInstance = function () {
    if (!Singleton.instance) {
        Singleton.instance = new Singleton()
    }

    return Singleton.instance
}

export const getInstance = Singleton.getInstance