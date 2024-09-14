import { IErrorConstructor } from "@/services/GlobalErrorHandlerService/IErrorConstructor";
import { IGlobalErrorHandlerService } from "@/services/GlobalErrorHandlerService/IGlobalErrorHandlerService";

export class GlobalErrorHandlerService implements IGlobalErrorHandlerService {
  private errorHandlers: {[key: string]: OnErrorEventHandler} = {}

  handleError(error: Error, message: string | Event, url?: string, line?: number, column?: number): boolean {
    const errorType = error.constructor.name;
    const errorHandler = this.errorHandlers[errorType];
    if (!!errorHandler) {
      errorHandler(message, url, line, column, error);
      return true;
    }
    return false;
  }

  registerErrorHandler(errorType: IErrorConstructor, handler: OnErrorEventHandler): void {
    const typeName = errorType.name;
    this.errorHandlers[typeName] = handler;
  }
}
