import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './CategoryController.js';
import { CategoryService } from './CategoryService.js';
import { Category } from './category.entity.js';
import { SubCategory } from '../SubCategory/subcategory.entity.js';

@Module({
    imports: [TypeOrmModule.forFeature([Category, SubCategory])],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule { }