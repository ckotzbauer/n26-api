
export interface Card {
    id: string;
    publicToken: unknown;
    pan: unknown
    maskedPan: string;
    expirationDate: Date;
    cardType: string;
    status: string;
    cardProduct: unknown;
    cardProductType: string;
    pinDefined: Date;
    cardActivated: Date;
    usernameOnCard: string;
    exceetExpressCardDelivery: unknown;
    membership: unknown;
    exceetActualDeliveryDate: unknown;
    exceetExpressCardDeliveryEmailSent: unknown;
    exceetCardStatus: unknown;
    exceetExpectedDeliveryDate: unknown;
    exceetExpressCardDeliveryTrackingID: unknown;
    cardSettingsID: unknown;
    mptsCard: boolean;
}
