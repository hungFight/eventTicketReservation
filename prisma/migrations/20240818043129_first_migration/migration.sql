-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL,
    "userName" VARCHAR(100) NOT NULL,
    "avatar" VARCHAR(250) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "accountType" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prodcuts" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "image" VARCHAR(250) NOT NULL,
    "noteD" JSON NOT NULL,
    "description" JSON NOT NULL,
    "accountType" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prodcuts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lovers" (
    "id" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lovers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoDouDou" (
    "id" INTEGER NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "tiktok" VARCHAR(200) NOT NULL,
    "phopee" VARCHAR(200) NOT NULL,
    "intagram" VARCHAR(200) NOT NULL,
    "zalo" VARCHAR(50) NOT NULL,
    "facebook" VARCHAR(200) NOT NULL,

    CONSTRAINT "InfoDouDou_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lovers" ADD CONSTRAINT "Lovers_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Prodcuts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lovers" ADD CONSTRAINT "Lovers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Prodcuts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
