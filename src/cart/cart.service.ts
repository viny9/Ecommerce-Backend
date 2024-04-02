import { Injectable } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository } from 'src/database/repositorys/cart.repository';
import { GetCartDto } from './dto/get-cart.dto';
import { Carts } from './entitys/cart.entity';

@Injectable()
export class CartService {
  constructor(private repository: CartRepository) {}

  async findOne(id: string): Promise<GetCartDto> {
    const cart: Carts = await this.repository.findCartByUserId(id);
    return Carts.toCartDto(cart);
  }

  async addItemInCart(
    id: string,
    updateCartDto: UpdateCartDto,
  ): Promise<GetCartDto> {
    const cart: Carts = await this.repository.addCartItem(id, updateCartDto);
    return Carts.toCartDto(cart);
  }

  async removeItemFromCart(
    id: string,
    updateCartDto: UpdateCartDto,
  ): Promise<GetCartDto> {
    const cart = await this.repository.removeCartItem(id, updateCartDto);
    return Carts.toCartDto(cart);
  }
}
