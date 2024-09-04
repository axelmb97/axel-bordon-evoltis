import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem, MessageService } from 'primeng/api';
import { AppState } from 'src/app/core/manager/app.state';
import { selectCurrentPurchaseOrder } from 'src/app/core/manager/selectors/purchase-order.selectors';
import { CreatePurchaseOrder } from '../../domain/entities/create-purchase-order.entity';

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

  }

  
}
