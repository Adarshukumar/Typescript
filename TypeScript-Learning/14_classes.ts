// Lesson 14 — classes with types. Author: Adarsh
class Student {
  // constructor parameter properties — declare AND assign in one line
  constructor(
    public name: string,
    private marks: number[] = [],
    readonly id: number = Student.nextId++,
  ) {}

  static nextId = 1;                       // static: belongs to the class

  addMark(m: number): this {               // `this` return enables chaining
    this.marks.push(m);
    return this;
  }

  get average(): number {                  // getter, typed automatically
    if (this.marks.length === 0) return 0;
    return this.marks.reduce((a, b) => a + b, 0) / this.marks.length;
  }

  describe(): string {
    return `${this.name} (#${this.id}) avg ${this.average.toFixed(1)}`;
  }
}

const me = new Student("Adarsh").addMark(91).addMark(88).addMark(79);
console.log(me.describe());
console.log(Student.nextId);               // static access via class

// implements: promise the class satisfies an interface (checked!)
interface Greeter { greet(): string }
class Robot implements Greeter {
  constructor(private model: string) {}
  greet(): string { return `beep — ${this.model} online`; }
}
console.log(new Robot("R2").greet());

// extends works like JS: one superclass, super() calls
class GradStudent extends Student {
  constructor(name: string, public thesis: string) {
    super(name);                            // must call before using this
  }
  describe(): string { return `${super.describe()} — thesis: ${this.thesis}`; }
}
console.log(new GradStudent("Riya", "TS internals").describe());

// Practice: class Wallet with private balance + deposit/withdraw chaining.
