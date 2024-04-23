/*
  Warnings:

  - Made the column `userId` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orderId` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "orderId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
