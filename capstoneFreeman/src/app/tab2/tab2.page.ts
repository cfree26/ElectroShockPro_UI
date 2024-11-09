import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  voltage!: number;
  current!: number;
  length!: number;  // Length in feet
  resistance!: number;  // Resistance in ohms per foot
  voltageDrop!: number;

  constructor() {}

  calculateVoltageDrop() {
    if (this.voltage && this.current && this.length && this.resistance) {
      // Voltage Drop formula: V_drop = I * R * 2 * L, L in feet
      this.voltageDrop = this.current * this.resistance * 2 * this.length;
    } else {
      this.voltageDrop = 0;
      alert('Please enter all fields to calculate the voltage drop.');
    }
  }

  clearFields() {
    this.voltage = 0;
    this.current = 0;
    this.length = 0;
    this.resistance = 0;
    this.voltageDrop = 0;
  }
}
