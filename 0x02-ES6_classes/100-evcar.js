import Car from './10-car.js';

export default class EVCar extends Car {
  constructor(brand, motor, color, range) {
    super(brand, motor, color);
    this._range = range;
  }

  cloneCar() {
    // Create a new instance of Car, not EVCar
    return new Car(this._brand, this._motor, this._color);
  }
}

