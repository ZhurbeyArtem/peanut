import { IsEnum, IsNumber } from 'class-validator';
import { Coin, ExchangeName } from '../exchanges.enum';

export class GetRatesInputDto {
  @IsEnum(Coin)
  baseCurrency: Coin;

  @IsEnum(Coin)
  quoteCurrency: Coin;
}

export class GetRatesOutputDto {
  @IsEnum(ExchangeName)
  exchangeName: ExchangeName;

  @IsNumber()
  rate: number;
}
