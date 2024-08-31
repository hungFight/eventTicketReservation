/*
  Warnings:

  - You are about to drop the column `userId` on the `Tickets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_userId_fkey";

-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "userId";
