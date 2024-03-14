/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_userId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImg" DROP CONSTRAINT "ProductImg_productId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "orderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "orderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "List" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "orderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "orderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductImg" ALTER COLUMN "productId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_productId_key" ON "Category"("productId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImg" ADD CONSTRAINT "ProductImg_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
