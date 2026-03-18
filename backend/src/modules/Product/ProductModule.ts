import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './ProductController.js';
import { ProductService } from './ProductService.js';
import { Product } from './product.entity.js';
import { SubCategory } from '../SubCategory/subcategory.entity.js';
import { Category } from '../Category/category.entity.js';
@Module({
    imports: [TypeOrmModule.forFeature([Product, SubCategory, Category])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule { }   