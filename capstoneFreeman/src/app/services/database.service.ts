import Dexie, { Table } from 'dexie';

// Define the interface for Calculation data
export interface Calculation {
  id?: number; // Optional because it is auto-incremented
  type: string; // e.g., "Ohm's Law"
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
export async function addCalculation(data: Omit<Calculation, 'calculated_at'>) {
  try {
    const id = await db.calculations.add({
      ...data,
      calculated_at: new Date().toISOString(), // Automatically set the timestamp
    });
    return { id, message: 'Calculation saved successfully.' };
  } catch (error) {
    console.error('Error adding calculation:', error);
    return { error: 'Failed to save calculation.' };
  }
}

// Retrieve all calculations from the database
export async function getAllCalculations(): Promise<Calculation[] | { error: string }> {
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
export async function getLastCalculation(): Promise<Calculation | { error: string }> {
  try {
    const last = await db.calculations.orderBy('id').last();
    return last || { error: 'No calculations available.' };
  } catch (error) {
    console.error('Error retrieving last calculation:', error);
    return { error: 'Error retrieving last calculation.' };
  }
}

// Delete a calculation by ID
export async function deleteCalculation(id: number): Promise<{ success: boolean; message: string }> {
  try {
    await db.calculations.delete(id);
    return { success: true, message: 'Calculation deleted successfully.' };
  } catch (error) {
    console.error('Error deleting calculation:', error);
    return { success: false, message: 'Failed to delete calculation.' };
  }
}

// Clear all calculations from the database
export async function clearCalculations(): Promise<{ success: boolean; message: string }> {
  try {
    await db.calculations.clear();
    return { success: true, message: 'All calculations cleared successfully.' };
  } catch (error) {
    console.error('Error clearing calculations:', error);
    return { success: false, message: 'Failed to clear calculations.' };
  }
}
