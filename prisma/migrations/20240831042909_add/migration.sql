/*
  Warnings:

  - You are about to drop the column `cost` on the `Tickets` table. All the data in the column will be lost.
  - Added the required column `constPaid` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "cost",
ADD COLUMN     "constPaid" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "budget" DOUBLE PRECISION NOT NULL DEFAULT 10000000;
