import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionProductDto } from './dto/promotion-product.dto';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  createPromotion(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.newPromotion(createPromotionDto);
  }

  @Get()
  getPromotions() {
    return this.promotionService.findAllPromotions();
  }

  @Get(':id')
  getPromotionById(@Param('id') id: string) {
    return this.promotionService.findPromotionById(id);
  }

  @Get(':id/product')
  findAllPromotionProductsById(@Param('id') id: string) {
    return this.promotionService.findProductsByPromotionId(id);
  }

  @Patch(':id')
  updatePromotion(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    return this.promotionService.updatePromotion(id, updatePromotionDto);
  }

  @Delete(':id')
  deletePromotion(@Param('id') id: string) {
    return this.promotionService.removePromotion(id);
  }

  @Post(':id/product')
  addProductInPromotion(
    @Param('id') id: string,
    @Body() promotionProductDto: PromotionProductDto | PromotionProductDto[],
  ) {
    return this.promotionService.addPromotionProduct(id, promotionProductDto);
  }

  @Delete(':promotionId/product/:productId')
  async removePromotionProductById(
    @Param('promotionId') promotionId: string,
    @Param('productId') productId: string,
  ) {
    return this.promotionService.removePromotionProduct(promotionId, productId);
  }
}
