import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from 'src/database/repositorys/order.repository';
import { OrderEntity } from './entitys/order.entity';
import { GetOrderDto } from './dto/get-order.dto';

@Injectable()
export class OrderService {
  constructor(private repository: OrderRepository) {}

  async newOrder(createOrderDto: CreateOrderDto): Promise<GetOrderDto> {
    const order = OrderEntity.toEntity(createOrderDto);
    const res = await this.repository.save(order);

    return OrderEntity.toDto(res);
  }

  async findAllOrders(): Promise<GetOrderDto[]> {
    const res = await this.repository.findAll();

    return res.map((order) => {
      return OrderEntity.toDto(order);
    });
  }

  async findAllUserOrders(id: string): Promise<GetOrderDto[]> {
    const res = await this.repository.findAllByUserId(id);

    return res.map((order) => {
      return OrderEntity.toDto(order);
    });
  }

  async findOrderById(id: string): Promise<GetOrderDto> {
    const order = await this.repository.findById(id);
    if (!order)
      throw new NotFoundException('Nenhum pedido com esse id foi encontrado');

    return OrderEntity.toDto(order);
  }

  async updatePaymentStatus(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<GetOrderDto> {
    const exists = this.repository.checkIfExists('id', id);
    if (!exists)
      throw new NotFoundException('Nenhum pedido com esse id foi encontrado');

    const order = await this.repository.updatePaymentStatus(
      id,
      updateOrderDto.paymentStatus,
    );

    return OrderEntity.toDto(order);
  }
}
