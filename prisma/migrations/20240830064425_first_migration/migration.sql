-- CreateTable
CREATE TABLE "Events" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "address" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Floors" (
    "id" VARCHAR(50) NOT NULL,
    "number" INTEGER NOT NULL,
    "eventId" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Floors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeatTypes" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeatTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seats" (
    "id" VARCHAR(50) NOT NULL,
    "floorId" VARCHAR(50) NOT NULL,
    "seatTypeId" VARCHAR(50) NOT NULL,
    "number" INTEGER NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "description" JSON NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Details" (
    "id" VARCHAR(50) NOT NULL,
    "ticketNumber" INTEGER NOT NULL,
    "seatId" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Floors" ADD CONSTRAINT "Floors_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seats" ADD CONSTRAINT "Seats_floorId_fkey" FOREIGN KEY ("floorId") REFERENCES "Floors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seats" ADD CONSTRAINT "Seats_seatTypeId_fkey" FOREIGN KEY ("seatTypeId") REFERENCES "SeatTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
