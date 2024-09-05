import { Component, OnInit } from '@angular/core';
import { CreatePurchaseOrder } from '../../domain/entities/create-purchase-order.entity';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/manager/app.state';
import { selectCurrentPurchaseOrder } from 'src/app/core/manager/selectors/purchase-order.selectors';
import { selectSuppliers } from 'src/app/core/manager/selectors/supplier.selectors';
import { selectProducts } from 'src/app/core/manager/selectors/product.selectors';
import { Supplier } from 'src/app/features/suppliers/domain/entities/supplier.entity';
import { Product } from 'src/app/features/products/domain/entities/product.entity';

@Component({
  selector: 'app-puchase-details-view',
  templateUrl: './puchase-details-view.component.html',
  styleUrls: ['./puchase-details-view.component.scss']
})
export class PuchaseDetailsViewComponent implements OnInit{
  suppliers:Supplier[] = [];
  products: Product[] = [];
  purchase?: CreatePurchaseOrder;

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.selectPurchaseOrder();
    this.selectSuppliers();
    this.selectProducts();
  }

  selectSuppliers() : void {
    this.store.select(selectSuppliers).subscribe( suppliers => {
      if (!suppliers) return;
      this.suppliers = suppliers;
    });
  }

  selectProducts() : void {
    this.store.select(selectProducts).subscribe( products => {
      if (!products) return;
      this.products = products;
    });
  }

  selectPurchaseOrder() : void {
    this.store.select(selectCurrentPurchaseOrder).subscribe( purchase => {
      this.purchase = purchase;
    });
  }

  getSupplierName(supplierId: number) : string {
    return this.suppliers.find(s => s.id == supplierId)?.businessName || '-';
  }

  getProductName(supplierId: number) : string {
    return this.products.find(s => s.id == supplierId)?.name || '-';
  }

  getPurchaseTotal() : number {
    if (!this.purchase?.details) return 0;

    let total = 0;

    for (const detail of this.purchase?.details!) {
      total += detail.priceByUnit * detail.quantity;
    }

    return total;
  }
}
