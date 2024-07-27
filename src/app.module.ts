import { Module } from '@nestjs/common';

import { ExchangesModule } from './exchanges/exchanges.module';

@Module({
  imports: [ExchangesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
