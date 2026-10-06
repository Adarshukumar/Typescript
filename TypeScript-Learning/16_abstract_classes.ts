// Lesson 16 — abstract classes. Author: Adarsh
// Abstract = "incomplete on purpose". Can't be instantiated;
// subclasses MUST fill in the gaps.

abstract class Shape {
  constructor(public name: string) {}

  abstract area(): number;                 // subclasses must implement
  abstract perimeter(): number;

  describe(): string {                     // shared, concrete behavior
    return `${this.name}: area ${this.area().toFixed(2)}, perimeter ${this.perimeter().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(public r: number) { super("circle"); }
  area(): number { return Math.PI * this.r ** 2; }
  perimeter(): number { return 2 * Math.PI * this.r; }
}

class Square extends Shape {
  constructor(public s: number) { super("square"); }
  area(): number { return this.s ** 2; }
  perimeter(): number { return this.s * 4; }
}

// const s = new Shape("?");   // ERROR: cannot create an instance of abstract class

const shapes: Shape[] = [new Circle(2), new Square(3)];
for (const shape of shapes) console.log(shape.describe());

// Polymorphism for free: same call, right implementation per class.
// Abstract class vs interface?
//   interface: shape only, no implementation, no runtime
//   abstract:  shared code + required methods, real runtime class
// Many subclasses sharing logic -> abstract. Pure contract -> interface.

// Practice: abstract class Animal with abstract speak() and concrete intro().
