export interface Exchange {
  getPrice(inputCurrency: string, outputCurrency: string): Promise<number>;
  getName(): string;
}
