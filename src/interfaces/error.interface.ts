export interface IError {
    detail?: string
    // brand?: string[]
    // price?: string[]
    // year?: string[]
}

export interface IErrorAuth extends IError{
    username: string[]
}