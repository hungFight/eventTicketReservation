/*
  Warnings:

  - You are about to alter the column `code` on the `Tickets` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(11)`.
  - A unique constraint covering the columns `[seatId,code]` on the table `Tickets` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Tickets_seatId_key";

-- AlterTable
ALTER TABLE "Tickets" ALTER COLUMN "code" SET DATA TYPE VARCHAR(11);

-- CreateIndex
CREATE UNIQUE INDEX "Tickets_seatId_code_key" ON "Tickets"("seatId", "code");
