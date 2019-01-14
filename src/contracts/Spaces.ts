
export interface Balance {
    availableBalance: number;
    overdraftAmount: unknown;
}

export interface Space {
    balance: Balance;
    color: string;
    goal: unknown;
    id: string;
    imageUrl: string;
    isCardAttached: boolean;
    isPrimary: boolean;
    name: string;
}

export interface UserFeatures {
    availableSpaces: number;
    canUpgrade: boolean;
}

export interface Spaces {
    spaces: Space[];
    totalBalance: number;
    userFeatures: UserFeatures;
}
