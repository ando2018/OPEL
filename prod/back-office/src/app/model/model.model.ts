export interface Model {
    _id: string;
    name: string;
    description: string;
    vehiculeId: string;
    options: string[];
    visuals: string[];
    price: number;
    technicalDatas: {
        externalDimensions: {
            schema: string;
            empattement: number;
            totalLength: number;
            emptyHeight: number;
            widthWithMirror: number;
            widthWithoutMirror: number;
            turningRadius: number;
        };
        internalDimensions: {
            loadingVolume: string;
        };
        weightLoad: {
            weight: string;
            tank: number;
            maxWeightBrakedTrailer: string;
            maxWeightNoBrakedTrailer: string;
            totalWeightAllowed: string;
        };
    };
    environment: {
        carburant: string;
        co2: string;
        urban: string;
        extraUrban: string;
        mixte: string;
        images: string;
    };
}
