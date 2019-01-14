
export interface Paging {
    totalResults: number;
}

export interface Address {
    addressLine1: string;
    streetName: string;
    houseNumberBlock: string;
    zipCode: string;
    cityName: string;
    countryName: string;
    type: string;
    id: string;
}

export interface Addresses {
    paging: Paging;
    data: Address[];
}
