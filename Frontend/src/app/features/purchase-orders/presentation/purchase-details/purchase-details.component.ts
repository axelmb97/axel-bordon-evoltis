import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppState } from 'src/app/core/manager/app.state';
import { selectProducts } from 'src/app/core/manager/selectors/product.selectors';
import { Product } from 'src/app/features/products/domain/entities/product.entity';
import { CreatePurchaseOrder } from '../../domain/entities/create-purchase-order.entity';
import { selectCurrentPurchaseOrder } from 'src/app/core/manager/selectors/purchase-order.selectors';
import { PurchaseOrderDetailModalComponent } from '../purchase-order-detail-modal/purchase-order-detail-modal.component';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss']
})
export class PurchaseDetailsComponent implements OnInit{
  products: Product[] = [];
  currentPurchaseOrder?: CreatePurchaseOrder;
  showModal: boolean = false;
  constructor(
    private store: Store<AppState>,
  ){}

  ngOnInit(): void {
    this.selectProducts();
    this.selectCurrenPurchase();
  }

  selectProducts() : void {
    this.store.select(selectProducts).subscribe( products => {
      if (!products) return;
      this.products = products;
    });
  }

  selectCurrenPurchase() : void {
    this.store.select(selectCurrentPurchaseOrder).subscribe(purchaseOrder => {
      if(!purchaseOrder) return;
      console.log("DETAILS",purchaseOrder);
      
      this.currentPurchaseOrder = purchaseOrder;
    });
  }

  addDetail() : void {
    this.showModal = true;
  }

  removeDetail(index:number) : void {

  }

  onCloseModal(): void {
    this.showModal = false;
  }

  getProductName(productId:number) : string {
    return this.products.find(p => p.id == productId)?.name!;
  }
}
