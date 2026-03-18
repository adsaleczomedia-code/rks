import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryController } from './SubCategoryController.js';
import { SubCategoryService } from './SubCategoryService.js';
import { SubCategory } from './subcategory.entity.js';
import { Category } from '../Category/category.entity.js';
import { Product } from '../Product/product.entity.js';

@Module({
    imports: [TypeOrmModule.forFeature([SubCategory, Category, Product])],
    controllers: [SubCategoryController],
    providers: [SubCategoryService],
})
export class SubCategoryModule { }
