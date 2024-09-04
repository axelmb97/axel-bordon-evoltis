import { createSelector } from "@ngrx/store";
import { selectIsEmployeeLoading } from "./employee.selectors";
import { selectIsProductsLoading } from "./product.selectors";
import { selectIsSuppliersLoading } from "./supplier.selectors";
import { selectIsPurchaseOrderLoading } from "./purchase-order.selectors";

export const selectIsAppLoading = createSelector(
  selectIsEmployeeLoading,
  selectIsProductsLoading,
  selectIsSuppliersLoading,
  selectIsPurchaseOrderLoading,
  (employeesLoading, productsLoading, suppliersLoading, purchasesLoading) => {
    return employeesLoading || productsLoading || suppliersLoading || purchasesLoading
  }
);