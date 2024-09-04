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
import { ActivatedRoute } from '@angular/router';
import { deletePurchaseOrderDetail, loadPurchaseOrderById } from 'src/app/core/manager/actions/purchase-orders.actions';
import { CreatePurchaseOrderDetail } from '../../domain/entities/create-purchase-order-detail.entity';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss']
})
export class PurchaseDetailsComponent implements OnInit{
  products: Product[] = [];
  currentPurchaseOrder?: CreatePurchaseOrder;
  showModal: boolean = false;
  isUpdate: boolean = false;
  purchaseOrderIdToUpdate: number = 0;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.selectProducts();
    this.selectCurrenPurchase();
    this.isUpdateOperation();
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
      
      this.currentPurchaseOrder = purchaseOrder;
    });
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
  
  addDetail() : void {
    this.showModal = true;
  }

  removeDetail(index:number) : void {
    let detail: CreatePurchaseOrderDetail | undefined = this.currentPurchaseOrder?.details![index];
    this.store.dispatch(deletePurchaseOrderDetail({detail: detail!}));
  }

  onCloseModal(): void {
    this.showModal = false;
  }

  getProductName(productId:number) : string {
    return this.products.find(p => p.id == productId)?.name!;
  }
}
