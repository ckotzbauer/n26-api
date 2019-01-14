
export interface Transaction {
    id: string;
    userId: string;
    type: string;
    amount: number;
    currencyCode: string;
    originalAmount: number;
    originalCurrency: string;
    exchangeRate: number;
    merchantCity: string;
    visibleTS: Date;
    mcc: number;
    mccGroup: number;
    merchantName: string;
    recurring: boolean;
    accountId: string;
    category: string;
    cardId: string;
    userCertified: Date;
    pending: boolean;
    transactionNature: string;
    createdTS: Date;
    merchantCountry: number;
    smartLinkId: string;
    linkId: string;
    confirmed: Date;
    partnerBic: string;
    partnerBcn: string;
    partnerAccountIsSepa: boolean;
    partnerName: string;
    partnerIban: string;
    partnerAccountBan: string;
    referenceText: string;
    userAccepted: number;
    smartContactId: string;
}
