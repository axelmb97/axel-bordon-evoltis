import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem, MessageService } from 'primeng/api';
import { AppState } from 'src/app/core/manager/app.state';
import { selectCurrentPurchaseOrder } from 'src/app/core/manager/selectors/purchase-order.selectors';
import { CreatePurchaseOrder } from '../../domain/entities/create-purchase-order.entity';
import { updatePurchaseOrder } from 'src/app/core/manager/actions/purchase-orders.actions';

@Component({
  selector: 'app-edit-purchase-order',
  templateUrl: './edit-purchase-order.component.html',
  styleUrls: ['./edit-purchase-order.component.scss']
})
export class EditPurchaseOrderComponent implements OnInit{
  items: MenuItem[] = [];
  purchase?: CreatePurchaseOrder;

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService,
  ) {}
  
  ngOnInit(): void {
    this.initItems();
    this.selectCurrenPurchase();
  }

  initItems() : void {
    this.items = [
      {
          label: 'General',
          routerLink: 'general'
      },
      {
          label: 'Productos',
          routerLink: 'details'
      }
    ];
  }
  
  selectCurrenPurchase() : void {
    this.store.select(selectCurrentPurchaseOrder).subscribe(purchaseOrder => {
      if(!purchaseOrder) return;
      this.purchase = purchaseOrder;
    });
  }

  onSavePurchaseOrder() : void {
    if (!this.validPurchase()) {
      this.messageService.add({
        severity: 'error',
        life: 3000,
        summary: 'Error',
        detail: 'Hay datos invalidos en el formulario' 
      });
      return;
    }
    this.store.dispatch(updatePurchaseOrder({purchase: this.purchase!}));
  }

  validPurchase() : boolean {
    if (!this.purchase) return false;
    return this.purchase.deliveryDate != undefined && this.purchase.supplierId != undefined
           && this.purchase.details != undefined && this.purchase.details.length > 0;
  }
  
}
