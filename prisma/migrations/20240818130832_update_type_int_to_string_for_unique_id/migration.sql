/*
  Warnings:

  - The primary key for the `Images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `productId` on the `Images` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.
  - You are about to alter the column `userId` on the `Images` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.
  - The primary key for the `InfoDouDou` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `InfoDouDou` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.
  - The primary key for the `Lovers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `productId` on the `Lovers` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.
  - You are about to alter the column `userId` on the `Lovers` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.
  - The primary key for the `Prodcuts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Prodcuts` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(10)`.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_productId_fkey";

-- DropForeignKey
ALTER TABLE "Lovers" DROP CONSTRAINT "Lovers_productId_fkey";

-- DropForeignKey
ALTER TABLE "Lovers" DROP CONSTRAINT "Lovers_userId_fkey";

-- AlterTable
ALTER TABLE "Images" DROP CONSTRAINT "Images_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "userId" SET DATA TYPE VARCHAR(10),
ADD CONSTRAINT "Images_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "InfoDouDou" DROP CONSTRAINT "InfoDouDou_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(10),
ADD CONSTRAINT "InfoDouDou_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Lovers" DROP CONSTRAINT "Lovers_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productId" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "userId" SET DATA TYPE VARCHAR(10),
ADD CONSTRAINT "Lovers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Prodcuts" DROP CONSTRAINT "Prodcuts_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(10),
ADD CONSTRAINT "Prodcuts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(10),
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Lovers" ADD CONSTRAINT "Lovers_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Prodcuts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lovers" ADD CONSTRAINT "Lovers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Prodcuts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
