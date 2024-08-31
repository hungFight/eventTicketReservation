/*
  Warnings:

  - A unique constraint covering the columns `[seatId]` on the table `Tickets` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Tickets_seatId_code_key";

-- CreateIndex
CREATE INDEX "Tickets_code_idx" ON "Tickets"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Tickets_seatId_key" ON "Tickets"("seatId");
