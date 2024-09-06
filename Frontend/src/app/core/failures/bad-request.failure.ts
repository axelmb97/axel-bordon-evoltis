import { Failure } from "./failure";

export class BadRequestFailure extends Failure {
  constructor(
    message: string = 'Ha enviado datos incorrectos'
  ){
    super(message, 400);
  }
}