import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Put(':id')
  addItem(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.addItemInCart(id, updateCartDto);
  }

  @Put(':id/remove')
  removeItem(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.removeItemFromCart(id, updateCartDto);
  }
}
