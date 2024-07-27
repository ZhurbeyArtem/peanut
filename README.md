Peanut.Trade API Service

The Peanut.Trade API Service is designed to determine the most profitable exchange for cryptocurrency trading and to provide current prices for specified cryptocurrencies across all supported exchanges.

Description

This service supports the following centralized cryptocurrency exchanges:

    Binance
    KuCoin

Supported cryptocurrencies:

    ETH
    BTC
    USDT

The service provides two endpoints:

    /exchanges/estimate - Determines which exchange offers the best rate for cryptocurrency exchange.
    /exchanges/getRates - Returns the prices of the specified cryptocurrency on all exchanges.

Prices are determined based on the latest trade in the selected pair.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

