/*
  Warnings:

  - Made the column `updatedAt` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Card` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Cart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `CartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `List` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `ListItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Notification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `ProductImg` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_productId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "productId" SET NOT NULL;

-- AlterTable
ALTER TABLE "List" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "ListItem" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryId" TEXT,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProductImg" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
