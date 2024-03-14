-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "orderAt" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "isCheck" BOOLEAN NOT NULL,
    "isArchived" BOOLEAN NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_orderId_key" ON "Notification"("orderId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
