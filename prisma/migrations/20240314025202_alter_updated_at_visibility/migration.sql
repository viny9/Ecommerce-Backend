-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "List" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ListItem" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductImg" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Promotion" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP NOT NULL;
