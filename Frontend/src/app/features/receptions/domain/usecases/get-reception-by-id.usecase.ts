import { Injectable } from "@angular/core";
import { UseCase } from "src/app/core/utils/usecase";
import { Reception } from "../entities/reception.entity";
import { Failure } from "src/app/core/failures/failure";
import { ReceptionRepositoryBase } from "../repositories/reception-base.repository";

@Injectable()
export class GetReceptionByIdUseCase implements UseCase<number, Reception> {

  constructor(private receptionRpository: ReceptionRepositoryBase){}

  execute(param: number): Promise<Reception | Failure> {
    return this.receptionRpository.getReceptionById(param);
  }
}