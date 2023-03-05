// ts proxy

const person = {
    name: 'Denis',
    age: 23
};

const personProxy = new Proxy(person, {
    get(target: { name: string; age: number }, p: keyof { name: string; age: number }, receiver: any): any {
        console.log(target, p, receiver);

        return target[p];
    },
    set(target: { name: string; age: number }, p: keyof { name: string; age: number }, newValue: any, receiver: any): boolean {
        // receiver прокси, с которым идёт работа
        if (p === 'name') {
            target[p] = newValue.toString();
        }

        if (p === 'age') {
            target[p] = +newValue * 2;
        }

        return true;
    },
    has(target: { name: string; age: number }, p: string | symbol): boolean {
        return true;
    },
    deleteProperty(target: { name: string; age: number }, p: string | symbol): boolean {
        return true;
    },
    construct(target: { name: string; age: number }, argArray: any[], newTarget: Function): object {
        return {}; // Инициализация класса
    },
    getOwnPropertyDescriptor(target: { name: string; age: number }, p: string | symbol): PropertyDescriptor | undefined {
        const descriptor: PropertyDescriptor = {
            enumerable: true
        };
        return descriptor;
    }
});

personProxy.age = 20;

console.log(personProxy);
