import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IsAdmin } from 'src/shared/decorators/is-admin.decorator';
import { ImgService } from '../img/img.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/config/multer';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly imgService: ImgService,
  ) {}

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

  @Post(':id/img')
  @UseInterceptors(FilesInterceptor('file', 5, multerConfig))
  uploadImg(
    @Param('id') id: string,
    @UploadedFiles() file: Express.Multer.File[],
  ) {
    return this.imgService.addImgsToProduct(id, file);
  }

  @Patch(':id/img')
  @UseInterceptors(FilesInterceptor('file', 5, multerConfig))
  updateProductImgs(
    @Param('id') id: string,
    @Body() removedImgs: string[],
    @UploadedFiles() file: Express.Multer.File[],
  ) {
    return this.imgService.updateProductImgs(id, file, removedImgs);
  }

  @Delete(':id/img')
  deleteImgProduct(@Param('id') id: string, @Body() removedImgs: string[]) {
    return this.imgService.removeProductImgs(id, removedImgs);
  }
}
