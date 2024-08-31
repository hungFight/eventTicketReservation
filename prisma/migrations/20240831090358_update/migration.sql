/*
  Warnings:

  - You are about to drop the column `code` on the `Tickets` table. All the data in the column will be lost.
  - Added the required column `ticketCodeId` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tickets_code_idx";

-- AlterTable
ALTER TABLE "SeatTypes" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Seats" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "code",
ADD COLUMN     "ticketCodeId" VARCHAR(50) NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Tickets_ticketCodeId_idx" ON "Tickets"("ticketCodeId");

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_ticketCodeId_fkey" FOREIGN KEY ("ticketCodeId") REFERENCES "TicketCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
