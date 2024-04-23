/*
  Warnings:

  - Changed the type of `price` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `PromotionProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "PromotionProduct" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
