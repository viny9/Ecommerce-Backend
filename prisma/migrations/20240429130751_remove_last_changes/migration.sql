-- AlterTable
ALTER TABLE "CartItem" RENAME CONSTRAINT "cartItemId" TO "CartItem_pkey";

-- AlterTable
ALTER TABLE "ListItem" RENAME CONSTRAINT "listItemId" TO "ListItem_pkey";

-- AlterTable
ALTER TABLE "OrderItem" RENAME CONSTRAINT "orderItemId" TO "OrderItem_pkey";

-- AlterTable
ALTER TABLE "PromotionProduct" RENAME CONSTRAINT "promotionItemId" TO "PromotionProduct_pkey";
