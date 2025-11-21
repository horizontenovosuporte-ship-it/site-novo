import { type CheckoutData } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createCheckout(checkout: CheckoutData): Promise<{ id: string; success: boolean }>;
  getCheckout(id: string): Promise<CheckoutData | undefined>;
}

export class MemStorage implements IStorage {
  private checkouts: Map<string, CheckoutData>;

  constructor() {
    this.checkouts = new Map();
  }

  async createCheckout(checkout: CheckoutData): Promise<{ id: string; success: boolean }> {
    const id = randomUUID();
    this.checkouts.set(id, checkout);
    return { id, success: true };
  }

  async getCheckout(id: string): Promise<CheckoutData | undefined> {
    return this.checkouts.get(id);
  }
}

export const storage = new MemStorage();
