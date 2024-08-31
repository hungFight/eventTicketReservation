-- CreateTable
CREATE TABLE "TicketCode" (
    "id" VARCHAR(50) NOT NULL,
    "code" VARCHAR(11) NOT NULL,
    "userId" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketCode" ADD CONSTRAINT "TicketCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
