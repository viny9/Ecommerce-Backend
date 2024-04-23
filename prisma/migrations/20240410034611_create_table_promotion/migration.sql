/*
  Warnings:

  - You are about to drop the column `percentage` on the `Promotion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "percentage";

-- CreateTable
CREATE TABLE "PromotionProduct" (
    "percentage" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,
    "promotionId" TEXT NOT NULL,

    CONSTRAINT "PromotionProduct_pkey" PRIMARY KEY ("productId","promotionId")
);

-- AddForeignKey
ALTER TABLE "PromotionProduct" ADD CONSTRAINT "PromotionProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionProduct" ADD CONSTRAINT "PromotionProduct_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
