export declare class HyperbolicError extends Error {
    constructor(message: string);
}
export declare class ConfigurationError extends HyperbolicError {
    constructor(message: string);
}
export declare class APIError extends HyperbolicError {
    statusCode?: number;
    constructor(message: string, statusCode?: number);
}
export declare class ValidationError extends HyperbolicError {
    constructor(message: string);
}
export declare class SSHError extends HyperbolicError {
    constructor(message: string);
}
export declare class GPUError extends HyperbolicError {
    constructor(message: string);
}
