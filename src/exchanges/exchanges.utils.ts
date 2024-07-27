import { ExchangeName } from './exchanges.enum';

export const getPrices = async (
  exchanges,
  inputCurrency: string,
  outputCurrency: string,
): Promise<{ exchangeName: ExchangeName; price: number }[]> => {
  try {
    const prices = await Promise.all(
      exchanges.map(async (exchange) => {
        const price = await exchange.getPrice(inputCurrency, outputCurrency);
        return { exchangeName: exchange.getName(), price };
      }),
    );
    return prices;
  } catch (error) {
    throw error;
  }
};
