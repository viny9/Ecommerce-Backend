import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.newOrder(createOrderDto);
  }

  @Get('')
  getAllOrders() {
    return this.orderService.findAllOrders();
  }

  @Get('user/:id')
  getAllUserOrders(@Param('id') id: string) {
    return this.orderService.findAllUserOrders(id);
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.orderService.findOrderById(id);
  }

  @Put(':id')
  updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updatePaymentStatus(id, updateOrderDto);
  }
}
