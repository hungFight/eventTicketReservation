/*
  Warnings:

  - A unique constraint covering the columns `[seatId]` on the table `Tickets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tickets_seatId_key" ON "Tickets"("seatId");
