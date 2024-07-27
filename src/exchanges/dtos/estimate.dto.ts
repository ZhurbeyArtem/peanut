import { IsEnum, IsNumber } from 'class-validator';
import { Coin, ExchangeName } from '../exchanges.enum';

export class EstimateInputDto {
  @IsNumber()
  inputAmount: number;

  @IsEnum(Coin)
  inputCurrency: Coin;

  @IsEnum(Coin)
  outputCurrency: Coin;
}

export class EstimateOutputDto {
  @IsEnum(ExchangeName)
  exchangeName: ExchangeName;
  outputAmount: number;
}
