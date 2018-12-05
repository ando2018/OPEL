
export interface HttpResponseModel<T> {
    message: string;
    code: number;
    data: T;
}
