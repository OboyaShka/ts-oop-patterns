class Singleton {
    private static instance: Singleton

    private constructor() {
        console.log("Hello from example 1")
    }

    public static getInstance() {
        if (!Singleton.instance) {
            this.instance = new Singleton()
        }

        return this.instance
    }
}

export default Singleton