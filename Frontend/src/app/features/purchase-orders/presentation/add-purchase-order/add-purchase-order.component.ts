import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppState } from 'src/app/core/manager/app.state';
import { selectProducts } from 'src/app/core/manager/selectors/product.selectors';
import { selectSuppliers } from 'src/app/core/manager/selectors/supplier.selectors';
import { Product } from 'src/app/features/products/domain/entities/product.entity';
import { Supplier } from 'src/app/features/suppliers/domain/entities/supplier.entity';

@Component({
  selector: 'app-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.scss']
})
export class AddPurchaseOrderComponent implements OnInit{
  purchaseOrderForm: FormGroup = new FormGroup({});
  items: MenuItem[] = [];
  
  constructor(
    private builder: FormBuilder,
    private store: Store<AppState>,
  ){}

  ngOnInit(): void {
    this.initItems();
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
}
