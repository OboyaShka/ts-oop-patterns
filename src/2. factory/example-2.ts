// Создание экземпляров разных классов, в зависимости от входных данных. Плохо расширяемый вариант.

interface Shape {
    draw(): void;
  }
  
  class Rectangle implements Shape {
    draw(): void {
      console.log("Внутри Reactangle.draw метод");
    }
  }
  
  class Circle implements Shape {
    draw(): void {
      console.log("Внутри Circle.draw метод");
    }
  }
  
  class Square implements Shape {
    draw(): void {
      console.log("Внутри Square.draw метод");
    }
  }
  
  class ShapeFactory {
    create(type: "rectangle" | "circle" | "square"): Shape {
      switch (type) {
        case "rectangle":
          return new Rectangle();
        case "circle":
          return new Circle();
        case "square":
          return new Square();
        default:
          throw new Error("Invalid Object Type");
      }
    }
  }