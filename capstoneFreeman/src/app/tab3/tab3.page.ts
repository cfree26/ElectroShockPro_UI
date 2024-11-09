import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {
  voltage!: number;
  current!: number;
  power!: number;

  constructor() {}

  calculatePower() {
    if (this.voltage && this.current) {
      // Power formula: P = V * I
      this.power = this.voltage * this.current;
    } else {
      this.power = 0;
      alert('Please enter both Voltage (V) and Current (I) to calculate power.');
    }
  }

  clearFields() {
    this.voltage = 0;
    this.current = 0;
    this.power = 0;
  }
}
