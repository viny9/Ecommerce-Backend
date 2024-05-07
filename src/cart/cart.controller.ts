import { Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Post(':id/products/:productId')
  addItem(@Param('id') id: string, @Param('productId') productId: string) {
    return this.cartService.addItemInCart(id, productId);
  }

  @Delete(':id/remove/:productId')
  removeItem(@Param('id') id: string, @Param('productId') productId: string) {
    return this.cartService.removeItemFromCart(id, productId);
  }
}
