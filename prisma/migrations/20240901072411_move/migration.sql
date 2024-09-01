/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `Tickets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TicketCode" ADD COLUMN     "paymentStatus" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "paymentStatus";
