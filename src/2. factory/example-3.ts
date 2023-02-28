export const conf = new Map<ShapesUnion, new () => Shape>();
export type ShapesUnion =
    (new () => Shape)
    | (new () => Rectangle)
    | (new () => Circle)
    | (new () => Square)
    | (new () => AmazingCircle)

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
    create(type: ShapesUnion): Shape {
        const typeConstructor = conf.get(type);
        if (!typeConstructor) {
            throw new Error("Invalid Object Type");
        }
        return new typeConstructor();
    }
}

class AmazingCircle extends Shape {
    draw(): void {
        console.log("Внутри AmazingCircle.draw метод");
    }
}

conf.set(Circle, AmazingCircle);

const factory = new ShapeFactory();

factory.create(Rectangle).draw();
factory.create(Circle).draw();
factory.create(Square).draw();
console.log(1);
