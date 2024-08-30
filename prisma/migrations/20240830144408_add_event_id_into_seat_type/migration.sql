/*
  Warnings:

  - Made the column `eventId` on table `SeatTypes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SeatTypes" ALTER COLUMN "eventId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SeatTypes" ADD CONSTRAINT "SeatTypes_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
