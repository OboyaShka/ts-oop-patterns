function Singleton() {
    console.log('Hello from example 2');
}

Singleton.prototype.foo = function() {
    // Логика
};

// @ts-ignore
Singleton.instance = null;

Singleton.getInstance = function() {
    if (!Singleton.instance) {
        // @ts-ignore
        Singleton.instance = new Singleton();
    }

    return Singleton.instance;
};

export const getInstance = Singleton.getInstance;