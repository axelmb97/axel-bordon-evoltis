import { Failure } from "../failures/failure";

export interface UseCase<S,T> {
  execute(param:S) : Promise<T | Failure>;
}