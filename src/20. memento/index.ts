// поведенческий шаблон проектирования, позволяющий, не нарушая инкапсуляцию, зафиксировать и сохранить
// внутреннее состояние объекта так, чтобы позднее восстановить его в это состояние.

class Memento<T> {
    constructor(public value: T) {
    }
}

class MementoManager {
    private values: Memento<any>[] = [];

    public addMemento<T>(memento: Memento<T>): void {
        this.values.push(memento);
    }

    public getMemento<T>(index: number): Memento<T> {
        if (this.values[index] === undefined) {
            new Error('memento not find');
        }
        return this.values[index];
    }

    public save<T>(val: T): Memento<T> {
        return new Memento<T>(JSON.parse(JSON.stringify(val)));
    }

    public restore<T>(memento: Memento<T>): T {
        return memento.value;
    }
};

const mementoManager = new MementoManager();
mementoManager.addMemento<string>(mementoManager.save<string>('hello1'));
mementoManager.addMemento<string>(mementoManager.save<string>('hello2'));

const nameObject: { name: string } = { name: 'hello3' };
mementoManager.addMemento<{ name: string }>(mementoManager.save<{ name: string }>(nameObject));

console.log(mementoManager.restore(mementoManager.getMemento<string>(1)));
nameObject.name = '123123wesda';
console.log(mementoManager.restore(mementoManager.getMemento<{ name: string }>(2)));