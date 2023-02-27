export const conf = new Map();

abstract class Shape {
    draw(): void {
        throw new Error("Method draw not implemented");
    }
}

class Rectangle extends Shape {
    draw(): void {
        console.log("Внутри Reactangle.draw метод");
    }
}

conf.set(Rectangle, Rectangle);

class Circle extends Shape {
    draw(): void {
        console.log("Внутри Circle.draw метод");
    }
}

conf.set(Circle, Circle);

class Square extends Shape {
    draw(): void {
        console.log("Внутри Square.draw метод");
    }
}

conf.set(Square, Square);

export class ShapeFactory {
    create(type: new () => Shape): Shape {
        if (!conf.has(type)) {
            throw new Error("Invalid Object Type");
        }
        const typeConstructor = conf.get(type);
        return new typeConstructor();
    }
}

class AmasingCircle extends Shape {
    draw(): void {
        console.log("Внутри AmasingCircle.draw метод");
    }
}

conf.set(Circle, AmasingCircle);

const factory = new ShapeFactory();

factory.create(Rectangle).draw();
factory.create(Circle).draw();
factory.create(Square).draw();
console.log(1);
