import { createSelector } from "@ngrx/store";
import { selectIsEmployeeLoading } from "./employee.selectors";
import { selectIsProductsLoading } from "./product.selectors";
import { selectIsSuppliersLoading } from "./supplier.selectors";
import { selectIsPurchaseOrderLoading } from "./purchase-order.selectors";
import { selectReceptionLoading } from "./reception.selectors";
import { selectLoadingStock } from "./stock.selectors";

export const selectIsAppLoading = createSelector(
  selectIsEmployeeLoading,
  selectIsProductsLoading,
  selectIsSuppliersLoading,
  selectIsPurchaseOrderLoading,
  selectReceptionLoading,
  selectLoadingStock,
  (employeesLoading, productsLoading, suppliersLoading, purchasesLoading, receptionLoading, stockLoading) => {
    return employeesLoading || productsLoading || suppliersLoading || purchasesLoading || receptionLoading || stockLoading
  }
);