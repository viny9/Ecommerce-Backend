import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IsAdmin } from 'src/shared/decorators/is-admin.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.newOrder(createOrderDto);
  }

  @Get()
  @IsAdmin()
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
  @IsAdmin()
  updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updatePaymentStatus(id, updateOrderDto);
  }
}
