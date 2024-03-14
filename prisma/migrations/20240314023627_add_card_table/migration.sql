-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "lastFourNumber" INTEGER NOT NULL,
    "expMounth" INTEGER NOT NULL,
    "expYear" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_id_key" ON "Card"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Card_userId_key" ON "Card"("userId");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
