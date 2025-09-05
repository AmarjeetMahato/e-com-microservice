import { Message } from "./ErrorCode.enm";
import { HttpStatusCode, HTTPSTATUS } from "./https.config";


export class AppError extends Error {
  public statusCode: HttpStatusCode;
  public errorCode?: Message;

  constructor(
    message: string,
    statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    errorCode?: Message
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}