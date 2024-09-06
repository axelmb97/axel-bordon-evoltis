import { Failure } from "./failure";

export class NotFoundFailure extends Failure {
  constructor(
    message: string = 'El recurso no fue encontrado'
  ){
    super(message, 404);
  }
}