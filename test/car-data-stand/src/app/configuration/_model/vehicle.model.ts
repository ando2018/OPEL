
export interface VehicleModel {
    _id: string;
    name: string;
    serie: string;
    visual: string;
    price: number;
    equipments: {
        inside: any,
        outside: any
    };
}
