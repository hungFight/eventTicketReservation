/*
  Warnings:

  - You are about to drop the column `canceled` on the `TicketCode` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `TicketCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TicketCode" DROP COLUMN "canceled",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
