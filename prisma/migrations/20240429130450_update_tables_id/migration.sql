-- AlterTable
ALTER TABLE "CartItem" RENAME CONSTRAINT "CartItem_pkey" TO "cartItemId";

-- AlterTable
ALTER TABLE "ListItem" RENAME CONSTRAINT "ListItem_pkey" TO "listItemId";

-- AlterTable
ALTER TABLE "OrderItem" RENAME CONSTRAINT "OrderItem_pkey" TO "orderItemId";

-- AlterTable
ALTER TABLE "PromotionProduct" RENAME CONSTRAINT "PromotionProduct_pkey" TO "promotionItemId";
