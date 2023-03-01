let instance: { version: string };

export default () => {
    if (!instance) {
        console.log('Hello from example 4');

        instance = {
            version: '4'
            // Логика
        };
    }

    return instance;
}