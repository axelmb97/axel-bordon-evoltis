import { createSelector } from "@ngrx/store";
import { selectIsEmployeeLoading } from "./employee.selectors";
import { selectIsProductsLoading } from "./product.selectors";
import { selectIsSuppliersLoading } from "./supplier.selectors";

export const selectIsAppLoading = createSelector(
  selectIsEmployeeLoading,
  selectIsProductsLoading,
  selectIsSuppliersLoading,
  (employeesLoading, productsLoading, suppliersLoading) => {
    return employeesLoading || productsLoading || suppliersLoading
  }
);