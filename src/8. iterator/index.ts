// поведенческий шаблон проектирования. Представляет собой объект, позволяющий получить последовательный доступ
// к элементам объекта-агрегата без использования описаний каждого из агрегированных объектов.
// Например, такие элементы как дерево, связанный список, хеш-таблица и массив могут быть пролистаны с помощью объекта Итератор.

interface CustomIterator<T> {
    next(): T;

    currentItem(): T;

    hasNext(): boolean;
}

interface Aggregate<T> {
    createIterator(): CustomIterator<T>;
}

class ConcreteIterator implements CustomIterator<number> {
    private index = 0;
    private collection: number[] = [];

    constructor(collection: number[]) {
        this.collection = collection;
    }

    public next(): number {
        return this.collection[this.index++];
    }

    public currentItem(): number {
        return this.collection[this.index];
    }

    public hasNext(): boolean {
        return this.index < this.collection.length;
    }
}

class ConcreteAggregate implements Aggregate<number> {
    private collection: number[] = [];

    constructor(collection: number[]) {
        this.collection = collection;
    }

    createIterator(): CustomIterator<number> {
        return new ConcreteIterator(this.collection);
    }
}

const aggregator: Aggregate<number> = new ConcreteAggregate([7, 4, 12, 6, 3]);
const iterator: CustomIterator<number> = aggregator.createIterator();

while (iterator.hasNext()) {
    console.log(iterator.next());
}