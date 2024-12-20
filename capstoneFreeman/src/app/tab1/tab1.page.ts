import { Component } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { addCalculation, getAllCalculations } from '../services/database.service';

@Component({
  selector: 'app-ohms-law',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  voltage: string = '';
  current: string = '';
  resistance: string = '';
  result: string = '';
  lastThreeCalculations: any[] = []; // Store the last three calculations

  constructor() {}

  async calculateVoltage() {
    const current = parseFloat(this.current);
    const resistance = parseFloat(this.resistance);

    if (!isNaN(current) && !isNaN(resistance)) {
      this.voltage = (current * resistance).toString();
      this.result = `Voltage (V) = ${this.voltage} V`;

      await addCalculation({
        type: 'Ohm\'s Law',
        voltage: this.voltage,
        current: this.current,
        resistance: this.resistance,
        result: this.result,
      });

      this.triggerHapticFeedback();
    } else {
      this.result = 'Please enter valid numbers for Current (I) and Resistance (R).';
    }
  }

  async calculateCurrent() {
    const voltage = parseFloat(this.voltage);
    const resistance = parseFloat(this.resistance);

    if (!isNaN(voltage) && !isNaN(resistance)) {
      this.current = (voltage / resistance).toString();
      this.result = `Current (I) = ${this.current} A`;

      await addCalculation({
        type: 'Ohm\'s Law',
        voltage: this.voltage,
        current: this.current,
        resistance: this.resistance,
        result: this.result,
      });

      this.triggerHapticFeedback();
    } else {
      this.result = 'Please enter valid numbers for Voltage (V) and Resistance (R).';
    }
  }

  async calculateResistance() {
    const voltage = parseFloat(this.voltage);
    const current = parseFloat(this.current);

    if (!isNaN(voltage) && !isNaN(current)) {
      this.resistance = (voltage / current).toString();
      this.result = `Resistance (R) = ${this.resistance} Ω`;

      await addCalculation({
        type: 'Ohm\'s Law',
        voltage: this.voltage,
        current: this.current,
        resistance: this.resistance,
        result: this.result,
      });

      this.triggerHapticFeedback();
    } else {
      this.result = 'Please enter valid numbers for Voltage (V) and Current (I).';
    }
  }

  async showAllCalculations() {
    const calculations = await getAllCalculations();
    if (!Array.isArray(calculations) || calculations.length === 0) {
      console.log('No calculations found.');
      this.lastThreeCalculations = [];
      return;
    }

    // Get the last three calculations
    this.lastThreeCalculations = calculations.slice(-3).reverse(); // Reverse to show most recent first
    console.log('Last Three Calculations:', this.lastThreeCalculations);
  }

  clearFields() {
    this.voltage = '';
    this.current = '';
    this.resistance = '';
    this.result = '';
  }

  async triggerHapticFeedback() {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  }
}
