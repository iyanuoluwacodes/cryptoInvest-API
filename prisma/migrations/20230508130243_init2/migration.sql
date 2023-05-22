-- CreateTable
CREATE TABLE "EthUSDCPair" (
    "id" TEXT NOT NULL DEFAULT 'prices',
    "binance" TEXT NOT NULL DEFAULT '1855.48',
    "huobi" TEXT NOT NULL DEFAULT '1855.48',
    "okex" TEXT NOT NULL DEFAULT '1855.48',
    "kucoin" TEXT NOT NULL DEFAULT '1855.48',
    "gateio" TEXT NOT NULL DEFAULT '1855.48',
    "kraken" TEXT NOT NULL DEFAULT '1855.48',

    CONSTRAINT "EthUSDCPair_pkey" PRIMARY KEY ("id")
);
