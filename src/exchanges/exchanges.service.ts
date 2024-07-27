import { Injectable } from '@nestjs/common';
import {
  binanceGetPrice,
  calculateConvertedValue,
  kucoinGetPrice,
} from './exchanges.utils';
import { ExchangeName } from './exchanges.enum';

@Injectable()
export class ExchangesService {
  async estimate({ inputCurrency, outputCurrency, inputAmount }) {
    try {
      let valueKucoinInput = 1,
        valueBinanceInput = 1,
        valueKucoinOutput = 1,
        valueBinanceOutput = 1;

      //потрібно в випадку коли ми хочем конвертувати btc в eth
      if (inputCurrency !== 'USDT') {
        const kucoinInput = await kucoinGetPrice(inputCurrency);
        const binanceInput = await binanceGetPrice(inputCurrency);
        valueKucoinInput = kucoinInput;
        valueBinanceInput = binanceInput;
      }
      if (outputCurrency !== 'USDT') {
        const kucoinOutput = await kucoinGetPrice(outputCurrency);
        const binanceOutput = await binanceGetPrice(outputCurrency);
        valueKucoinOutput = kucoinOutput;
        valueBinanceOutput = binanceOutput;
      }

      if (valueBinanceOutput < valueKucoinOutput) {
        return {
          exchangeName: ExchangeName.KuCoin,
          outputAmount: calculateConvertedValue(
            valueKucoinInput,
            valueKucoinOutput,
            inputAmount,
          ),
        };
      } else {
        return {
          exchangeName: ExchangeName.Binance,
          outputAmount: calculateConvertedValue(
            valueBinanceInput,
            valueBinanceOutput,
            inputAmount,
          ),
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async getRates({ baseCurrency, quoteCurrency }) {
    try {
      let kucoinBase = 1,
        binanceBase = 1,
        kucoinQuote = 1,
        binanceQuote = 1;

      if (baseCurrency !== 'USDT') {
        kucoinBase = await kucoinGetPrice(baseCurrency);
        binanceBase = await binanceGetPrice(baseCurrency);
      }
      if (quoteCurrency !== 'USDT') {
        kucoinQuote = await kucoinGetPrice(quoteCurrency);
        binanceQuote = await binanceGetPrice(quoteCurrency);
      }

      const resultKucoin = kucoinBase / kucoinQuote;
      const resultBinance = binanceBase / binanceQuote;

      return [
        {
          exchangeName: ExchangeName.Binance,
          rate: resultBinance,
        },
        {
          exchangeName: ExchangeName.KuCoin,
          rate: resultKucoin,
        },
      ];
    } catch (error) {
      throw error;
    }
  }
}
