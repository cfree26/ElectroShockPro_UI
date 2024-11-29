import { Component } from '@angular/core';
import { addCalculation, getAllCalculations } from '../services/database.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  voltage!: number;
  current!: number;
  length!: number; // Length in feet
  resistance!: number; // Resistance in ohms per foot
  voltageDrop!: number;
  result: string = '';
  lastThreeCalculations: any[] = []; // Store the last three calculations

  constructor() {}

  async calculateVoltageDrop(): Promise<void> {
    if (this.voltage && this.current && this.length && this.resistance) {
      // Voltage Drop formula: V_drop = I * R * 2 * L
      this.voltageDrop = this.current * this.resistance * 2 * this.length;
      this.result = `Voltage Drop = ${this.voltageDrop.toFixed(2)} V`;

      await this.saveCalculation();
    } else {
      this.voltageDrop = 0;
      this.result = 'Please enter all fields to calculate the voltage drop.';
      alert(this.result);
    }
  }

  async saveCalculation(): Promise<void> {
    try {
      await addCalculation({
        type: 'Voltage Drop',
        voltage: this.voltage.toString(),
        current: this.current.toString(),
        resistance: this.resistance.toString(),
        result: this.result,
      });
    } catch (error) {
      console.error('Error saving calculation:', error);
    }
  }

  async showAllCalculations(): Promise<void> {
    try {
      const calculations = await getAllCalculations();
      if (!Array.isArray(calculations) || calculations.length === 0) {
        console.log('No calculations found.');
        this.lastThreeCalculations = [];
        return;
      }

      // Get the last three calculations
      this.lastThreeCalculations = calculations
        .filter((calc) => calc.type === 'Voltage Drop')
        .slice(-3)
        .reverse();
      console.log('Last Three Calculations (Voltage Drop):', this.lastThreeCalculations);
    } catch (error) {
      console.error('Error fetching calculations:', error);
    }
  }

  clearFields(): void {
    this.voltage = 0;
    this.current = 0;
    this.length = 0;
    this.resistance = 0;
    this.voltageDrop = 0;
    this.result = '';
  }
}
