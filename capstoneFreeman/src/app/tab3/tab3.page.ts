import { Component } from '@angular/core';
import { addCalculation, getAllCalculations } from '../services/database.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {
  voltage!: number;
  current!: number;
  power!: number;
  result: string = '';
  lastThreeCalculations: any[] = []; // Store the last three calculations

  constructor() {}

  async calculatePower(): Promise<void> {
    if (this.voltage && this.current) {
      // Power formula: P = V * I
      this.power = this.voltage * this.current;
      this.result = `Power = ${this.power.toFixed(2)} W`;

      await this.saveCalculation();
    } else {
      this.power = 0;
      this.result = 'Please enter both Voltage (V) and Current (I) to calculate power.';
      alert(this.result);
    }
  }

  async saveCalculation(): Promise<void> {
    try {
      await addCalculation({
        type: 'Power Calculation',
        voltage: this.voltage.toString(),
        current: this.current.toString(),
        resistance: '0', // Placeholder for resistance, as it's not used here
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
        .filter((calc) => calc.type === 'Power Calculation')
        .slice(-3)
        .reverse();
      console.log('Last Three Calculations (Power):', this.lastThreeCalculations);
    } catch (error) {
      console.error('Error fetching calculations:', error);
    }
  }

  clearFields(): void {
    this.voltage = 0;
    this.current = 0;
    this.power = 0;
    this.result = '';
  }
}

