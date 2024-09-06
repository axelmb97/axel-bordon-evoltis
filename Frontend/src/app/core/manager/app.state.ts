import { ActionReducerMap } from "@ngrx/store";
import { EmployeesState } from "./models/employee.state";
import { SuppliersState } from "./models/suppliers.state";
import { ProductsState } from "./models/products.state";
import { employeesReducers } from "./reducers/employee.reducers";
import { suppliersReducers } from "./reducers/supplier.reducers";
import { productsReducers } from "./reducers/product.reducers";
import { PurchaseOrdersState } from "./models/purchase-orders.state";
import { purchaseOrderReducers } from "./reducers/purchase-order.reducers";
import { ReceptionsState } from "./models/reception.state";
import { receptionReducers } from "./reducers/reception.reduces";
import { SotcksState } from "./models/stock.state";
import { stockReducers } from "./reducers/stock.reducers";



export interface AppState {
  employees: EmployeesState;
  suppliers: SuppliersState;
  products: ProductsState;
  purchases: PurchaseOrdersState;
  receptions: ReceptionsState;
  stocks: SotcksState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  employees: employeesReducers,
  suppliers: suppliersReducers,
  products: productsReducers,
  purchases: purchaseOrderReducers,
  receptions: receptionReducers,
  stocks: stockReducers
}