// поведенческий шаблон проектирования, который использует отношение "один ко многим".
// В этом отношении есть один наблюдаемый объект и множество наблюдателей.
// При изменении наблюдаемого объекта автоматически происходит оповещение всех наблюдателей.

// Шаблон «наблюдатель» применяется в тех случаях, когда система обладает следующими свойствами:
// * существует как минимум один объект, рассылающий сообщения;
// * имеется не менее одного получателя сообщений, причём их количество и состав могут изменяться во время работы приложения;
// * позволяет избежать сильного зацепления взаимодействующих классов.
// Данный шаблон часто применяют в ситуациях, в которых отправителя сообщений не интересует, что делают получатели с предоставленной им информацией.

const USERS: User[] = [{
    name: 'Denis',
    age: 23
}, {
    name: 'Efim',
    age: 18
}, {
    name: 'Vlad',
    age: 63
}];

interface User {
    name: string,
    age: number
}

interface Subject<T> {
    getState(): SubjectState<T>;

    subscribe(observer: Observer<T>): void;

    unsubscribe(observer: Observer<T>): void;

    notifyObservers(): void;
}

interface Observer<T> {
    update(eventListener: Subject<T>): void;

    __proto__?: any;
}

interface SubjectState<T> {
    data: T[];
    readonly error: Error | null;
}

class UsersSubject implements Subject<User> {
    private state: SubjectState<User> = { data: [], error: null };
    private observers: Observer<User>[] = [];

    getState(): SubjectState<User> {
        return this.state;
    }

    subscribe(observer: Observer<User>): void {
        const className = observer.__proto__.constructor.name;
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.error(`Observer ${className} was already subscribed`);
        }
        this.observers.unshift(observer);
        console.log(`Observer ${className} was successfully subscribed`);
    }

    unsubscribe(observer: Observer<User>): void {
        const className = observer.__proto__.constructor.name;
        const observerIdx = this.observers.indexOf(observer);
        if (observerIdx > -1) {
            this.observers.splice(observerIdx, 1);
            console.log(`Observer ${className} was successfully unsubscribed`);
        } else {
            console.error(`Observer ${className} not in collection`);
        }
    }

    notifyObservers(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    getUsers(): Promise<void> {
        return new Promise(resolve => {
            setTimeout(() => {
                this.state.data = USERS;
                this.notifyObservers();
                resolve();
            }, 1000);
        });

    };
}

class SortObserver implements Observer<User> {
    update(eventListener: Subject<User>): void {
        const { data } = eventListener.getState();
        const sortedUsers = data.sort((a, b) => a.age - b.age);
        console.log(sortedUsers);
    }
}

class JSONSerializeObserver implements Observer<User> {
    update(eventListener: Subject<User>): void {
        const { data } = eventListener.getState();
        console.log(JSON.stringify(data));
    }
}

const usersSubject = new UsersSubject();
const sortObserver = new SortObserver();
const jsonSerializeObserver = new JSONSerializeObserver();

[sortObserver, jsonSerializeObserver].forEach(observer => {
    usersSubject.subscribe(observer);
});

usersSubject.getUsers().then(() => {
    [sortObserver, jsonSerializeObserver].forEach(observer => {
        usersSubject.unsubscribe(observer);
    });
});