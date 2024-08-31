/*
  Warnings:

  - The `status` column on the `Seats` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Details` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('empty', 'inProcces', 'full');

-- AlterTable
ALTER TABLE "Seats" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'empty';

-- DropTable
DROP TABLE "Details";

-- CreateTable
CREATE TABLE "Tickets" (
    "id" VARCHAR(50) NOT NULL,
    "userId" VARCHAR(50) NOT NULL,
    "seatId" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "cost" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" VARCHAR(50) NOT NULL,
    "fullname" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SeatTypes_name_idx" ON "SeatTypes"("name");

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
