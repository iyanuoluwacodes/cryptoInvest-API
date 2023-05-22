-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dailyEarning" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "totalRevenue" TEXT NOT NULL DEFAULT '0',
ALTER COLUMN "balance" SET DEFAULT '0';
