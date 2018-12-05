import { CategoryModel } from './category.model';

export interface SerieModel {
    name: string;
    categories: CategoryModel[];
}
