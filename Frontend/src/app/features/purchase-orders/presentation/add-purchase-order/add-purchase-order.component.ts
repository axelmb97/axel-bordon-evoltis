import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppState } from 'src/app/core/manager/app.state';
import { selectProducts } from 'src/app/core/manager/selectors/product.selectors';
import { selectCurrentPurchaseOrder, selectPurchaseOrderError, selectPurchaseOrderSuccess } from 'src/app/core/manager/selectors/purchase-order.selectors';
import { selectSuppliers } from 'src/app/core/manager/selectors/supplier.selectors';
import { Product } from 'src/app/features/products/domain/entities/product.entity';
import { Supplier } from 'src/app/features/suppliers/domain/entities/supplier.entity';
import { CreatePurchaseOrder } from '../../domain/entities/create-purchase-order.entity';
import { cleanOrder, createPurchaseOrder } from 'src/app/core/manager/actions/purchase-orders.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.scss']
})
export class AddPurchaseOrderComponent implements OnInit{
  purchase?: CreatePurchaseOrder;
  items: MenuItem[] = [];
  
  constructor(
    private builder: FormBuilder,
    private store: Store<AppState>,
    private messageService: MessageService,
    private router: Router
  ){}

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

    this.store.dispatch(createPurchaseOrder({purchaseOrder: this.purchase!}));
  }

  validPurchase() : boolean {
    if (!this.purchase) return false;
    return this.purchase.deliveryDate != undefined && this.purchase.supplierId != undefined
           && this.purchase.details != undefined && this.purchase.details.length > 0;
  }
}
