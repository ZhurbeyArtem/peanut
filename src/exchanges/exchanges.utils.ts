import axios from 'axios';

export const kucoinGetPrice = async (input: string) => {
  const { data: kucoin } = await axios.get(
    `https://api.kucoin.com/api/v1/market/histories?symbol=${input}-USDT`,
  );
  return kucoin.data[kucoin.data.length - 1].price;
};

export const binanceGetPrice = async (input: string) => {
  const { data: binance } = await axios.get(
    `https://api.binance.com/api/v3/trades?symbol=${input}USDT`,
  );
  return binance[binance.length - 1].price;
};

export const calculateConvertedValue = (
  inputValue: number,
  outputValue: number,
  inputAmount: number,
) => {
  const totalValue = inputValue * inputAmount;
  return totalValue / outputValue;
};

