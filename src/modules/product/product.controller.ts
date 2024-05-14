import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IsAdmin } from 'src/shared/decorators/is-admin.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @IsAdmin()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.newProduct(createProductDto);
  }

  @Get()
  getProducts() {
    return this.productService.findAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.findProductById(id);
  }

  @Patch(':id')
  @IsAdmin()
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProductById(id, updateProductDto);
  }

  @Delete(':id')
  @IsAdmin()
  deleteProduct(@Param('id') id: string) {
    return this.productService.removeProduct(id);
  }
}
