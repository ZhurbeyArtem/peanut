import { BadRequestException, Injectable } from '@nestjs/common';
import { getPrices } from './exchanges.utils';
import { BinanceExchange } from './exchanges/binance.exchange';
import { KuCoinExchange } from './exchanges/kuckoin.exchange';
import { Exchange } from './exchanges/exchange.interface';

@Injectable()
export class ExchangesService {
  private exchanges: Exchange[];

  constructor() {
    this.exchanges = [new BinanceExchange(), new KuCoinExchange()]; //нову біржу добавляти сюди
  }

  async estimate({ inputAmount, inputCurrency, outputCurrency }) {
    try {
      const prices = await getPrices(
        this.exchanges,
        inputCurrency,
        outputCurrency,
      );

      let bestExchange = prices[0];
      for (const price of prices) {
        if (inputAmount * price.price > inputAmount * bestExchange.price) {
          bestExchange = price;
        }
      }

      return {
        exchangeName: bestExchange.exchangeName,
        outputAmount: inputAmount * bestExchange.price,
      };
    } catch (error) {
      throw new BadRequestException(
        `In one of exchangers no this combination ${inputCurrency}/${outputCurrency} try other combination`,
      );
    }
  }

  async getRates({ baseCurrency, quoteCurrency }) {
    try {
      const prices = await getPrices(
        this.exchanges,
        baseCurrency,
        quoteCurrency,
      );

      return prices.map((price) => ({
        exchangeName: price.exchangeName,
        rate: price.price,
      }));
    } catch (error) {
      throw new BadRequestException(
        `In one of exchangers no this combination ${baseCurrency}/${quoteCurrency} try other combination`,
      );
    }
  }
}
