/*
  Warnings:

  - Added the required column `quantity` to the `SeatTypes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SeatTypes" ADD COLUMN     "quantity" INTEGER NOT NULL;
