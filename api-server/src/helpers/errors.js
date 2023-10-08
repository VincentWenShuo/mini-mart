export class NotFound extends Error {
  constructor(message = "The requested resource could not be found") {
    super(message);
    this.name = "NotFound";
    this.statusCode = 404;
    this.errorCode = 404;
  }
}
