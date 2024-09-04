import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/manager/app.state';
import { selectProducts } from 'src/app/core/manager/selectors/product.selectors';
import { Product } from 'src/app/features/products/domain/entities/product.entity';
import { CreatePurchaseOrderDetail } from '../../domain/entities/create-purchase-order-detail.entity';
import { CreatePurchaseOrderDetailModel } from '../../data/models/create-purchase-order-detail.model';
import { addPurchaseOrderDetail } from 'src/app/core/manager/actions/purchase-orders.actions';

@Component({
  selector: 'app-purchase-order-detail-modal',
  templateUrl: './purchase-order-detail-modal.component.html',
  styleUrls: ['./purchase-order-detail-modal.component.scss']
})
export class PurchaseOrderDetailModalComponent implements OnInit{
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  purchaseOrderDetailForm: FormGroup = new FormGroup({});
  products: Product[] = [];
  constructor(
    private builder: FormBuilder,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.initForm();
    this.selectProducts();
  }

  initForm() : void {
    this.purchaseOrderDetailForm = this.builder.group({
      quantity: [0, [Validators.required, Validators.min(1)]],
      product: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(1)]]
    });
  }

  selectProducts() : void {
    this.store.select(selectProducts).subscribe( products => {
      if (!products) return;
      this.products = products;
    });
  }

  onAddDetail() : void {
    if (this.purchaseOrderDetailForm.invalid) return;
    let detail = this.getDetail();
    this.store.dispatch(addPurchaseOrderDetail({detail}));
    this.purchaseOrderDetailForm.reset();
    
    this.closeModal.emit(true);
  }

  getDetail() :CreatePurchaseOrderDetail {
    return new CreatePurchaseOrderDetailModel(
      this.purchaseOrderDetailForm.get('product')?.value,
      this.purchaseOrderDetailForm.get('quantity')?.value,
      this.purchaseOrderDetailForm.get('price')?.value,
    );
  }

  onCloseModal() : void {
    this.closeModal.emit(true);
  }
}
