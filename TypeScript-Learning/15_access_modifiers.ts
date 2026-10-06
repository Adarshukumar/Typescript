// Lesson 15 — access modifiers: public, private, protected. Author: Adarsh
class Account {
  public owner: string;        // default — everything can touch it
  private balance: number;     // only inside THIS class
  protected type: string;      // this class + subclasses

  constructor(owner: string, balance = 0) {
    this.owner = owner;
    this.balance = balance;
    this.type = "savings";
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("amount must be positive");
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;       // read happens through MY method
  }
}

class PremiumAccount extends Account {
  constructor(owner: string) { super(owner, 1000); }

  describe(): string {
    return `${this.owner} (${this.type})`;   // protected is visible here
    // return `${this.balance}`;             // ERROR: private is NOT visible
  }
}

const acc = new PremiumAccount("Adarsh");
acc.deposit(500);
console.log(acc.describe(), acc.getBalance());
// acc.balance;         // ERROR: property is private
// acc.type;            // ERROR: protected

// #private (real JS field) is even stronger — runtime enforced:
class Vault {
  #secret = 42;
  peek(): number { return this.#secret; }
}
console.log(new Vault().peek());

// private (TS) disappears at compile time; #private stays private in JS.
// Rule: TS private for everyday code, #private when it REALLY must not leak.

// Practice: add a private transaction log array to Account.
