import { ActionReducerMap } from "@ngrx/store";
import { EmployeesState } from "./models/employee.state";
import { SuppliersState } from "./models/suppliers.state";
import { ProductsState } from "./models/products.state";
import { employeesReducers } from "./reducers/employee.reducers";
import { suppliersReducers } from "./reducers/supplier.reducers";
import { productsReducers } from "./reducers/product.reducers";
import { PurchaseOrdersState } from "./models/purchase-orders.state";
import { purchaseOrderReducers } from "./reducers/purchase-order.reducers";
import { GlobalState } from "./models/global.state";
import { globalReducers } from "./reducers/global.reducers";



export interface AppState {
  employees: EmployeesState;
  suppliers: SuppliersState;
  products: ProductsState;
  purchases: PurchaseOrdersState;
  global: GlobalState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  employees: employeesReducers,
  suppliers: suppliersReducers,
  products: productsReducers,
  purchases: purchaseOrderReducers,
  global: globalReducers
}