import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import type { SubCategory } from '../SubCategory/subcategory.entity.js';

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    slug: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany('SubCategory', (subcategory: SubCategory) => subcategory.category)
    subcategories: SubCategory[];
}