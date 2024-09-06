import { CrateReceptionDetail } from "../../domain/entities/crate-reception-details.entity";

export class CreateReceptionDetailModel extends CrateReceptionDetail {
  override toJson(): Map<string, any> {
    let json = new Map<string,any>();
    json.set('product_id', this.productId);
    json.set('quantity_received', this.quantityReceived);
    json.set('description', this.description);
    return json;
  }

}