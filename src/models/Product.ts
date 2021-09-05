export class Product {
  private id: string;
  private name: string;
  private value: number;

  constructor(id: string, name: string, value: number) {
    this.id = id
    this.name = name
    this.value = value
  }

  setValue(value: number): void {
    this.value = value
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getValue(): number {
    return this.value
  }

  calculateDiscountedPrice(discount: number): void {
    const newValue = this.value > discount ? this.value - discount : 0
    this.setValue(newValue)
  }
}
