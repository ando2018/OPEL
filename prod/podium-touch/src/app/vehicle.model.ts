export interface Vehicle {
    _id: string;
    name: string;
    gammeId: string;
    gammeName: string;
    visual: string;
    equipments: {
        inside: string[];
        outside: string[];
    };
    brochureFile: string;
    brochureQrCode: string;
    brochureName: string;
    brochureWallpaper: string;
    vehicleIframeUrl: string;
    accesoriesIframeUrl: string;
    configuratorIframeUrl: string;
    videos: { title: string; fileName: string }[];
}
