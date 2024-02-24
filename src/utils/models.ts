export interface ResponseJson<T> {
    data: T;
    success: boolean;
    message: string;
    showPopUp: boolean;
    code: number;
    responseType: string;
  }