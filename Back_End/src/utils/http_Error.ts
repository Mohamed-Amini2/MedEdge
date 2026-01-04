export type HttpErrorData =  {
    status: number,
    message: string,
    details?: string,
}

export const HttpError = (status: number, message: string , details?: string ): HttpErrorData => ({
    message , status , details
})