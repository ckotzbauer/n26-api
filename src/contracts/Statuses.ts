
export interface Statuses {
    id: string;
    created: number;
    updated: number;
    singleStepSignup: number;
    emailValidationInitiated: number;
    emailValidationCompleted: number;
    productSelectionCompleted: number;
    phonePairingInitiated: number;
    phonePairingCompleted: number;
    kycInitiated: number;
    kycCompleted: number;
    kycWebIdInitiated: number;
    kycWebIdCompleted: number;
    cardActivationCompleted: number;
    pinDefinitionCompleted: number;
    bankAccountCreationInitiated: number;
    bankAccountCreationSucceded: number;
    flexAccount: boolean;
}
