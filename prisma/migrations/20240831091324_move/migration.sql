/*
  Warnings:

  - You are about to drop the column `expired` on the `Tickets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TicketCode" ADD COLUMN     "expired" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "expired";
