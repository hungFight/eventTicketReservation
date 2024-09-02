/*
  Warnings:

  - You are about to drop the `BookingDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookingDetails" DROP CONSTRAINT "BookingDetails_userId_fkey";

-- AlterTable
ALTER TABLE "TicketCode" ADD COLUMN     "history" JSON;

-- DropTable
DROP TABLE "BookingDetails";
