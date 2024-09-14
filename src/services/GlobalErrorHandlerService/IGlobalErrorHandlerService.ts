import { IErrorConstructor } from "@/services/GlobalErrorHandlerService/IErrorConstructor";

export interface IGlobalErrorHandlerService {
  handleError(error: Error, message?: string | Event, url?: string, line?: number, column?: number): boolean;
  registerErrorHandler(errorType: IErrorConstructor, handler: OnErrorEventHandler): void;
}
