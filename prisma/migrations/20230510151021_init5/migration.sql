-- CreateTable
CREATE TABLE "Exchanges" (
    "id" TEXT NOT NULL DEFAULT 'lol',
    "ETHUSDC" TEXT NOT NULL,
    "btc24hrvolume" TEXT NOT NULL,
    "btcLiq" TEXT NOT NULL,
    "eth24hrVolume" TEXT NOT NULL,
    "ethLiq" TEXT NOT NULL,

    CONSTRAINT "Exchanges_pkey" PRIMARY KEY ("id")
);
