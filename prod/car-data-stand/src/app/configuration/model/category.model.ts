
export interface CategoryModel {
    _id: string;
    name: string;
    serie: string;
    visual: string;
    equipments: {
        inside: any,
        outside: any
    };
}
