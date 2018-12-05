export interface SpecialOffer {
    _id: string;
    offers: Offer[];
    legalNotice: string;
}

export interface Offer {
    title: string;
    months: string[];
    fileName: string;
}
