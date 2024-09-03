import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/manager/app.state';
import { selectSuppliers } from 'src/app/core/manager/selectors/supplier.selectors';
import { Supplier } from 'src/app/features/suppliers/domain/entities/supplier.entity';

@Component({
  selector: 'app-purchase-general-data',
  templateUrl: './purchase-general-data.component.html',
  styleUrls: ['./purchase-general-data.component.scss']
})
export class PurchaseGeneralDataComponent implements OnInit{
  suppliers: Supplier[] = [];
  purchaseOrderForm: FormGroup = new FormGroup({});
  minDate: Date = new Date();

  constructor(
    private store: Store<AppState>,
    private builder : FormBuilder  
  ){}
  
  ngOnInit(): void {
    this.initForm();
    this.selectSuppliers();
  }

  selectSuppliers() : void {
    this.store.select(selectSuppliers).subscribe( suppliers => {
      if (!suppliers) return;
      this.suppliers = suppliers;
    });
  }

  initForm() : void {
    this.purchaseOrderForm = this.builder.group({
      supplier: ['', [Validators.required]],
      deliveryDate: ['', [Validators.required]],
    });
  }
}
