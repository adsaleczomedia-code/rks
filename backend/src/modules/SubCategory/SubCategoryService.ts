import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategory } from './subcategory.entity.js';

@Injectable()
export class SubCategoryService {

    constructor(
        @InjectRepository(SubCategory)
        private subCategoryRepository: Repository<SubCategory>,
    ) { }

    async create(subCategoryData: Partial<SubCategory>): Promise<SubCategory> {
        const subCategory = this.subCategoryRepository.create(subCategoryData);
        return this.subCategoryRepository.save(subCategory);
    }

    async findAll(): Promise<SubCategory[]> {
        return this.subCategoryRepository.find({ relations: ['category', 'products'] });
    }

    async findOne(id: number): Promise<SubCategory> {
        const subCategory = await this.subCategoryRepository.findOne({ where: { id }, relations: ['category', 'products'] });
        if (!subCategory) {
            throw new NotFoundException(`SubCategory with ID ${id} not found`);
        }
        return subCategory;
    }

    async update(id: number, updateData: Partial<SubCategory>): Promise<SubCategory> {
        const subCategory = await this.findOne(id);
        Object.assign(subCategory, updateData);
        return this.subCategoryRepository.save(subCategory);
    }

    async delete(id: number): Promise<void> {
        const subCategory = await this.findOne(id);
        await this.subCategoryRepository.remove(subCategory);
    }
}