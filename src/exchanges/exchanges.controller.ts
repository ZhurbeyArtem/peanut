import { Body, Controller, Get } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { EstimateInputDto, EstimateOutputDto } from './dtos/estimate.dto';
import { GetRatesInputDto, GetRatesOutputDto } from './dtos/getRates.dto';

@Controller('exchanges')
export class ExchangesController {
  constructor(private exchangesService: ExchangesService) { }

  @Get('/estimate')
  async estimate(@Body() data: EstimateInputDto): Promise<EstimateOutputDto> {
    return this.exchangesService.estimate(data);
  }

  @Get('/getRates')
  async getRates(@Body() data: GetRatesInputDto): Promise<GetRatesOutputDto[]> {
    return this.exchangesService.getRates(data);
  }
}
