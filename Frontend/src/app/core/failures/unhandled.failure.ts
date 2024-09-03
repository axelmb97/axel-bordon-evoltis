import { Failure } from "./failure";

export class UnhandledFailure extends Failure {
  constructor(){
    super("Ocurrio un error inesperado. Intente más tarde.", 500);
  }
}