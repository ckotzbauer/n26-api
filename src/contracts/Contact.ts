
export interface Account {
    accountType: string;
    iban: string;
    bic: string;
}

export interface Contact {
    userId: string;
    id: string;
    name: string;
    subtitle: string;
    account: Account;
}
