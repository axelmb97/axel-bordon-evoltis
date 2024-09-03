import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderIndexComponent } from './features/purchase-orders/presentation/purchase-order-index/purchase-order-index.component';
import { AddPurchaseOrderComponent } from './features/purchase-orders/presentation/add-purchase-order/add-purchase-order.component';
import { EditPurchaseOrderComponent } from './features/purchase-orders/presentation/edit-purchase-order/edit-purchase-order.component';
import { PurchaseOrderListComponent } from './features/purchase-orders/presentation/purchase-order-list/purchase-order-list.component';
import { PurchaseGeneralDataComponent } from './features/purchase-orders/presentation/purchase-general-data/purchase-general-data.component';
import { PurchaseDetailsComponent } from './features/purchase-orders/presentation/purchase-details/purchase-details.component';

const routes: Routes = [
  {
    path: 'purchase-orders',
    component: PurchaseOrderIndexComponent,
    children: [
      {path: '', component: PurchaseOrderListComponent},
      {
        path: 'add',
        component: AddPurchaseOrderComponent,
        children: [
          { path:'general', component: PurchaseGeneralDataComponent} ,
          { path:'details', component: PurchaseDetailsComponent} 
        ]
      },
      {path: ':id', component: EditPurchaseOrderComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
