import axios from 'axios';
import { Exchange } from './exchange.interface';
import { ExchangeName } from '../exchanges.enum';

export class KuCoinExchange implements Exchange {
  async getPrice(
    inputCurrency: string,
    outputCurrency: string,
  ): Promise<number> {
    try {
      let kucoin;
      if (inputCurrency === 'USDT') {
        kucoin = await axios.get(
          `https://api.kucoin.com/api/v1/market/histories?symbol=${outputCurrency}-${inputCurrency}`,
        );
        return 1 / kucoin.data.data[kucoin.data.data.length - 1].price;
      } else {
        kucoin = await axios.get(
          `https://api.kucoin.com/api/v1/market/histories?symbol=${inputCurrency}-${outputCurrency}`,
        );
        return kucoin.data.data[kucoin.data.data.length - 1].price;
      }
    } catch (error) {
      throw error;
    }
  }

  getName() {
    return ExchangeName.KuCoin;
  }
}
