import { Entity } from "src/app/core/utils/entity";

export abstract class CrateReceptionDetail extends Entity {

  constructor(
    public productId: number,
    public quantityReceived: number,
    public description: string
  ){
    super();
  }
}