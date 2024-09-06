import { Injectable } from "@angular/core";
import { UseCase } from "src/app/core/utils/usecase";
import { CreateReception } from "../entities/create-reception.entity";
import { Failure } from "src/app/core/failures/failure";
import { ReceptionRepositoryBase } from "../repositories/reception-base.repository";

@Injectable()
export class CreateReceptionUseCase implements UseCase<CreateReception, boolean> {

  constructor(private receptionRepository: ReceptionRepositoryBase){}
  
  execute(param: CreateReception): Promise<boolean | Failure> {
    return this.receptionRepository.createReception(param);
  }

}