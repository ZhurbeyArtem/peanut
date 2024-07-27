import axios from 'axios';
import { Exchange } from './exchange.interface';
import { ExchangeName } from '../exchanges.enum';

export class BinanceExchange implements Exchange {
  async getPrice(
    inputCurrency: string,
    outputCurrency: string,
  ): Promise<number> {
    try {
      let binance;
      if (inputCurrency === 'USDT') {
        binance = await axios.get(
          `https://api.binance.com/api/v3/trades?symbol=${outputCurrency}${inputCurrency}`,
        );
        return 1 / binance.data[binance.data.length - 1].price;
      } else {
        binance = await axios.get(
          `https://api.binance.com/api/v3/trades?symbol=${inputCurrency}${outputCurrency}`,
        );
        return binance.data[binance.data.length - 1].price;
      }
    } catch (error) {
      throw error;
    }
  }

  getName() {
    return ExchangeName.Binance;
  }
}
