import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderIndexComponent } from './features/purchase-orders/presentation/purchase-order-index/purchase-order-index.component';
import { AddPurchaseOrderComponent } from './features/purchase-orders/presentation/add-purchase-order/add-purchase-order.component';
import { EditPurchaseOrderComponent } from './features/purchase-orders/presentation/edit-purchase-order/edit-purchase-order.component';
import { PurchaseOrderListComponent } from './features/purchase-orders/presentation/purchase-order-list/purchase-order-list.component';
import { PurchaseGeneralDataComponent } from './features/purchase-orders/presentation/purchase-general-data/purchase-general-data.component';
import { PurchaseDetailsComponent } from './features/purchase-orders/presentation/purchase-details/purchase-details.component';
import { ReceptiosIndexComponent } from './features/receptions/presentation/receptios-index/receptios-index.component';
import { ReceptionsListComponent } from './features/receptions/presentation/receptions-list/receptions-list.component';

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
      {
        path: ':id', 
        component: EditPurchaseOrderComponent,
        children: [
          { path:'general', component: PurchaseGeneralDataComponent},
          { path:'details', component: PurchaseDetailsComponent} 
        ]
      }
    ]
  },
  {
    path: 'receptions',
    component: ReceptiosIndexComponent,
    children: [
      {path: '', component: ReceptionsListComponent},
    ]
  },
  {
    path: '**',
    redirectTo: 'purchase-orders'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
