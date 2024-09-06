import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { AppState } from 'src/app/core/manager/app.state';
import { CreateReception } from '../../domain/entities/create-reception.entity';
import { createReception } from 'src/app/core/manager/actions/receptions.actions';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectEmployees } from 'src/app/core/manager/selectors/employee.selectors';
import { Employee } from 'src/app/features/employees/domain/entities/employee.entity';
import { loadPurchaseOrderById } from 'src/app/core/manager/actions/purchase-orders.actions';
import { selectCurrentPurchaseOrder } from 'src/app/core/manager/selectors/purchase-order.selectors';
import { CreatePurchaseOrder } from 'src/app/features/purchase-orders/domain/entities/create-purchase-order.entity';
import { selectProducts } from 'src/app/core/manager/selectors/product.selectors';
import { Product } from 'src/app/features/products/domain/entities/product.entity';
import { CreatePurchaseOrderDetail } from 'src/app/features/purchase-orders/domain/entities/create-purchase-order-detail.entity';
import { CreateReceptionModel } from '../../data/models/create-reception.model';
import { CrateReceptionDetail } from '../../domain/entities/crate-reception-details.entity';
import { CreateReceptionDetailModel } from '../../data/models/create-reception-detail.model';

@Component({
  selector: 'app-add-reception',
  templateUrl: './add-reception.component.html',
  styleUrls: ['./add-reception.component.scss']
})
export class AddReceptionComponent implements OnInit{
  reception?: CreateReception;
  receptionForm: FormGroup = new FormGroup({});
  employees: Employee[] = [];
  products: Product[] = [];
  purchase?: CreatePurchaseOrder;

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService,
    private builder: FormBuilder
  ){}

  ngOnInit(): void {
    this.initForm()
    this.selectEmployees();
    this.selectProducts();
    this.onPurchaseIdChange();
    this.selectPurchaseOrderSelected();
  }

  initForm() : void {
    this.receptionForm = this.builder.group({
      purchaseId: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      details: this.builder.array([])
    });
  }

  onPurchaseIdChange() : void {
    this.receptionForm.get('purchaseId')?.valueChanges.subscribe( purchaseId => {
      if (!purchaseId) return;
      this.store.dispatch(loadPurchaseOrderById({purchaseId}));
    })
  }

  selectPurchaseOrderSelected() : void {
    this.store.select(selectCurrentPurchaseOrder).subscribe( purchase => {
      
      if (!purchase) return;
      this.purchase = purchase;
      this.getDetails().clear();
      this.updateForm(purchase);
    });
  }

  updateForm(purchase: CreatePurchaseOrder) : void {
    for (const detail of purchase.details!) {
      let receptionDetailForm = this.getReceptionDetailForm(detail);
      this.getDetails().push(receptionDetailForm);
    }
  }

  getReceptionDetailForm(detail: CreatePurchaseOrderDetail) : FormGroup {
    return this.builder.group({
      productId: [detail.productId, [Validators.required]],
      quantity: [detail.quantity, [Validators.required]],
      quantityRecevied: ['', [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  getDetails() : FormArray {
    return this.receptionForm.get('details') as FormArray;
  }

  selectEmployees() : void {
    this.store.select(selectEmployees).subscribe( employees => {
      this.employees = employees;
    });
  }

  selectProducts() : void {
    this.store.select(selectProducts).subscribe( products => {
      this.products = products;
    });
  }

  getProductName(productId: number) : string {
    return this.products.find(p => p.id == productId)?.name!;
  }

  onSaveReception() : void {
    if (this.receptionForm.invalid) {
      this.messageService.add({
        summary: 'Error',
        detail: 'Faltan datos por completar',
        life:3000,
        severity:'error'
      });
      return;
    }

    let reception = this.getReceptionToCreate();
    this.store.dispatch(createReception({reception}));
  }

  getReceptionToCreate() : CreateReception {
    let reception = new CreateReceptionModel(
      this.receptionForm.get('purchaseId')?.value,
      this.receptionForm.get('employeeId')?.value,
      this.getDetailToCreate()
    );

    return reception;
  }

  getDetailToCreate() : CrateReceptionDetail[] {
    let details : CrateReceptionDetail[] = [];

    for (const formDetail of this.getDetails().controls) {
        let detail = new CreateReceptionDetailModel(
          formDetail.get('productId')?.value,
          formDetail.get('quantityRecevied')?.value,
          formDetail.get('description')?.value,
        );

        details.push(detail);
    }

    return details;
  }
}
