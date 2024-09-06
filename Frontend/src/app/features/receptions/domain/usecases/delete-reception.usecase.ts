import { Injectable } from "@angular/core";
import { Failure } from "src/app/core/failures/failure";
import { UseCase } from "src/app/core/utils/usecase";
import { ReceptionRepositoryBase } from "../repositories/reception-base.repository";

@Injectable()
export class DeleteReceptionUseCase implements UseCase<number, boolean> {

  constructor(private receptionRepository: ReceptionRepositoryBase){}
  
  execute(param: number): Promise<boolean | Failure> {
    return this.receptionRepository.deleteReception(param);
  }

}