// Cтруктурный шаблон проектирования, предназначенный для динамического подключения дополнительного поведения к объекту.
// Шаблон Декоратор предоставляет гибкую альтернативу практике создания подклассов с целью расширения функциональности.

class Car {
    protected price: number;
    protected model: string;

    constructor() {
        this.price = 10000;
        this.model = 'Car';
    }

    getPrice(): number {
        return this.price;
    };

    getDescription(): string {
        return this.model;
    };
}

class Tesla extends Car {
    constructor() {
        super();
        this.price = 25000;
        this.model = 'Tesla';
    }
}

class Autopilot extends Car {
    private car: Car;

    constructor(car: Car) {
        super();
        this.car = car;
    }

    getPrice(): number {
        return this.car.getPrice() + 3000;
    }

    getDescription(): string {
        return `${this.car.getDescription()} with autopilot`;
    }
}

class Parktronic extends Car {
    private car: Car;

    constructor(car: Car) {
        super();
        this.car = car;
    }

    getPrice(): number {
        return this.car.getPrice() + 1000;
    }

    getDescription(): string {
        return `${this.car.getDescription()} with parktronic`;
    }
}

let teslaElite: Car = new Tesla();
teslaElite = new Autopilot(teslaElite);
teslaElite = new Parktronic(teslaElite);

console.log(teslaElite.getPrice(), teslaElite.getDescription());

let tesla: Car = new Tesla();
tesla = new Parktronic(tesla);

console.log(tesla.getPrice(), tesla.getDescription());

