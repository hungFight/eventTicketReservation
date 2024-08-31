/*
  Warnings:

  - You are about to drop the column `constPaid` on the `Tickets` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Tickets` table. All the data in the column will be lost.
  - Added the required column `code` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "constPaid",
DROP COLUMN "status",
ADD COLUMN     "code" VARCHAR(50) NOT NULL,
ADD COLUMN     "expired" TIMESTAMP(3),
ADD COLUMN     "paymentStatus" BOOLEAN NOT NULL DEFAULT false;
