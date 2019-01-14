
export interface Balance {
    availableBalance: number;
    usableBalance: number;
    iban: string;
    bic: string;
    bankName: string;
    seized: boolean;
    id: string;
}
