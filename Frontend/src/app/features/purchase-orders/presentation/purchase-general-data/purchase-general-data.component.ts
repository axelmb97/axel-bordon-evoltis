import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/manager/app.state';
import { selectCurrentPurchaseOrder } from 'src/app/core/manager/selectors/purchase-order.selectors';
import { selectSuppliers } from 'src/app/core/manager/selectors/supplier.selectors';
import { Supplier } from 'src/app/features/suppliers/domain/entities/supplier.entity';
import { CreatePurchaseOrder } from '../../domain/entities/create-purchase-order.entity';
import { addPurchaseGeneralData, loadPurchaseOrderById } from 'src/app/core/manager/actions/purchase-orders.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-general-data',
  templateUrl: './purchase-general-data.component.html',
  styleUrls: ['./purchase-general-data.component.scss']
})
export class PurchaseGeneralDataComponent implements OnInit{
  suppliers: Supplier[] = [];
  purchaseOrderForm: FormGroup = new FormGroup({});
  minDate: Date = new Date();
  isUpdate: boolean = false;
  purchaseOrderIdToUpdate: number = 0;

  constructor(
    private store: Store<AppState>,
    private builder : FormBuilder,
    private activatedRoute: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    this.initForm();
    this.selectSuppliers();
    this.selectCurrenPurchase();
    this.isUpdateOperation();
  }

  isUpdateOperation() : void {
    this.activatedRoute.parent?.paramMap.subscribe( params => {
      
      const id = Number(params.get("id"));
      if (id) {
        this.isUpdate = true;
        this.purchaseOrderIdToUpdate = id;
        this.store.dispatch(loadPurchaseOrderById({purchaseId: id}));
      }
    })
  }

  selectSuppliers() : void {
    this.store.select(selectSuppliers).subscribe( suppliers => {
      if (!suppliers) return;
      this.suppliers = suppliers;
    });
  }

  selectCurrenPurchase() : void {
    this.store.select(selectCurrentPurchaseOrder).subscribe(purchaseOrder => {
      //TODO: Actualizar dropdowns
      
      if (!purchaseOrder) return;
      if (purchaseOrder.deliveryDate) {
        this.purchaseOrderForm.patchValue({
          deliveryDate: purchaseOrder.deliveryDate
        });
      }
      if (purchaseOrder.supplierId) {
        this.purchaseOrderForm.patchValue({
          supplier: purchaseOrder.supplierId
        });
      }
    });
  }

  initForm() : void {
    this.purchaseOrderForm = this.builder.group({
      supplier: ['', [Validators.required]],
      deliveryDate: ['', [Validators.required]],
    });
  }

  onUpdatePurchase() : void {
    let supplierId : number = this.purchaseOrderForm.get('supplier')?.value;
    let deliveryDate : string =  this.purchaseOrderForm.get('deliveryDate')?.value;
    let actionParams = {supplierId, deliveryDate, updateId: this.purchaseOrderIdToUpdate}
    this.store.dispatch(addPurchaseGeneralData(actionParams));
  }
}
