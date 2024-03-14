-- CreateTable
CREATE TABLE "ProductImg" (
    "id" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ProductImg_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductImg" ADD CONSTRAINT "ProductImg_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
