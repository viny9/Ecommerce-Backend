/*
  Warnings:

  - A unique constraint covering the columns `[imgUrl]` on the table `product_img` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "card_id_key" CASCADE;

-- DropIndex
DROP INDEX "order_id_key" CASCADE;

-- AlterTable
ALTER TABLE "card" ADD CONSTRAINT "card_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "order" ADD CONSTRAINT "order_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_img_imgUrl_key" ON "product_img"("imgUrl");
