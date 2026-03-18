import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { SubCategoryService } from './SubCategoryService';
import { SubCategory } from './subcategory.entity.js';

@Controller('subcategories')
export class SubCategoryController {
    constructor(private readonly subCategoryService: SubCategoryService) { }

    @Post()
    async create(@Body() subCategoryData: Partial<SubCategory>): Promise<SubCategory> {
        return this.subCategoryService.create(subCategoryData);
    }

    @Get()
    async findAll(): Promise<SubCategory[]> {
        return this.subCategoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<SubCategory> {
        return this.subCategoryService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateData: Partial<SubCategory>,
    ): Promise<SubCategory> {
        return this.subCategoryService.update(id, updateData);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.subCategoryService.delete(id);
    }
}