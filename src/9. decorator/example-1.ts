// TS example

// Декоратор класса
const logClass = (constructor: Function) => {
    console.log(constructor);
};

// Декоратор свойства
const logProperty = (target: Object, propertyKey: string | symbol) => {
    console.log(propertyKey);
};

// Декоратор метода
const logMethod = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    console.log(propertyKey);
};

// Декоратор аксессора
const logGet = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    console.log(propertyKey);
};

const enumerableFirst = (value: boolean) => {
    console.log('factory1');
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        console.log('callback1');
        descriptor.enumerable = value;
    };
};

const enumerableSecond = (value: boolean) => {
    console.log('factory2');
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        console.log('callback2');
        descriptor.enumerable = value;
    };
};

@logClass
class User {

    @logProperty
    secret: number;

    constructor(public name: string, public age: number) {
        this.secret = 20121999;
    }

    @enumerableFirst(false) // f1 f2 c2 c1
    @enumerableSecond(false)
    @logMethod
    public getPass(): string {
        return `${this.name}${this.age}`;
    }

    @logGet
    public get secretNumber(): number {
        return this.secret;
    }
}

const user = new User('Denis', 23);
user.getPass();

// Factory Decorator
function factory(value: any) {
    return function(target: any) {
        console.log(target);
    };
}

