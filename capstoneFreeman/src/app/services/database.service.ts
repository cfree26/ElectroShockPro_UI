import Dexie, { Table } from 'dexie';

// Define the interface for Calculation data
interface Calculation {
  id?: number; // Optional because it is auto-incremented
  type: string;
  voltage: string;
  current: string;
  resistance: string;
  result: string;
  calculated_at: string; // ISO date string
}

// Define the Dexie database class
export class CalculationsDatabase extends Dexie {
  calculations!: Table<Calculation, number>; // Table for storing calculations

  constructor() {
    super('CalculationsDatabase'); // Name of the IndexedDB database
    this.version(1).stores({
      // Define the schema for the calculations table
      calculations: '++id, type, voltage, current, resistance, result, calculated_at',
    });
  }
}

// Create an instance of the database
export const db = new CalculationsDatabase();

// Add a new calculation to the database
export async function addCalculation(data: Calculation) {
  try {
    const id = await db.calculations.add({
      ...data,
      calculated_at: new Date().toISOString(), // Ensure calculated_at is a timestamp
    });
    return { id, message: 'Calculation saved successfully.' };
  } catch (error) {
    console.error('Error adding calculation:', error);
    return { error: 'Failed to save calculation.' };
  }
}

// Retrieve all calculations from the database
export async function getAllCalculations() {
  try {
    const calculations = await db.calculations.toArray();
    return calculations.length > 0
      ? calculations
      : { error: 'No calculations found.' };
  } catch (error) {
    console.error('Error retrieving calculations:', error);
    return { error: 'Error retrieving calculations.' };
  }
}

// Retrieve the most recent calculation from the database
export async function getLastCalculation() {
  try {
    const last = await db.calculations.orderBy('id').last();
    return last || { error: 'No calculations available.' };
  } catch (error) {
    console.error('Error retrieving last calculation:', error);
    return { error: 'Error retrieving last calculation.' };
  }
}
